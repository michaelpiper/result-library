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