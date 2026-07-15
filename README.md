<p align="center">
  <img src="assets/AIWF_LOGO.png" alt="AI Without Fear" width="150"/>
</p>

<h1 align="center">Hey, I'm Shawn</h1>

<p align="center">
  <strong>AI Without Fear</strong><br/>
  Local AI tools for real hardware: Windows, consumer GPUs, local models, diffusion workflows, training tools, and source-backed retrieval.
</p>

<p align="center">
  <a href="https://aiembeddedsystems.com/"><strong>AI Embedded Systems</strong></a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="https://myhome-studios.com/"><strong>My Home Studios</strong></a>
</p>

<p align="center">
  <a href="https://github.com/nawnie/AIWF-Studio">AIWF Studio</a><br/>
  <a href="https://github.com/nawnie/ReTrain">ReTrain</a><br/>
  <a href="https://github.com/nawnie/Model-Operating-Kernel">Model Operating Kernel</a><br/>
  <a href="https://github.com/nawnie/ai-without-fear">AIWF Research Atlas</a>
</p>

<p align="center">
  RTX 4070 Ti Super + RTX 4070 Laptop<br/>
  Windows local AI | diffusion | consumer GPU training<br/>
  model routing | source-backed retrieval
</p>

---

## What I'm building

I build local AI tools for people running real machines at home. The target is not a clean cloud demo. It is a Windows box with an RTX GPU, mixed model folders, broken paths, and a user who still wants the tool to work.

AI Without Fear is the umbrella for that work. [AI Embedded Systems](https://aiembeddedsystems.com/) turns it into private AI and embedded systems for real-world operations. [My Home Studios](https://myhome-studios.com/) carries the same practical approach into hotel-to-apartment conversion: clear property workflows, traceable reporting, and measurable operating outcomes.

The common thread is useful systems built around the real environment. Models, outputs, logs, SDKs, and private traces should stay local unless a repo clearly says otherwise. Business tools should be just as concrete about their sources, limits, and next actions.

The public work is split into connected parts. AIWF Studio is the creative app. ReTrain is the training workbench and the main new focus. Model Operating Kernel is the model routing layer. Atlas supports the stack as source-backed project memory. They are separate repos because each problem needs its own tests, docs, and failure notes, but they are meant to support the same local-first workflow.

---

## Featured work

| Project | Focus | Status |
| --- | --- | --- |
| [AIWF Studio](https://github.com/nawnie/AIWF-Studio) | Local creative AI for image, video, and post-processing | Active public build |
| [ReTrain](https://github.com/nawnie/ReTrain) | Consumer GPU fine-tuning workbench | Active public build |
| [Model Operating Kernel](https://github.com/nawnie/Model-Operating-Kernel) | Local runtime and expert routing layer | Early runnable slice |
| [AIWF Research Atlas](https://github.com/nawnie/ai-without-fear) | Source-backed project memory and retrieval corpus | Research preview |

### AIWF Studio

AIWF Studio is the main public creative build right now: a local-first workspace for image generation, inpainting, video, and video-audio post-processing on Windows and NVIDIA GPUs.

It rebuilds the familiar Stable Diffusion web UI idea around explicit backend services, typed requests, repo-local model folders, and fewer hidden globals. The goal is not to hide complexity. The goal is to make local generation easier to inspect when something breaks.

The app has two surfaces. Pro is the cleaner FastAPI and React app for normal use. Gradio Lab is the wider test surface where new image, video, model, and post-processing paths usually land first. Both share the same local model folders, settings, output history, and runtime services.

What AIWF Studio is shipping or proving on `main`:

- Local model discovery for Stable Diffusion, SDXL, SD3.5, Flux, Wan, LTX, LoRAs, VAEs, ControlNet, SAM, and enhancement models.
- Image workflows for txt2img, img2img, inpaint, ControlNet, segmentation, enhancement, metadata, and prompt helpers.
- Video workflows for Wan, LTX, RIFE interpolation, ReActor post-processing, NVIDIA VSR/Video Effects SDK routes, and generated audio muxing.
- A Pro UI with Create, Workflow builder, Model Families, Models, Data, Monitor, Logs, Settings, and newer workspace screens in active integration.
- User extensions through `plugins/`, including REST routes, Gradio tabs, and event hooks.
- Runtime notes, smoke tests, and benchmark receipts that separate working routes from experiments.

Status: active public build. Not a finished replacement for AUTOMATIC1111, Forge, or ComfyUI.

[View AIWF Studio](https://github.com/nawnie/AIWF-Studio)

---

### ReTrain

ReTrain is the main training-side project: a local-first workbench for consumer GPU fine-tuning with no-code controls, safety gates, and readable run receipts.

The first serious lane is LLM and chat fine-tuning. ReTrain is building around QLoRA, full SFT with explicit tune-scope controls, alignment methods through TRL, model download staging, Hugging Face model selection, TensorBoard, dataset recipes, and dry-run receipts before training starts.

It is also public proof-of-work for RNV1. RNV1 keeps the core implementation private, while ReTrain shows the software being built and tested in public: model setup, training controls, run outputs, and a path toward a richer React/FastAPI training board.

What ReTrain is working toward:

- Gradio 6 as the first practical training surface, with a React/FastAPI board growing beside it.
- QLoRA as the first consumer GPU training engine.
- Full SFT controls for full model, last-layer, and output-head tuning.
- Alignment lanes for DPO, GRPO, reward modeling, KTO, and RLOO where the local TRL runtime supports them.
- Dataset recipe builders, vision dataset export, model inventory, and VRAM checks before expensive runs.
- JSON-friendly backend workers so training runs can feed dashboards, receipts, and later routing evaluation.

Status: active public build. The current public focus is LLM/chat/LoRA training on local hardware, not a finished general-purpose training platform.

[View ReTrain](https://github.com/nawnie/ReTrain)

---

### Model Operating Kernel

Model Operating Kernel is a local runtime layer for coordinating model and expert backends on consumer hardware.

MoK registers experts, routes requests, tracks VRAM pressure, calls local or HTTP-backed models, writes JSONL traces, and exports data for routing evaluation. It is not an in-model MoE system. It is the control layer around models.

Status: early runnable slice. The next job is to collect real local traces, measure VRAM behavior, and test routing quality against repeatable eval sets.

[View Model Operating Kernel](https://github.com/nawnie/Model-Operating-Kernel)

---

## Supporting work

### AIWF Research Atlas

[AIWF Research Atlas](https://github.com/nawnie/ai-without-fear) is the source-backed retrieval corpus behind the AIWF stack. It keeps source policy, retrieval cards, topic lanes, Gradio 6 material, ComfyUI notes, evaluation prompts, and provenance files in one indexable tree.

Atlas is still useful, but it is now supporting infrastructure rather than the main public focus. Its job is to make assistants check grounded project context before they invent setup steps.

Status: v3.3 research preview. Fast-moving package, model, API, benchmark, license, and compatibility claims still need live source checks before use.

### RNV1

[RNV1](https://github.com/nawnie/Rnv1) stands for Ribonucleic Vectors v1. It is the investor-facing page for the embodied local AI program. It keeps the core implementation private and points to public proof-of-work, especially ReTrain, Model Operating Kernel, and AIWF Research Atlas.

### Atlas Reader LoRA Lab

[Atlas Reader LoRA Lab](https://github.com/nawnie/atlas-lora-adapter) tests whether a small QLoRA adapter can learn to read structured Atlas context. It is an internal lab, not a production package or universal token-reduction claim.

---

## How I work

- Consumer hardware first: RTX 4070 Ti Super, RTX 4070 Laptop, Windows setups, local paths, and VRAM limits shape the design.
- Source-backed answers: AI tools should retrieve project knowledge before guessing.
- Recorded limits: demos are useful only when the failure cases and claims are written down.
- Local runtime boundaries: models, outputs, SDKs, and private traces should stay local unless the repo says otherwise.

---

## Stack

Python, PyTorch, Diffusers, Gradio, FastAPI, React, TypeScript, Hugging Face tooling, ComfyUI workflows, Git, Windows, NVIDIA RTX, and local model folders.

---

## Support the work

If AIWF Studio, ReTrain, MoK, Atlas, or my local AI notes save you setup time, you can support continued development:

[Support on Venmo](https://venmo.com/code?user_id=4526061123536861189&created=1779356130)

---

<p align="center">
  <strong>AI Without Fear</strong><br/>
  <em>Practical systems for real hardware and real-world operations.</em><br/>
  <a href="https://aiembeddedsystems.com/">AI Embedded Systems</a> &nbsp;|&nbsp;
  <a href="https://myhome-studios.com/">My Home Studios</a>
</p>
