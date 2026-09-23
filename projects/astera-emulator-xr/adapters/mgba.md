# mGBA / GBA adapter

Exploit the GBA renderer's own layer/priority structure before using AI.

The emulator knows BG0/BG1/BG2/BG3 ordering, sprite/OAM data, BG priority, and object priority. These can be converted into stable coarse pseudo-depth.

## Modes

- **Layer** — deterministic and nearly free
- **AI** — rendered frame -> Astera depth
- **Hybrid** — layer metadata as a prior + AI refinement

Example depth mapping:

```text
HUD/text             -> 0.00 (mono preferred)
foreground sprites   -> 0.20
foreground BG        -> 0.40
middle BG            -> 0.65
far BG               -> 0.90
```

The exact mapping stays game-adjustable because hardware priority is not semantic physical depth.

mGBA is MPL-2.0. Preserve file-level notices and review redistribution obligations before shipping.
