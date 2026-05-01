# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Pre-1.0 alphas publish under the `next` npm dist-tag.

## [Unreleased]

### Added

### Changed

### Fixed

## [1.0.0-alpha.0] - 2026-05-01

### Added

- Repo scaffold: TypeScript source layout, Rollup-based dual ESM/CJS bundle, declaration bundling via `dts-bundle-generator`, tooling configs (ESLint flat config, Prettier, Jest, tsd, size-limit).
- `Currency` interface plus the `CurrencyCode`, `CurrencyType`, `CurrencyStatus` literal-union types. Strict 6-record union: `"USD" | "EUR" | "JPY" | "GBP" | "BTC" | "HRK"`.
- Six seed records covering active fiat (USD, EUR, JPY, GBP), one cryptocurrency (BTC), and one historical/withdrawn currency (HRK, successor EUR, withdrawn 2023-01-01).
- Lookup API: `getCurrency`, `getSymbol`, `getName`, `getDecimals` — dual-overload signatures so a typed `CurrencyCode` returns the bare value (throws on unknown), and an arbitrary `string` returns `T | undefined`.
- Safe variants: `safeGetCurrency`, `safeGetSymbol` — always return `undefined` for unknown codes; never throw.
- Runtime input normalization: every lookup `.toUpperCase()`s its argument to defend against `as CurrencyCode` casts and `JSON.parse` results.
- Test suite: 34 tests across `src/__tests__/lookup.test.ts` and `src/__tests__/data-integrity.test.ts`; 100% coverage on `src/`.
- Type tests via `tsd` in `src/__tests-d__/types.test-d.ts` covering the overload contract.
- Day-one documentation: README, this CHANGELOG, CONTRIBUTING, SECURITY, ATTRIBUTIONS, LICENSE-DATA, NOTICE, LICENSE.
- Source-citation header check via `npm run verify:headers`.

[Unreleased]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.0...HEAD
[1.0.0-alpha.0]: https://github.com/sashiksu/currency-core/releases/tag/v1.0.0-alpha.0
