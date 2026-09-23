# Test plan

## 3DS

- verify left/right eye identity with eye-swap toggle
- compare stock Azahar Cardboard vs Astera compositor
- test 3D intensity range
- verify bottom screen remains mono
- test Vulkan and OpenGL paths
- measure frame pacing and thermal behavior

## DS

- verify depth-buffer orientation/normalization
- scene with 3D polygons + 2D sprites
- HUD kept mono
- touch-screen placement and cursor
- compare native depth vs AI depth vs hybrid

## GBA

- pure BG scrolling game
- sprite-heavy battle scene
- affine BG game
- HUD/text preservation
- compare layer vs AI vs hybrid

## Shared

- IPD/convergence live controls
- curved vs flat screen
- Rx experiment on/off
- A/B preset switching
- no app restart on mode change
- telemetry and subjective rating
