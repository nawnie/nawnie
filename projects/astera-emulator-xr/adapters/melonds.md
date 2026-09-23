# melonDS / DS adapter

Prefer emulator-native geometry over AI.

melonDS' 3D renderer maintains real depth data. Current sources expose buffers including `ColorBufferTex`, `DepthBufferTex`, and `AttrBufferTex`. Its 2D renderer also exposes object/layer depth data such as `OBJDepthTex`.

## Preferred path

```text
DS hardware 3D
  -> RGB texture
  -> real depth texture
  -> AsteraXrRgbDepthFrame
  -> Astera stereo synthesis
```

For 2D-composited content, map BG/OBJ ordering to coarse depth planes and optionally fuse with AI depth.

HUD/text can remain monoscopic to avoid unnecessary disparity.

melonDS is GPL-3.0-or-later. Keep emulator modifications compliant and separate from commercial-only components.
