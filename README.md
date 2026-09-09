# Shawn O'Hagan

<p align="center">
  <img src="assets/AIWF_LOGO.png" alt="AI Without Fear" width="150">
</p>

<p align="center">
  <strong>Applied AI systems, local inference, agent infrastructure, and edge software for real hardware.</strong>
</p>

<p align="center">
  <a href="https://aiembeddedsystems.com/">AI Embedded Systems</a>
  &nbsp;|&nbsp;
  <a href="https://ai-wf.org/">AI Without Fear</a>
  &nbsp;|&nbsp;
  <a href="https://github.com/nawnie">GitHub</a>
</p>

I build the systems that models have to live inside: runtimes, routing, evaluation, provenance, recovery, developer tools, GPU-aware applications, and interfaces that make failure states visible instead of pretending they do not exist.

My background is in operations leadership, so I tend to engineer around handoffs, exceptions, audit trails, recovery paths, limited resources, and users who cannot stop the operation to debug the software.

## Flagship work

| Project | What it demonstrates |
| --- | --- |
| **[AIWF Studio](https://github.com/nawnie/AIWF-Studio)** | Local-first Windows creative AI workspace with FastAPI + React/TypeScript, replaceable local backends, model-family routing, install/upgrade safeguards, benchmarking, and renderer QA |
| **[Atlas Core](https://github.com/nawnie/atlas-core)** | Deterministic agent/runtime infrastructure: canonical events, provenance, approval gates, replay/idempotency, recovery, rollback evidence, and bounded provider interfaces |
| **[Model Operating Kernel](https://github.com/nawnie/Model-Operating-Kernel)** | Local model/tool orchestration with explicit routing policies, VRAM budgeting, multiple backend lanes, and replayable JSONL traces |
| **A.C.M.E. Mobile** *(private case study)* | Android edge-AI work validated on a physical Galaxy S25 Ultra and emulator, including local inference, thermal pacing, signed APK verification, instrumentation, and real-engine parity testing |
| **Kairo** *(private research program)* | Experimental non-LLM adaptive reasoning substrate exploring selective repair, competing explanations, change transport, workflow discovery/reuse, and evidence-gated adaptation |

## Engineering signals

- **AIWF Studio alpha.5:** 182 backend tests passed, 18 frontend request/wire tests passed, compiled frontend passed, and 9/9 required renderer QA checks passed.
- **A.C.M.E. Mobile:** repeated physical-device validation with exact built-versus-installed APK hash checks, emulator/device gates, and 11/11 real-engine parity runs in the verified status history.
- **Kairo R22:** learned and reused a six-action CSV workflow, adapted after action bindings changed, and produced nine reports matching independently frozen expected bytes and totals.
- **MoK2 CAIS slice:** 34 Python unit tests passed, with unproven Windows/GPU integration explicitly kept outside the claim boundary.

## Role-specific proof shelf

| Project | Signal |
| --- | --- |
| **[Model Speedometer](https://github.com/nawnie/model-speedometer)** | Native Windows WPF telemetry for observed local-AI throughput, VRAM, CPU, RAM, and local runtime discovery |
| **[ReTrain](https://github.com/nawnie/ReTrain)** | Windows-first local fine-tuning workbench for supported SFT, LoRA, QLoRA, Seq2Seq, and masked-LM paths with readiness checks and receipts |
| **[Shawn Core](https://github.com/nawnie/shawn-core-mcp)** | Evidence-backed agent/runtime prototypes with schema enforcement, validation gates, workbench/control surfaces, and evidence databases |
| **Creation Kit MCP + Lore Atlas** *(private)* | MCP/tool design, domain modeling, provenance-aware corpus engineering, retrieval policy, and deterministic validation |
| **AI Phone Intake** *(private)* | Role-aware workflow control plane with consent/approval gates, deterministic simulation, fail-closed queues, and typed OpenAPI/MCP validation |

## What I work on

- local inference and consumer-GPU systems
- agent runtimes, tool contracts, orchestration, and evaluation
- provenance, replay, approval, recovery, and observability
- Android/edge AI and native Windows applications
- model training, benchmarking, telemetry, and resource scheduling
- developer tooling that exposes the machinery clearly enough to debug

## Stack

**Python · FastAPI · PyTorch · Hugging Face · Diffusers · Gradio · React · TypeScript · Vite · Kotlin/Compose · ONNX Runtime · C#/.NET WPF · C++17/Win32 · SQLite · PowerShell · CMake · Ollama · llama.cpp · vLLM-compatible services · ComfyUI · NVIDIA RTX**

## The throughline

I am most interested in the layer where models meet real machines. The useful question is not only *can the model do it?* It is also: **what state changed, what evidence do we have, what happens when it fails, and can a person recover the system without rebuilding the universe?**

I am targeting **Applied AI, AI Developer Tools, Agent Systems, Local Inference, Edge AI, and ML Systems Prototyping** roles.

> Historical forks, mirrors, upstream experiments, and imported projects remain visible on this account as part of the learning trail, but they are not presented as original engineering. The projects above are the work I want evaluated first.

<p align="center">
  <a href="https://github.com/nawnie/ai-embedded-systems">AI Embedded Systems</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/nawnie/ai-without-fear">AI Without Fear</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/nawnie/Rnv1">RNV1</a>
</p>
