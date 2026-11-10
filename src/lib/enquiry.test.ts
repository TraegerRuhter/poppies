import { describe, expect, it } from 'vitest';
import {
  handleEnquiry,
  HONEYPOT,
  MAX_FIELD_LENGTH,
  type Bounce,
  type EnquiryDeps,
  type EnquiryEmail,
  type Enquiry,
} from './enquiry';
import { createRateLimiter } from './rate-limit';

const OWNER = 'owner@example.com';
const DEVELOPER = 'developer@example.com';

function submission(fields: Record<string, string> = {}, ip = '203.0.113.7') {
  const body = new URLSearchParams({
    name: 'Rosa Diaz',
    email: 'rosa@example.com',
    date: '2027-06-12',
    town: 'Lincoln City',
    eventType: 'wedding',
    scale: 'Ceremony arch and a garland',
    colours: 'Sage and cream',
    budget: '',
    [HONEYPOT]: '',
    ...fields,
  });
  return new Request('https://poppies.test/api/enquiry', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-forwarded-for': ip,
    },
    body,
  });
}

function fakes() {
  const sent: EnquiryEmail[] = [];
  const rows: Enquiry[] = [];
  const logged: string[] = [];
  const bounced: Bounce[] = [];
  return {
    sent,
    rows,
    logged,
    bounced,
    deps: <EnquiryDeps>{
      recipients: [OWNER, DEVELOPER],
      mailer: { send: async (email: EnquiryEmail) => void sent.push(email) },
      mirror: { append: async (enquiry: Enquiry) => void rows.push(enquiry) },
      log: (message: string) => void logged.push(message),
      limiter: createRateLimiter({ limit: 100, windowMs: 60_000 }),
      mailTimeoutMs: 1_000,
      mirrorTimeoutMs: 1_000,
      bounce: (b: Bounce) => {
        bounced.push(b);
        return new Response('the form again', { status: 400 });
      },
    },
  };
}

describe('handleEnquiry', () => {
  it('delivers a valid enquiry to both recipients, replying to the customer', async () => {
    const { sent, deps } = fakes();

    const response = await handleEnquiry(submission(), deps);

    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe('/enquire/thanks');
    expect(sent).toHaveLength(1);
    expect(sent[0].to).toEqual([OWNER, DEVELOPER]);
    expect(sent[0].replyTo).toBe('rosa@example.com');
    expect(sent[0].text).toContain('Lincoln City');
  });

  it('carries how they heard about us and any latex allergy into the email and the row', async () => {
    const { sent, rows, deps } = fakes();

    await handleEnquiry(submission({ source: 'A venue', latex: 'One guest is allergic' }), deps);

    expect(sent[0].text).toContain('Heard about us: A venue');
    expect(sent[0].text).toContain('Latex allergy: One guest is allergic');
    expect(rows[0]).toMatchObject({ source: 'A venue', latex: 'One guest is allergic' });
  });

  it('mirrors each delivered enquiry to Airtable as one row', async () => {
    const { rows, deps } = fakes();

    await handleEnquiry(submission(), deps);

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ name: 'Rosa Diaz', town: 'Lincoln City', eventType: 'wedding' });
  });

  it('still delivers and thanks the visitor when Airtable is down, and logs it', async () => {
    const { sent, logged, deps } = fakes();
    deps.mirror.append = async () => {
      throw new Error('Airtable 503');
    };

    const response = await handleEnquiry(submission(), deps);

    expect(response.headers.get('location')).toBe('/enquire/thanks');
    expect(sent).toHaveLength(1);
    expect(logged.join('\n')).toContain('Airtable 503');
  });

  it('thanks the visitor without waiting on an Airtable that never answers', async () => {
    const { sent, logged, deps } = fakes();
    deps.mirrorTimeoutMs = 20;
    deps.mirror.append = () => new Promise<void>(() => {});

    const response = await handleEnquiry(submission(), deps);

    expect(response.headers.get('location')).toBe('/enquire/thanks');
    expect(sent).toHaveLength(1);
    expect(logged.join('\n')).toContain('timed out');
  });

  it('still records the enquiry in Airtable when the email cannot be sent', async () => {
    const { rows, deps } = fakes();
    deps.mailer.send = async () => {
      throw new Error('Resend 500');
    };

    const response = await handleEnquiry(submission(), deps);

    expect(response.headers.get('location')).toBe('/enquire/error');
    expect(rows).toHaveLength(1);
  });

  it('sends the visitor to the error page when the email cannot be sent', async () => {
    const { logged, deps } = fakes();
    deps.mailer.send = async () => {
      throw new Error('Resend 500');
    };

    const response = await handleEnquiry(submission(), deps);

    expect(response.headers.get('location')).toBe('/enquire/error');
    expect(logged.join('\n')).toContain('Resend 500');
  });

  it('quietly drops a submission whose honeypot is filled, showing the bot the thank-you page', async () => {
    const { sent, rows, deps } = fakes();

    const response = await handleEnquiry(submission({ [HONEYPOT]: 'https://spam.example' }), deps);

    expect(response.headers.get('location')).toBe('/enquire/thanks');
    expect(sent).toHaveLength(0);
    expect(rows).toHaveLength(0);
  });

  it('returns the visitor to the form naming what is missing, and sends nothing', async () => {
    const { sent, rows, bounced, deps } = fakes();

    const response = await handleEnquiry(submission({ email: '', town: '  ' }), deps);

    expect(response.status).toBe(400);
    expect(bounced[0].missing).toEqual(['email', 'town']);
    expect(sent).toHaveLength(0);
    expect(rows).toHaveLength(0);
  });

  it('hands a bounced visitor back what they already typed', async () => {
    const { bounced, deps } = fakes();

    await handleEnquiry(submission({ email: '', colours: 'Sage & cream' }), deps);

    expect(bounced[0].enquiry).toMatchObject({ name: 'Rosa Diaz', colours: 'Sage & cream', eventType: 'wedding' });
  });

  it('never puts what the visitor typed into a URL', async () => {
    const { deps } = fakes();

    const response = await handleEnquiry(submission({ email: '', latex: 'One guest is allergic' }), deps);

    expect(response.headers.get('location')).toBeNull();
  });

  it('asks again for a date that is not a real calendar date', async () => {
    const { sent, bounced, deps } = fakes();

    for (const date of ['banana', '2027-02-30', '12/06/2027']) await handleEnquiry(submission({ date }), deps);

    expect(bounced.map((b) => b.missing)).toEqual([['date'], ['date'], ['date']]);
    expect(sent).toHaveLength(0);
  });

  it('asks again for an event type the form does not offer', async () => {
    const { sent, bounced, deps } = fakes();

    await handleEnquiry(submission({ eventType: 'zzz' }), deps);

    expect(bounced[0].missing).toEqual(['eventType']);
    expect(sent).toHaveLength(0);
  });

  it('accepts every event type the form offers', async () => {
    const { sent, deps } = fakes();

    for (const eventType of ['celebration', 'wedding', 'other']) {
      await handleEnquiry(submission({ eventType }), deps);
    }

    expect(sent).toHaveLength(3);
  });

  it('keeps each answer on one line and within the length cap', async () => {
    const { sent, rows, deps } = fakes();

    await handleEnquiry(
      submission({ town: 'Lincoln City\r\nBcc: someone@example.com', scale: 'x'.repeat(5_000) }),
      deps,
    );

    expect(sent[0].subject).not.toMatch(/[\r\n]/);
    expect(rows[0].town).toBe('Lincoln City Bcc: someone@example.com');
    expect(rows[0].scale).toHaveLength(MAX_FIELD_LENGTH);
  });

  it('answers a request that is not a form submission with 400, and sends nothing', async () => {
    const { sent, deps } = fakes();
    const request = new Request('https://poppies.test/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Rosa' }),
    });

    const response = await handleEnquiry(request, deps);

    expect(response.status).toBe(400);
    expect(sent).toHaveLength(0);
  });

  it('sends the visitor to the error page when the email service never answers', async () => {
    const { logged, deps } = fakes();
    deps.mailTimeoutMs = 20;
    deps.mailer.send = () => new Promise<void>(() => {});

    const response = await handleEnquiry(submission(), deps);

    expect(response.headers.get('location')).toBe('/enquire/error');
    expect(logged.join('\n')).toContain('timed out');
  });

  it('leaves a trace in the log when the honeypot drops a submission', async () => {
    const { logged, deps } = fakes();

    await handleEnquiry(submission({ [HONEYPOT]: 'filled' }), deps);

    expect(logged.join('\n')).toContain('honeypot');
  });

  it('treats an email address without an @ as missing, since replies would go nowhere', async () => {
    const { sent, bounced, deps } = fakes();

    await handleEnquiry(submission({ email: 'rosa at example' }), deps);

    expect(bounced[0].missing).toEqual(['email']);
    expect(sent).toHaveLength(0);
  });

  describe('rate limiting', () => {
    const HOUR = 60 * 60 * 1000;

    function limitedTo(limit: number) {
      let now = 0;
      const clock = { advance: (ms: number) => void (now += ms) };
      const limiter = createRateLimiter({ limit, windowMs: HOUR, now: () => now });
      return { limiter, clock };
    }

    it('refuses a sender who passes the limit, and sends nothing for them', async () => {
      const { sent, deps } = fakes();
      deps.limiter = limitedTo(3).limiter;

      for (let i = 0; i < 3; i++) await handleEnquiry(submission(), deps);
      const response = await handleEnquiry(submission(), deps);

      expect(response.headers.get('location')).toBe('/enquire/error');
      expect(sent).toHaveLength(3);
    });

    it('does not count a bounced submission against the sender', async () => {
      const { sent, deps } = fakes();
      deps.limiter = limitedTo(1).limiter;

      for (let i = 0; i < 3; i++) await handleEnquiry(submission({ town: '' }), deps);
      const response = await handleEnquiry(submission(), deps);

      expect(response.headers.get('location')).toBe('/enquire/thanks');
      expect(sent).toHaveLength(1);
    });

    it('does not count one sender against another', async () => {
      const { sent, deps } = fakes();
      deps.limiter = limitedTo(1).limiter;

      await handleEnquiry(submission({}, '203.0.113.7'), deps);
      const response = await handleEnquiry(submission({}, '198.51.100.4'), deps);

      expect(response.headers.get('location')).toBe('/enquire/thanks');
      expect(sent).toHaveLength(2);
    });

    it('lets a sender through again once the window has passed', async () => {
      const { sent, deps } = fakes();
      const { limiter, clock } = limitedTo(1);
      deps.limiter = limiter;

      await handleEnquiry(submission(), deps);
      clock.advance(HOUR + 1);
      const response = await handleEnquiry(submission(), deps);

      expect(response.headers.get('location')).toBe('/enquire/thanks');
      expect(sent).toHaveLength(2);
    });
  });
});
