# Shawn O'Hagan

<p align="center">
  <img src="assets/AIWF_LOGO.png" alt="AI Without Fear" width="150">
</p>

<p align="center">
  <strong>Applied AI systems, local/edge inference, agent infrastructure, evaluation, and research engineering for real hardware.</strong>
</p>

<p align="center">
  <a href="https://aiembeddedsystems.com/">AI Embedded Systems</a>
  &nbsp;|&nbsp;
  <a href="https://ai-wf.org/">AI Without Fear</a>
  &nbsp;|&nbsp;
  <a href="https://github.com/nawnie">GitHub</a>
</p>

I build the systems that models have to live inside: routing, evaluation, provenance, recovery, developer tools, GPU-aware applications, and interfaces that make failure states visible instead of pretending they do not exist.

My background is in operations leadership, so I tend to engineer around handoffs, exceptions, audit trails, recovery paths, limited resources, and users who cannot stop the operation to debug the software.

## Core systems

| Project | What it demonstrates |
| --- | --- |
| **[Kairo](https://github.com/nawnie/kairo)** | Public program-inspection and question-answering layer backed by a broader private non-LLM research program exploring selective repair, competing explanations, stateful discovery, change transport, workflow reuse, and evidence-gated adaptation |
| **[Atlas Core](https://github.com/nawnie/atlas-core)** | Deterministic agent/runtime infrastructure: canonical events, provenance, approval gates, replay/idempotency, recovery, rollback evidence, bounded provider interfaces, and claim-level citations |
| **[AIWF Studio](https://github.com/nawnie/AIWF-Studio)** | Local-first Windows creative AI workspace with FastAPI + React/TypeScript, replaceable local backends, model-family routing, install/upgrade safeguards, benchmarking, and renderer QA |
| **[Model Operating Kernel](https://github.com/nawnie/Model-Operating-Kernel)** | Resource-aware model/backend router and execution runtime with explicit policies, VRAM budgeting, circuit breaking, local backend lanes, and replayable traces; now being narrowed back to routing rather than Kairo-style reasoning research |
| **[Shawn Core](https://github.com/nawnie/shawn-core-mcp)** | Evidence-backed specialist control plane with an Orchestrator, bounded specialist routing, local continuity hooks, schema enforcement, and receipt-oriented handoffs |
| **[ReTrain](https://github.com/nawnie/ReTrain)** | Windows-first local fine-tuning workbench with supported SFT/LoRA/QLoRA paths, readiness/VRAM gates, dry runs, logs, receipts, and TensorBoard summaries |
| **[Model Speedometer](https://github.com/nawnie/model-speedometer)** | Native Windows telemetry for observed local-AI throughput, VRAM, CPU, RAM, and local runtime discovery |

## Edge and product engineering

| Project | What it demonstrates |
| --- | --- |
| **A.C.M.E. Mobile** *(private case study)* | Android edge-AI work validated on physical Galaxy S25 Ultra hardware and emulator, including local inference, thermal pacing, signed APK verification, instrumentation, and real-engine parity testing |
| **[FORMANT](https://github.com/nawnie/formant-studio)** | Local-first Web Audio product design with measured WAV export and an MCP-connected collaborator surface |
| **[Audio Equalizer](https://github.com/nawnie/audio-equalizer)** | Native Windows/PySide6 audio tooling with live spectrum analysis, safe routing, crash recovery, and high-DPI UI |

## Private case studies

- **Project Cosmos** — deterministic SQLite event ledger, projections, causal replay, fenced writers, and recoverable two-phase saves for a persistent Starfield universe core.
- **FrontDesk Lite** — C++17/Win32/SQLite offline-first hotel PMS prototype built around actual front-desk failure modes and migration/recovery requirements.
- **Creation Kit MCP + Bethesda Lore Atlas** — MCP/tool design, domain modeling, provenance-aware corpus engineering, retrieval policy, and deterministic validation.
- **AI Phone Intake** — role-aware workflow control plane with consent/approval gates, deterministic simulation, fail-closed queues, and typed OpenAPI/MCP validation.
- **Identity Android** — local face-processing pipeline with unit, emulator, real-CPU, and physical-device verification.

## How the pieces fit

```text
Shawn Core / human-facing orchestrator
                |
                v
       MoK router specialist
     route -> budget -> invoke
        |             |
        v             v
 local models      expert tools
        |
        +----> Kairo when the task needs Kairo's
               evidence-oriented program reasoning
```

**MoK and Kairo are intentionally different.** MoK is the dispatch/runtime layer around models and experts. Kairo is an experimental reasoning and program-understanding research line. Kairo can be a routed expert; it should not become the router itself.

**Atlas Core is also distinct.** Atlas supplies canonical observations, provenance, approvals, continuity, execution evidence, and recovery contracts. Cartographer is a provenance/lineage subsystem inside Atlas Core; the separate AIWF Research Atlas is a research/knowledge corpus.

## Engineering signals

- **Kairo:** bounded experiments keep evaluator truth isolated, retain failed hypotheses, and distinguish static evidence from runtime observation.
- **Atlas Core:** local deterministic vertical slices prove provenance, approval, idempotency, verification, rollback, and recovery without pretending the sandbox is a production vendor integration.
- **AIWF Studio:** public build documents local creative-AI infrastructure, installation safeguards, model/backend boundaries, benchmarking, and renderer QA.
- **MoK:** existing code already contains R0/R1/R2 routing paths, VRAM budgeting, backend registry/execution, circuit breakers, traces, and evaluation infrastructure; current work is simplifying that into a reliable router specialist.
- **A.C.M.E. Mobile:** private edge-AI case study with device, emulator, installation, and real-engine validation documented in verified status history.

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

I am targeting **Applied AI, AI Developer Tools, Agent Systems, Local Inference, Edge AI, AI Safety / Agent Reliability, and ML Systems Prototyping** roles.

> Historical forks, mirrors, upstream experiments, and imported projects remain visible on this account as part of the learning trail, but they are not presented as original engineering. The projects above are the work I want evaluated first.

<p align="center">
  <a href="https://github.com/nawnie/ai-embedded-systems">AI Embedded Systems</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/nawnie/ai-without-fear">AI Without Fear</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/nawnie/Rnv1">RNV1</a>
</p>
