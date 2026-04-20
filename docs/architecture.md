# SYNS MVP Architecture

SYNS MVP is intentionally small. The repository models the minimum believable path from fragmented events to protocol-level emergence.

## Core layers

1. `lib/syns/types.ts`
   Defines the protocol primitives: `SignalEvent`, `SynapticNode`, `EmergenceScenario`, and `EmergenceRun`.

2. `lib/syns/scenarios.ts`
   Provides deterministic synaptic nodes and signal sequences for demoable protocol stories.

3. `lib/syns/engine.ts`
   Simulates capture, weighting, node activation, convergence, and emergence verdicts.

4. `app/lab/page.tsx`
   Turns the engine into a visible interaction surface.

5. `app/api/*`
   Exposes public demo endpoints that can later be replaced or extended by live services.

## Current limits

- No live chain ingestion
- No persistent storage
- No autonomous agent orchestration
- No production-grade scoring model

The MVP exists to make the protocol thesis legible in code before those layers are introduced.
