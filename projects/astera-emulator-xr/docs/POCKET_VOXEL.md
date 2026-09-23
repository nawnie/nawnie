# Pocket Voxel / Astera XR candidate

## Summary

Pocket Voxel is a strong Astera XR candidate because it is already a retained 3D voxel runtime rather than a 2D emulator framebuffer.

It does **not** require AR for the use case Astera cares about.

The preferred Astera mode would be:

```text
Pocket Voxel retained scene
        |
        +--> left-eye camera render
        +--> right-eye camera render
                    |
                    v
             Astera XR Core
                    |
         optics / IPD / curve / Rx
                    |
                    v
                 headset
```

No monocular depth model is required.

## Why it fits

Current Pocket Voxel architecture separates gameplay from presentation:

- TypeScript / QuickJS guest owns gameplay.
- Rust core owns the retained voxel scene and renderer-facing draw list.
- ROM-derived content is baked locally and is not committed.
- The project already targets multiple rendering hosts.
- An active 3DS branch/PR adds a dual-screen handheld host.

Upstream:

- https://github.com/pocket-stack/pocket-voxel
- 3DS work: https://github.com/pocket-stack/pocket-voxel/pull/3

## Astera integration options

### A. Native stereo — preferred

Render the retained scene twice using eye-specific view/projection matrices.

Feed the result into:

`AsteraXrStereoFrame`

Advantages:

- geometrically correct binocular views
- no AI depth artifacts
- correct disocclusion
- stable temporal geometry
- Astera can still apply headset optics and calibration

### B. RGB + native depth

Render one RGB view plus the renderer's depth buffer.

Feed:

`AsteraXrRgbDepthFrame`

Then let Astera synthesize the second eye.

This is cheaper than two full scene renders but introduces Astera's normal disocclusion/reprojection tradeoffs.

### C. Hybrid

Use native stereo for the 3D world while preserving Game Boy UI/menu layers as a monoscopic comfort layer.

This is likely the strongest VR presentation:

```text
3D world -> native stereo
GB UI    -> mono comfort plane
                 |
                 v
         Astera compositor
```

## Android host plan

Pocket Voxel does not currently need an AR camera path for Astera.

A phone target should be a normal Android rendering host:

1. run the existing gameplay guest/core
2. create an Android GLES/Vulkan surface
3. expose left/right view matrices
4. render the scene for each eye
5. hand textures to the Astera XR bridge
6. composite UI as mono where appropriate
7. apply Astera viewer calibration and Cardboard output

The S25 Ultra is well above the class of devices Pocket Voxel already targets, so the primary engineering question is host integration rather than raw compute budget.

## Reuse from Astera Emulator XR

Existing bridge types already cover this:

- `FrameCapability.NATIVE_STEREO`
- `FrameCapability.RGB_DEPTH`
- `StereoFrame`
- `RgbDepthFrame`
- `EmulatorXrSettings`

Pocket Voxel can be treated as a native-3D game source rather than an emulator.

## Content boundary

Do not bundle ROM data or ROM-derived assets.

Follow Pocket Voxel's existing local-bake model: the user supplies a supported cartridge dump they own, and derived content remains local.

## Roadmap

- [x] identify Pocket Voxel architecture
- [x] confirm no AR requirement for Astera mode
- [x] confirm active 3DS host work exists
- [ ] inspect the 3DS/PICA host in detail
- [ ] prototype Android host
- [ ] expose native stereo view matrices
- [ ] submit left/right textures to Astera XR
- [ ] preserve UI as optional mono comfort plane
- [ ] test flat vs curved Astera presentation
- [ ] physical S25 Ultra test
- [ ] add real screenshots/captures
