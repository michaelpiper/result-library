## 1.1.1 - 2025-11-05

### Changed
- Consolidated core classes: `Result`, `Ok`, and `Err` now live in `src/core/result.ts`.
- `src/core/ok.ts` and `src/core/err.ts` re-export `Ok`/`Err` from `result.ts` to preserve existing import paths.

### Internal
- Removed lazy `require()` workaround; mapping helpers construct `Ok`/`Err` directly within the unified `result.ts`.
- No API surface changes; tests and build remain green.

## 1.1.0 - 2025-11-05

### Added
- Functional helpers on `Result`:
  - `unwrapErr()` (camelCase alias for `unwrap_err()`)
  - `when<R>({ ok, err })`
  - `fold<R>({ ok, err })`
  - `map<RT>(mapper)`
  - `mapErr<RE>(mapper)`
  - `mapOr<RT>(mapper, defaultValue)`
  - `mapOrElse<RT>(mapper, errMapper)`
  - `mapOrErr<RE>(mapper, defaultValue)`
  - `mapErrOr<RT>(mapper, defaultValue)`
  - `mapErrOrElse<T>(mapper, defaultValue)`
  - `unwrapOr(defaultValue)`
  - `unwrapOrElse(defaultValue)`

### Internal
- Avoid circular import by lazily requiring `Ok`/`Err` in `map` and `mapErr` implementations.
- All unit and integration tests pass; build produces type declarations.