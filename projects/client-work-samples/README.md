# Practical operations and automation samples

Business workflows, small working demos and clearly scoped AI product design by Shawn O'Hagan.

My background is in hotel management and multi-location operations across hotels and restaurants. These samples show how I translate operating problems into inspectable rules, useful reports and interfaces people can understand.

## Try the work

Open `index.html` in a browser. The three demonstrations run locally, without installation, external requests, a model download or account access. Their inputs are fictional. They do not connect to business systems or send data anywhere.

| Sample | What can be inspected | Status |
| --- | --- | --- |
| [Hotel staffing planner](case-studies/01_predictive_operations.md) | Workload assumptions, labor hours, rounded staff requirement | Working deterministic demo |
| [Property operating screen](case-studies/02_property_due_diligence.md) | Operating income, debt-service coverage, reserve gap | Working deterministic demo |
| [Room readiness audit](case-studies/03_property_management.md) | Status mapping, exception queue, input validation | Working deterministic demo |
| [AI task routing](case-studies/04_ai_workflow.md) | Approval boundary, action contract, stop conditions | Architecture sample |
| [Multi-site review](case-studies/05_multilocation_operations.md) | Reporting cadence and action register | Operations framework sample |
| [AES Studio](case-studies/06_aes_studio.md) | MOSS Image generation and Qwen Image 2.1 edit workflow | Development preview; experimental external workflows |
| [AES ReTrain](case-studies/07_aes_retrain.md) | Proposed image-lane readiness and evaluation design | Existing workbench; image lane proposed |

## Verify the demonstrations

With a supported modern Node.js installation:

```sh
node --test tests/engine.test.cjs
```

The engine uses the built-in Node test runner; no package install is required. `examples/fixture.json` provides the exact sample inputs and `examples/results.json` contains their expected outputs. Tests cover the calculations, input boundaries, duplicate room identifiers and the browser-compatible module.

The staffing example is arithmetic, not an AI prediction. The property example is an educational operating screen, not a valuation or investment recommendation. The room audit is read-only and disconnected from a PMS.

## Product boundaries

The AES entries intentionally discuss only MOSS Image and Qwen Image 2.1. They include no model weights, private datasets, proprietary orchestration or training recipes. The Studio visuals are concept interfaces, not application screenshots or newly generated model outputs. ReTrain's proposed image lane does not establish MOSS or Qwen Image 2.1 training support.

## Authorship and evidence

These are AI-assisted portfolio samples built around my operational requirements and existing project context. The working-demo results come from the included tests. Design-only items have no invented deployment, customer outcome or benchmark. Original code in this showcase is separate from the AES product implementations.

## Keeping publication deliberate

Published on 6 November 2026 under `projects/client-work-samples/` in [nawnie/nawnie](https://github.com/nawnie/nawnie) as an additive portfolio update. The profile README gained a selected-work section; the earlier profile content and projects were preserved. The publication commit was `2e5f064fe96f552c30a035411edf3780b3bf0331`. No repository visibility, license, or Pages configuration was changed. This repository folder is public, but no open-source license is granted here.

The Upwork upload pack is a separate contact-free set. Do not attach this repository bundle, source README or external profile links to an Upwork portfolio without a fresh review of the destination and its rules.
