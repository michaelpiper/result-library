export interface IResult<A = never, E = never> {
  is_ok(): boolean;
  is_err(): boolean;
  ok(): A;
  err(): E;
  unwrap(): A;

  unwrap_err(): E;
}

export interface IResultBuilder {
  <A = never, E = never>(): {
    Ok(result: A): IResult<A, E>;
    Err(err: E): IResult<A, E>;
  };
  _Ok: new <A = never, E = never>(result: A) => IResult<A, E>;
  _Err: new <E, A = never>(error: E) => IResult<A, E>;
}
