# Astera Emulator XR

Experimental VR/stereo bridge for bringing **3DS, DS, and GBA emulation into Astera's phone-first XR pipeline**.

> Status: shared bridge API + emulator integration plan published. Emulator-specific forks and physical-device captures are next.

## Geometry source by platform

| Platform | Preferred geometry source |
| --- | --- |
| Nintendo 3DS | Native left/right stereo cameras |
| Nintendo DS 3D | Emulator-native Z/depth buffer |
| Nintendo DS 2D | BG/OBJ layer priority + optional AI |
| Game Boy Advance | BG/sprite priority + optional AI |
| Fallback | Astera AI monocular depth |

The core rule is simple: **use real geometry when the emulator already knows it, and use AI only when it does not.**

## 3DS / Azahar

Azahar already implements Cardboard VR, native stereo intensity, eye swapping, screen sizing/positioning, and OpenGL/Vulkan paths.

Astera's adapter is designed to consume the **native eye pair** and add:

- live IPD / convergence
- independent eye trim
- curved virtual screen
- viewer calibration
- experimental prescription-aware filtering
- controller-bank calibration
- A/B presets and ratings

The lower 3DS screen stays monoscopic as a movable floating panel.

## DS / melonDS

melonDS already maintains real 3D depth data for hardware-3D content. Astera can synthesize stereo from the emulator's actual Z-buffer instead of guessing depth from RGB.

For 2D layers, BG/OBJ ordering can provide coarse depth planes.

## GBA / mGBA

GBA is primarily layered 2D, which is useful rather than limiting. Astera can map BG and sprite priority into stable parallax planes.

Modes:

- **Layer** — deterministic and cheap
- **AI** — RGB monocular depth
- **Hybrid** — hardware layer metadata + AI refinement

## Shared bridge

The portable API supports four input classes:

```text
submitMono(frame)
submitStereo(left, right)
submitRgbDepth(rgb, depth)
submitLayers(layers, priorities)
```

See:

- `native/include/astera_xr_bridge.h`
- `src/AsteraEmulatorBridge.java`

## Architecture

```text
3DS native stereo ----+
DS native Z-buffer ---+--> Astera XR Core --> optics/curve/Rx --> headset
GBA/DS layers --------+
AI fallback ----------+
```

## Current state

- [x] shared Java frame/capability API
- [x] portable C ABI
- [x] automatic geometry-path selection
- [x] Azahar hook map
- [x] melonDS native-depth hook map
- [x] mGBA layer-depth strategy
- [x] Java compile test
- [x] native C++ smoke test
- [ ] wire into Astera authoritative Android checkout
- [ ] create emulator forks/adapters
- [ ] physical Galaxy S25 Ultra validation
- [ ] replace placeholder media section with real emulator captures

## Screenshots

Real screenshots will be captured from the PC/emulators and physical phone later. This first public pass intentionally avoids bundling third-party game art.

## Licensing

Emulator integration must respect upstream licenses:

- Azahar: GPL-2.0-or-later
- melonDS: GPL-3.0-or-later
- mGBA: MPL-2.0

The architecture keeps emulator-specific modifications at explicit adapter boundaries.

## Scope

This project does not provide ROMs, firmware, encryption keys, game assets, or copyrighted game content.
