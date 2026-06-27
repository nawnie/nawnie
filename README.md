<p align="center">
  <img src="assets/AIWF_LOGO.png" alt="AI Without Fear" width="150"/>
</p>

<h1 align="center">Hey, I'm Shawn</h1>

<p align="center">
  <strong>AI Without Fear</strong><br/>
  Local AI tools for real hardware: Windows, consumer GPUs, local models, diffusion workflows, training tools, and source-backed retrieval.
</p>

<p align="center">
  <a href="https://github.com/nawnie/AIWF-Studio">
    <img src="https://img.shields.io/badge/AIWF%20Studio-local%20creative%20AI-00b894?style=for-the-badge" alt="AIWF Studio"/>
  </a>
  <a href="https://github.com/nawnie/ai-without-fear">
    <img src="https://img.shields.io/badge/Atlas-grounded%20retrieval-orange?style=for-the-badge" alt="AIWF Research Atlas"/>
  </a>
  <a href="https://github.com/nawnie/Model-Operating-Kernel">
    <img src="https://img.shields.io/badge/MoK-model%20runtime-blue?style=for-the-badge" alt="Model Operating Kernel"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Hardware-RTX%204070%20Ti%20Super%20%7C%20RTX%204070%20Laptop-76b900?style=flat-square" alt="Hardware"/>
  <img src="https://img.shields.io/badge/Focus-local%20AI%20%7C%20RAG%20%7C%20diffusion-blue?style=flat-square" alt="Focus"/>
  <img src="https://img.shields.io/badge/Location-North%20Carolina%2C%20US-555?style=flat-square" alt="Location"/>
</p>

---

## What I'm building

I build local AI tools for people running real machines at home. The target is not a clean cloud demo. It is a Windows box with an RTX GPU, mixed model folders, broken paths, and a user who still wants the tool to work.

AI Without Fear is the umbrella for that work: local creative AI, grounded retrieval, model routing, and training interfaces that normal users can inspect.

---

## Featured work

### AIWF Studio

<p>
  <a href="https://github.com/nawnie/AIWF-Studio">
    <img src="https://img.shields.io/badge/View%20Repo-AIWF%20Studio-00b894?style=for-the-badge" alt="AIWF Studio repo"/>
  </a>
  <img src="https://img.shields.io/badge/Status-early%20public%20build-yellow?style=for-the-badge" alt="Early public build"/>
</p>

AIWF Studio is a local-first workspace for image generation, inpainting, video, and video-audio post-processing on Windows and NVIDIA GPUs.

It rebuilds the familiar Stable Diffusion web UI idea with typed requests, explicit backend services, repo-local model folders, and less global state. The public branch focuses on image generation, inpaint, ControlNet, enhancement, segmentation, Wan video, LTX, Flux, and the newer React Pro UI.

Status: early public build. Not a finished replacement for AUTOMATIC1111, Forge, or ComfyUI.

[View AIWF Studio](https://github.com/nawnie/AIWF-Studio)

---

### AIWF Research Atlas

<p>
  <a href="https://github.com/nawnie/ai-without-fear">
    <img src="https://img.shields.io/badge/View%20Repo-AIWF%20Atlas-orange?style=for-the-badge" alt="AIWF Research Atlas repo"/>
  </a>
  <img src="https://img.shields.io/badge/Status-v3.3%20research%20preview-blue?style=for-the-badge" alt="Research preview"/>
</p>

AIWF Research Atlas is a source-backed retrieval corpus for local AI assistants.

Atlas keeps source policy, retrieval cards, topic lanes, Gradio 6 material, ComfyUI notes, evaluation prompts, and provenance files in one indexable tree. The job is simple: make assistants check grounded project context before they invent setup steps.

Status: v3.3 research preview. Fast-moving package, model, API, benchmark, license, and compatibility claims still need live source checks before use.

[View AIWF Research Atlas](https://github.com/nawnie/ai-without-fear)

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

## Newer 2026 work

### ReTrain

[ReTrain](https://github.com/nawnie/ReTrain) is a local-first training workbench for consumer GPU fine-tuning. It is also public proof-of-work for RNV1: working software we built to train, test, and document local model-improvement flows instead of only describing the idea.

### RNV1

[RNV1](https://github.com/nawnie/MOKSHA) is the investor-facing page for the embodied local AI program that was previously staged as MOKSHA. It keeps the core implementation private and points to public proof-of-work, especially ReTrain, Model Operating Kernel, and AIWF Research Atlas.

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

If AIWF Studio, Atlas, MoK, or my local AI notes save you setup time, you can support continued development:

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
