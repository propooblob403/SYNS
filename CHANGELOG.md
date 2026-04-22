# Changelog

All notable changes to this repository will be documented in this file.

The format is inspired by Keep a Changelog, and this project currently uses a simple manual versioning approach while the MVP is still moving quickly.

## [Unreleased]

### Changed

- Removed the legacy prediction-market scaffold so the public app surface only exposes the SYNS protocol MVP
- Simplified the root layout by removing the unused account session provider

### Added

- Deterministic engine tests for scenario summaries, partial runs, and full scenario outputs
- A dedicated typecheck runner that clears stale generated route types before validation

## [0.1.0] - 2026-04-19

### Added

- Initial GitHub-ready protocol MVP scaffold
- Next.js App Router structure for homepage, lab, docs, and public API surfaces
- Typed protocol primitives for signal events, synaptic nodes, impacts, snapshots, and emergence runs
- Deterministic scenario library for reproducible signal replay
- Simulation engine for capture scoring, adaptive weighting, convergence, and emergence
- Interactive emergence lab with autoplay, replay, manual stepping, and scenario switching
- Public API endpoints for nodes, scenarios, and simulation runs
- Protocol documentation for architecture, glossary, and demo limitations
- Expanded README with architecture, workflow, configuration, roadmap, and FAQ information
