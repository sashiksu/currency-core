# Contributing to currency-core

Thanks for taking the time to look at this. `currency-core` is in active early development on the long-lived `release/1.0.0` alpha branch and has not yet been published to npm. Issues, data corrections, and small focused PRs are all genuinely welcome.

## Local setup

```sh
git clone https://github.com/sashiksu/currency-core.git
cd currency-core
npm install
```

Requirements:

- Node.js >= 18.
- npm (whatever ships with your Node).

The package has zero runtime dependencies. Everything `npm install` pulls down is a `devDependency` for tests, types, lint, and the bundler.

## Verify your checkout

Before pushing a branch or opening a PR, the following should all pass cleanly:

| Command | What it does |
| --- | --- |
| `npm test` | Jest unit tests. Coverage on `src/` is expected to stay at 100%. |
| `npm run test:types` | tsd type-level assertions for every public export. |
| `npm run typecheck` | `tsc --noEmit` against the source tree. |
| `npm run lint` | ESLint flat config. |
| `npm run build` | Rollup build, emits the bundled ESM and CJS outputs plus a single `dist/index.d.ts`. |
| `npm run size` | Gzipped bundle-size budget: 5 KB ESM, 6 KB CJS. |
| `npm run verify:headers` | Confirms every file under `src/data/` starts with the source-citation header block. |

<details>
<summary>One-liner that runs everything before pushing</summary>

```sh
npm run lint && npm test && npm run test:types && npm run typecheck && npm run build && npm run size && npm run verify:headers
```

</details>

If a step fails, fix it locally rather than pushing and waiting on CI to tell you the same thing.

## Branching and PR conventions

- Branch names: `feature/<short-desc>` for new work, `bugfix/<short-desc>` for fixes. Keep the slug short and lowercase-with-hyphens.
- During the alpha cycle, PRs target `release/1.0.0`. After GA, PRs target `master`.
- Release tags are always prefixed with `v`: `v1.0.0`, `v1.0.0-alpha.3`. Never tag as bare `1.0.0`.
- Commit messages: 1-2 sentences, plain English, capitalized first letter, sentences separated by `". "` (period + space). No `feat:` / `fix:` / `chore:` prefixes. No AI co-author trailers.

Example of an acceptable commit message:

```
Add SRD (Suriname Dollar) to the fiat dataset. Source is the SIX list-one.xml entry dated 2026-04-12.
```

## Adding or correcting a data record

This is the most common kind of contribution and the easiest one to get right.

Data lives in three files:

- `src/data/fiat.ts` — ISO 4217 fiat currencies.
- `src/data/crypto.ts` — cryptocurrencies.
- `src/data/historical.ts` — withdrawn or historical currencies.

Every file in `src/data/` MUST start with the source-citation header block: the upstream URL, the date you fetched it, and a short license note. `npm run verify:headers` enforces this on every commit, so a missing or malformed header will fail the build.

When you add or change a record:

1. Cite the upstream source in the PR body. Link the SIX list-one.xml entry, the CLDR JSON file, the CoinGecko API URL, or whichever authoritative source you consulted.
2. If you change the literal union `CurrencyCode` in `src/types.ts` (adding or removing a code), the matching test in `src/__tests__/data-integrity.test.ts` will catch the mismatch. Update both together.
3. If you add a brand-new data file under `src/data/`, update the `byCode` map sourcing in `src/data/index.ts` so the new records are reachable.

## Adding new functionality

Lookup functions in `src/lookup.ts` follow a deliberate dual-overload pattern:

- When called with a typed `CurrencyCode`, they return the bare value and throw on an unknown code.
- When called with a plain `string`, they return `T | undefined`.

Mirror that pattern for any new lookup. If a non-throwing variant makes sense for callers who already know the code might be missing, expose a `safe*` companion alongside it.

Every public export needs:

- A tsd assertion in `src/__tests-d__/types.test-d.ts` covering both overloads.
- Runtime tests in `src/__tests__/`, with the 100% coverage bar in mind.
- An entry in `src/index.ts`. Anything not re-exported from `src/index.ts` is internal.

## What NOT to add

- **Runtime dependencies.** Zero deps is load-bearing for bundle size and for the tree-shake guarantees the package makes. If you think you need one, open an issue first to discuss alternatives.
- **Marketing copy or competitor comparisons in user-facing docs** (README, CHANGELOG, public guides). Lead with what the package does. Do not name or compare against other libraries.

## Reporting issues

- Bugs and feature requests: https://github.com/sashiksu/currency-core/issues
- Questions and design discussions: the GitHub Discussions tab on the same repo.

A reproducible snippet (or a failing test case) will get a fix faster than a prose description.

## Security disclosures

Please do not file public issues for security problems. See `SECURITY.md` for the private disclosure process.

## Maintainer release flow

Sashika handles releases, but it helps if contributors know what happens after a PR merges. The short version:

1. Bump `package.json` to the next `1.0.0-alpha.N`.
2. Add a `CHANGELOG.md` entry under `## [Unreleased]` as work lands, then move it under the new version section at release time.
3. Run `npm run release:next`. This runs lint, tests, and the build, then `npm publish --access public --tag next`.
4. Tag the merge commit on the integration branch as `v1.0.0-alpha.N` after the publish succeeds.

Until GA, every release goes out under the `next` dist-tag so installs stay opt-in.
