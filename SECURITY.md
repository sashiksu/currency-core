# Security policy

Thanks for helping keep `currency-core` and its users safe. This document explains how to report a vulnerability, which versions receive security fixes, and how we triage and disclose issues.

`currency-core` ships static currency data and pure-function lookups, with zero runtime dependencies. The attack surface is intentionally small, and any genuine vulnerability would be surprising — which also means we take reports seriously.

## Reporting a vulnerability

Please report suspected vulnerabilities **privately**.

- **Preferred:** open a GitHub private security advisory at <https://github.com/sashiksu/currency-core/security/advisories/new>.
- **Email fallback:** `sashiksu@gmail.com` with the subject prefix `[currency-core security]`. If you'd prefer encrypted disclosure, mention PGP in your first message — there is no published key yet, so request one and we'll exchange before you send details.

Please do **not** open a public GitHub issue, discussion, or pull request for security reports. Public disclosure before a fix is available puts users at risk.

### What to include

If possible, your report should describe:

- The affected version(s) and environment (Node.js version, package manager).
- A minimal reproduction or proof-of-concept.
- The impact you believe the issue has, and any suggested mitigation.

### Response targets

These are targets, not contractual commitments — we'll do our best to meet or beat them.

- **Acknowledgement:** within 7 days of receiving the report.
- **Triage update** (severity assessment and next steps): within 14 days.
- **Fix or mitigation timeline:** depends on severity and complexity; we'll communicate a working estimate during triage.

## Supported versions

| Version             | Status                                  |
| ------------------- | --------------------------------------- |
| `1.0.0-alpha.x`     | ✅ Supported during the v1.0 alpha cycle |
| `< 1.0.0-alpha.x`   | Not applicable (pre-publish, `release/1.0.0` branch only) |
| Older majors        | None yet                                |

Once `1.0.0` GA ships, this table will be updated to list the supported stable major(s) and the wind-down policy for the alpha line.

## Scope — what counts as a security vulnerability

The following are in scope:

- Anything that lets a caller cause unintended code execution, crash the host process under realistic input, or read/write memory or files outside `currency-core`'s public API. The package performs no I/O, so any such finding would be unexpected and is treated accordingly.
- A prototype-pollution vector reachable via untrusted lookup-key input.
- A regular expression that exhibits catastrophic backtracking on adversarial input. We do not currently apply regex to user-supplied input, but if a future feature does, ReDoS findings against it are in scope.
- A licensing or attribution issue that materially mis-represents the licensing of bundled data. We treat this as a high-priority correctness issue rather than a CVE-class vulnerability, but we want to know about it through this channel.

## Out of scope

The following are not security vulnerabilities and should be reported through normal issue channels:

- **Incorrect or stale currency data.** This is a data-correction bug. Please open a regular GitHub issue tagged `data`.
- **Bundle size regressions.** These are performance regressions, not vulnerabilities.
- **Vulnerabilities in transitive devDependencies** (test, build, or lint tools) that do not affect the published `dist/` output. We patch these on a reasonable best-effort basis.
- Findings that require the attacker to already have write access to the consumer's `node_modules/` directory or to the npm registry itself. These represent a compromised supply chain rather than a flaw in this package.

## Fix and disclosure process

1. **Triage and reproduce** the report privately.
2. **Develop the patch in a private branch** (a GitHub Security Advisory draft, where applicable). Fixes are backported to every supported version line.
3. **Coordinated disclosure.** We aim for a typical 30-day embargo from acknowledgement to public disclosure. Severe issues that require consumers to migrate or take action may warrant a longer embargo, agreed with the reporter.
4. **Release.** The fix ships as a patch version with a `### Security` entry in `CHANGELOG.md`.
5. **Publish the advisory.** A GitHub Security Advisory is published at the same time as the release, crediting the reporter unless they opt out.

Thank you for reporting responsibly.
