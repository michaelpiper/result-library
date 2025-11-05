export interface IResult<A = never, E = never> {
  is_ok(): boolean;
  is_err(): boolean;

  isOk(): boolean;
  isErr(): boolean;

  ok(): A;
  err(): E;
  unwrap(): A;

  unwrap_err(): E;
  unwrapErr(): E;

  when<R>(handlers: { ok: (artifact: A) => R; err: (error: E) => R }): R;

  fold<R>(handlers: {
    ok: (artifact: A) => R | Promise<R>;
    err: (error: E) => R | Promise<R>;
  }): Promise<R>;

  map<RT>(mapper: (artifact: A) => RT): IResult<RT, E>;
  mapErr<RE>(mapper: (error: E) => RE): IResult<A, RE>;

  mapOr<RT>(mapper: (artifact: A) => RT, defaultValue: RT): RT;
  mapOrElse<RT>(mapper: (artifact: A) => RT, errMapper: (error: E) => RT): RT;
  mapOrErr<RE>(mapper: (error: E) => RE, defaultValue: RE): RE;
  mapErrOr<RT>(mapper: (error: E) => RT, defaultValue: RT): RT;
  mapErrOrElse<T>(mapper: (error: E) => T, defaultValue: T): T;

  unwrapOr(defaultValue: A): A;
  unwrapOrElse(defaultValue: (error: E) => A): A;
}

export interface IResultBuilder {
  Ok: <A = never, E = never>(artifact: A) => IResult<A, E>;
  Err: <E = never, A = never>(error: E) => IResult<A, E>;
  <A = never, E = never>(): {
    Ok(result: A): IResult<A, E>;
    Err(err: E): IResult<A, E>;
  };
}
