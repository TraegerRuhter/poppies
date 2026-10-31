# Photos

One YAML file per photograph, next to the image it describes:

```yaml
# arch-coral.yaml
image: ./arch-coral.jpg
alt: A coral and blush organic arch framing a white door
register: celebration   # celebration | wedding | both
slot: arch-wide         # optional — a slot id from ../slots.yaml
licensedCharacter: false
```

Unslotted photos still appear in the galleries for their register, after the
slotted ones. Originals can be full-size phone photos; the build makes the
small versions.
