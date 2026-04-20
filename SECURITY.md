# Security Policy

## Supported Scope

This repository is currently an MVP and demo-oriented codebase. Security review is still important, but the project should be treated as pre-production unless explicitly stated otherwise.

Current security focus areas:

- dependency hygiene
- environment variable handling
- protocol state integrity in simulation flows
- public API response boundaries
- future live ingestion and persistence surfaces

## Reporting a Vulnerability

If you discover a security issue, please do not disclose it publicly first.

Instead, report it privately to the project maintainers with:

- a clear description of the issue
- affected file paths or modules
- impact assessment
- reproduction steps
- suggested mitigation if available

## Response Expectations

Security reports should be triaged with the following goals:

1. confirm the issue
2. estimate severity and scope
3. isolate any unsafe behavior
4. prepare a patch or mitigation plan
5. disclose fixes responsibly after remediation

## Current MVP Security Limitations

The repository currently has known limitations typical of an MVP:

- no authenticated operator layer is present
- no live ingestion pipeline is implemented
- no persistent protocol memory is implemented
- no production scoring validation layer is implemented
- dependency upgrades still need to be hardened before public launch

## Safe Contribution Guidelines

Contributors should:

- avoid committing secrets or local environment files
- avoid expanding permissions without clear need
- review dependency changes carefully
- avoid implying production-grade security where it does not yet exist

## Sensitive Data

Never commit:

- `.env.local`
- private keys
- seed phrases
- access tokens
- deployment credentials
