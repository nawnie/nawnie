<p align="center">
  <img src="assets/AIWF_LOGO.png" alt="AI Without Fear" width="150"/>
</p>

<h1 align="center">Hey, I'm Shawn</h1>

<p align="center">
  <strong>AI Without Fear</strong><br/>
  Practical local AI tools, grounded retrieval systems, and diffusion workflows built for real hardware.
</p>

<p align="center">
  <a href="https://github.com/nawnie/ai-without-fear">
    <img src="https://img.shields.io/badge/Atlas-grounded%20RAG-orange?style=for-the-badge" alt="AIWF Atlas"/>
  </a>
  <a href="https://github.com/nawnie/atlas-lora-adapter">
    <img src="https://img.shields.io/badge/Atlas%20Reader-QLoRA%20Lab-8A2BE2?style=for-the-badge" alt="Atlas Reader LoRA Lab"/>
  </a>
  <a href="https://github.com/nawnie/AIWF-Studio">
    <img src="https://img.shields.io/badge/AIWF%20Studio-local%20diffusion-00b894?style=for-the-badge" alt="AIWF Studio"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Hardware-RTX%204070%20Ti%20Super%20%7C%20RTX%204070%20Laptop-76b900?style=flat-square" alt="Hardware"/>
  <img src="https://img.shields.io/badge/Focus-local%20AI%20%7C%20RAG%20%7C%20diffusion-blue?style=flat-square" alt="Focus"/>
  <img src="https://img.shields.io/badge/Location-North%20Carolina%2C%20US-555?style=flat-square" alt="Location"/>
</p>

---

## What I'm Building

I build practical local AI systems for people working on real machines, not cloud fantasy hardware.

- **Grounded retrieval** — source-backed AI answers instead of hallucinated setup steps.
- **Local diffusion tools** — cleaner image-generation workflows for local hardware.
- **Evaluation-first experiments** — narrow claims, recorded results, honest limits.

---

## Featured Projects

### AI Without Fear Atlas

<p>
  <a href="https://github.com/nawnie/ai-without-fear">
    <img src="https://img.shields.io/badge/View%20Repo-AIWF%20Atlas-orange?style=for-the-badge" alt="AIWF Atlas repo"/>
  </a>
  <img src="https://img.shields.io/badge/Type-grounded%20RAG-orange?style=for-the-badge" alt="Grounded RAG"/>
  <img src="https://img.shields.io/badge/Status-research%20preview-blue?style=for-the-badge" alt="Research preview"/>
</p>

A grounded RAG corpus for local AI workflows.

**Covers:**

- ComfyUI nodes and API behavior
- Gradio 6 patterns
- model serving
- Python and pip troubleshooting
- evaluation harnesses
- local AI workflow notes

**Problem it solves:** most AI assistants confidently get ComfyUI node names wrong, recommend outdated Gradio patterns, and hallucinate venv paths. Atlas gives them grounded retrieval material instead.

[**View AI Without Fear Atlas →**](https://github.com/nawnie/ai-without-fear)

---

### Atlas Reader LoRA Lab

<p>
  <a href="https://github.com/nawnie/atlas-lora-adapter">
    <img src="https://img.shields.io/badge/View%20Repo-Atlas%20Reader%20Lab-8A2BE2?style=for-the-badge" alt="Atlas Reader LoRA Lab repo"/>
  </a>
  <img src="https://img.shields.io/badge/Type-QLoRA%20research-8A2BE2?style=for-the-badge" alt="QLoRA research"/>
  <img src="https://img.shields.io/badge/Status-internal%20lab-lightgrey?style=for-the-badge" alt="Internal lab"/>
</p>

A working research/evaluation lab for testing whether a lightweight QLoRA adapter can learn to read structured Atlas context.

**Tests:**

- lanes
- cards
- base64 encoded routing
- source rules
- compact evidence packs
- selected-card paths
- off-ramp behavior when evidence is missing

**Current internal result:** the best internal run preserves compact-card behavior, improves targeted retrieval behavior, and records compact selected-card paths using about **5.05x–20x fewer total tokens** than raw workspace/RAG-style comparisons in specific lab use cases.

> This is **not** presented as a production package, external benchmark, or universal token-reduction claim.

[**View Atlas Reader LoRA Lab →**](https://github.com/nawnie/atlas-lora-adapter)

---

### AIWF Studio

<p>
  <a href="https://github.com/nawnie/AIWF-Studio">
    <img src="https://img.shields.io/badge/View%20Repo-AIWF%20Studio-00b894?style=for-the-badge" alt="AIWF Studio repo"/>
  </a>
  <img src="https://img.shields.io/badge/Type-local%20diffusion-00b894?style=for-the-badge" alt="Local diffusion"/>
  <img src="https://img.shields.io/badge/Status-early%20public%20build-yellow?style=for-the-badge" alt="Early public build"/>
</p>

An early public build of a local-first Stable Diffusion workspace and clean-room AUTOMATIC1111-style WebUI rebuild.

**Built around:**

- typed request and config models
- repo-local runtime folders
- service-routed UI actions
- model management
- txt2img, img2img, and inpaint workflow surfaces
- PNG info, history, settings, enhancement, and segmentation
- early `/api/v1` plus A1111-style `/sdapi/v1` adapter work

**Problem it solves:** local diffusion tools are powerful, but many grew quickly into difficult-to-maintain stacks with broad shared state, tightly coupled UI/runtime behavior, and confusing extension paths.

> AIWF Studio is **not** presented as a finished replacement for AUTOMATIC1111, Forge, or ComfyUI.  
> It is a public foundation for exploring a more maintainable, contributor-friendly local diffusion workspace.

[**View AIWF Studio →**](https://github.com/nawnie/AIWF-Studio)

---

## What Connects These Projects

### Grounded local AI

AI systems should retrieve real project knowledge before answering. Atlas focuses on source-aware retrieval, answer gating, compact evidence packs, and failure behavior when evidence is missing.

### Maintainable diffusion tools

AIWF Studio explores what a familiar local diffusion workspace can look like when service boundaries, typed requests, and repo-local runtime behavior are part of the foundation.

### Consumer hardware research

The work is built around practical constraints: Windows setups, local models, 16GB/8GB VRAM machines, and workflows normal users can actually run.

### Evaluation-first experiments

The goal is not just to make demos. The goal is to record what works, what fails, and where claims need to stay narrow.

---

## Focus Areas

<p>
  <img src="https://img.shields.io/badge/Local%20AI-consumer%20hardware-111827?style=for-the-badge" alt="Local AI"/>
  <img src="https://img.shields.io/badge/ComfyUI-workflows%20%26%20API-black?style=for-the-badge" alt="ComfyUI"/>
  <img src="https://img.shields.io/badge/RAG-grounded%20retrieval-orange?style=for-the-badge" alt="RAG"/>
  <img src="https://img.shields.io/badge/Gradio-6-ff7c00?style=for-the-badge" alt="Gradio 6"/>
  <img src="https://img.shields.io/badge/QLoRA-evaluation%20lab-8A2BE2?style=for-the-badge" alt="QLoRA"/>
  <img src="https://img.shields.io/badge/Stable%20Diffusion-local%20workspace-00b894?style=for-the-badge" alt="Stable Diffusion"/>
</p>

- **Local AI** — Running and testing models on consumer hardware.
- **ComfyUI** — Workflows, node behavior, API automation, and datatype boundaries.
- **RAG & Retrieval** — Corpus design, chunking strategy, source governance, and answer gating.
- **Gradio 6** — App building, local UI workflows, and cleaner user-facing tools.
- **Model Training** — LoRA/QLoRA experiments, evaluation records, and domain-specific adapters.
- **Diffusion UX** — Making local image tooling easier to understand and maintain.

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
  <img src="https://img.shields.io/badge/Windows-local%20workflow-0078D6?style=flat-square&logo=windows&logoColor=white" alt="Windows"/>
</p>

---

## Support the Work

If Atlas, AIWF Studio, or any of my local AI notes/tools save you time, you can support continued development:

<p>
  <a href="https://venmo.com/code?user_id=4526061123536861189&created=1779356130">
    <img src="https://img.shields.io/badge/Support-Venmo%20%40Shawn--Ohagan--4-3D95CE?style=for-the-badge" alt="Support on Venmo"/>
  </a>
</p>

---

<p align="center">
  <strong>AI Without Fear</strong><br/>
  <em>Practical local AI for real people, on real hardware.</em>
</p>
