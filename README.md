<p align="center">
  <img src="assets/AIWF_LOGO.png" alt="AI Without Fear" width="150"/>
</p>

<h1 align="center">Hey, I'm Shawn</h1>

<p align="center">
  <strong>AI Without Fear</strong><br/>
  Local AI tools for real hardware: Windows, consumer GPUs, local models, diffusion workflows, training tools, and source-backed retrieval.
</p>

<p align="center">
  <a href="https://www.aiembeddedsystems.com"><strong>www.aiembeddedsystems.com</strong></a>
</p>

<p align="center">
  <a href="https://github.com/nawnie/AIWF-Studio">
    <img src="https://img.shields.io/badge/AIWF%20Studio-local%20creative%20AI-00b894?style=for-the-badge" alt="AIWF Studio"/>
  </a>
  <a href="https://github.com/nawnie/ReTrain">
    <img src="https://img.shields.io/badge/ReTrain-consumer%20GPU%20training-7c3aed?style=for-the-badge" alt="ReTrain"/>
  </a>
  <a href="https://github.com/nawnie/Model-Operating-Kernel">
    <img src="https://img.shields.io/badge/MoK-model%20runtime-blue?style=for-the-badge" alt="Model Operating Kernel"/>
  </a>
  <a href="https://www.aiembeddedsystems.com">
    <img src="https://img.shields.io/badge/AI%20Embedded%20Systems-website-111111?style=for-the-badge" alt="AI Embedded Systems website"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Hardware-RTX%204070%20Ti%20Super%20%7C%20RTX%204070%20Laptop-76b900?style=flat-square" alt="Hardware"/>
  <img src="https://img.shields.io/badge/Focus-local%20AI%20%7C%20training%20%7C%20diffusion-blue?style=flat-square" alt="Focus"/>
  <img src="https://img.shields.io/badge/Location-North%20Carolina%2C%20US-555?style=flat-square" alt="Location"/>
</p>

---

## What I'm building

I build local AI tools for people running real machines at home. The target is not a clean cloud demo. It is a Windows box with an RTX GPU, mixed model folders, broken paths, and a user who still wants the tool to work.

AI Without Fear is the umbrella for that work. AI Embedded Systems is the public build label behind it: [www.aiembeddedsystems.com](https://www.aiembeddedsystems.com). The point is control. Models, outputs, logs, SDKs, and private traces should stay local unless a repo clearly says otherwise.

The public work is split into connected parts. AIWF Studio is the creative app. ReTrain is the training workbench and the main new focus. Model Operating Kernel is the model routing layer. Atlas supports the stack as source-backed project memory. They are separate repos because each problem needs its own tests, docs, and failure notes, but they are meant to support the same local-first workflow.

---

## Featured work

### AIWF Studio

<p>
  <a href="https://github.com/nawnie/AIWF-Studio">
    <img src="https://img.shields.io/badge/View%20Repo-AIWF%20Studio-00b894?style=for-the-badge" alt="AIWF Studio repo"/>
  </a>
  <img src="https://img.shields.io/badge/Status-active%20public%20build-yellow?style=for-the-badge" alt="Active public build"/>
</p>

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

<p>
  <a href="https://github.com/nawnie/ReTrain">
    <img src="https://img.shields.io/badge/View%20Repo-ReTrain-7c3aed?style=for-the-badge" alt="ReTrain repo"/>
  </a>
  <img src="https://img.shields.io/badge/Status-active%20public%20build-yellow?style=for-the-badge" alt="Active public build"/>
</p>

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

<p>
  <a href="https://github.com/nawnie/Model-Operating-Kernel">
    <img src="https://img.shields.io/badge/View%20Repo-Model%20Operating%20Kernel-blue?style=for-the-badge" alt="Model Operating Kernel repo"/>
  </a>
  <img src="https://img.shields.io/badge/Status-early%20runnable%20slice-yellow?style=for-the-badge" alt="Early runnable slice"/>
</p>

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

<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/NVIDIA%20RTX-VFX%20SDK-76B900?style=flat-square&logo=nvidia&logoColor=white" alt="NVIDIA RTX / VFX SDK"/>
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch"/>
  <img src="https://img.shields.io/badge/Gradio-FF7C00?style=flat-square" alt="Gradio"/>
  <img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=flat-square&logo=huggingface&logoColor=black" alt="Hugging Face"/>
  <img src="https://img.shields.io/badge/ComfyUI-local%20AI-black?style=flat-square" alt="ComfyUI"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git"/>
  <img src="https://img.shields.io/badge/Windows-local%20workflow-0078D6?style=flat-square&logo=windows" alt="Windows"/>
</p>

---

## Support the work

If AIWF Studio, ReTrain, MoK, Atlas, or my local AI notes save you setup time, you can support continued development:

<p>
  <a href="https://venmo.com/code?user_id=4526061123536861189&created=1779356130">
    <img src="https://img.shields.io/badge/Support-Venmo%20%40Shawn--Ohagan--4-3D95CE?style=for-the-badge" alt="Support on Venmo"/>
  </a>
</p>

---

<p align="center">
  <strong>AI Without Fear</strong><br/>
  <em>Local AI tools for real people, on real hardware.</em>
</p>
