# Architecture

Use the strongest geometry source available:

1. **3DS** -> native stereo cameras
2. **DS hardware 3D** -> native depth buffer
3. **DS/GBA 2D** -> layer/sprite priority metadata
4. **Unsupported path** -> AI monocular depth

```text
                 Emulator
                    |
          +---------+----------+
          |         |          |
      Stereo     RGB+Depth   Layered
          |         |          |
          +---------+----------+
                    |
               Astera XR Core
                    |
         optics / curve / Rx / HUD
                    |
                 headset
```

Native stereo/depth is temporally exact and game-engine-aware. Layer metadata is deterministic and cheap. AI becomes a fallback/refinement instead of the first tool used for every platform.

The shared Java bridge and portable C ABI intentionally avoid depending on a particular emulator or graphics API.
