declare namespace App {
  interface Locals {
    /** Set by /api/enquiry when it renders the form again for a bounced submission. */
    enquiryBounce?: import('./lib/enquiry').Bounce;
  }
}
