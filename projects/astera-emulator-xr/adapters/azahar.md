# Azahar / 3DS adapter

Use the 3DS emulator's **native stereoscopic pair**. Do not run AI depth when the title already exposes usable stereoscopy.

Current Azahar sources expose `StereoRenderOption::CardboardVR` in both OpenGL and Vulkan renderers and already have 3D intensity, eye swap, display selection, Cardboard screen size, and X/Y shift.

## Adapter path

```text
3DS renderer
  -> native left eye texture
  -> native right eye texture
  -> AsteraXrStereoFrame
  -> Astera XR optics/compositor
```

The secondary/bottom screen remains monoscopic and is composited as a floating panel. Placement can be below/above/left/right/PIP/hidden.

## Astera adds

- live IPD / convergence
- independent eye X/Y
- curved screen
- viewer calibration
- Rx experiment
- live controller banks
- A/B presets and ratings

Azahar is GPL-2.0-or-later. Keep emulator-specific changes in a compliant fork/module and preserve the generic Astera interface boundary.
