export interface IResult<A, E> {
  is_ok(): boolean;

  is_err(): boolean;
  ok(): A;
  err(): E;
  unwrap(): A;

  unwrap_err(): E;
}

export interface IResultBuilder {
  <A = unknown, E = unknown>(): {
    Ok(result: A): IResult<A, E>;
    Err(err: E): IResult<A, E>;
  };
  _Ok: new <A = unknown, E = unknown>(result: A) => IResult<A, E>;
  _Err: new <E, A = unknown>(error: E) => IResult<A, E>;
}
