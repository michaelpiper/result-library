import { IResult } from "../interface";
export class Result<A = never, E = never> implements IResult<A, E> {
  protected _ok!: boolean;
  protected _artifact!: A;
  protected _error!: E;

  is_ok() {
    return this._ok === true;
  }
  is_err() {
    return this.is_ok() === false;
  }

  isOk() {
    return this.is_ok();
  }
  isErr() {
    return this.is_err();
  }
  ok() {
    return this._artifact;
  }

  unwrap() {
    if (this.is_err()) {
      throw new Error("Called unwrap() on an Err value");
    }
    return this.ok();
  }

  unwrap_err() {
    if (this.is_ok()) {
      throw new Error("Called unwrap_err() on an Ok value");
    }
    return this.err();
  }

  err() {
    return this._error;
  }

  unwrapErr() {
    if (this.is_ok()) {
      throw new Error("Called unwrap_err() on an Ok value");
    }
    return this.err();
  }

  when<R = A>(handlers: { ok: (artifact: A) => R; err: (error: E) => R }): R {
    return this.isOk()
      ? handlers.ok(this._artifact!)
      : handlers.err(this._error!);
  }

  async fold<R = A>(handlers: {
    ok: (artifact: A) => R | Promise<R>;
    err: (error: E) => R | Promise<R>;
  }): Promise<R> {
    return this.isOk()
      ? await handlers.ok(this._artifact!)
      : await handlers.err(this._error!);
  }

  map<RT = A>(mapper: (artifact: A) => RT): Result<RT, E> {
    const result = this.isOk()
      ? new Ok<RT, E>(mapper(this._artifact!))
      : new Err<E, RT>(this._error!);
    return result;
  }

  mapErr<RE = E>(mapper: (error: E) => RE): Result<A, RE> {
    return this.isOk()
      ? new Ok<A, RE>(this._artifact!)
      : new Err<RE, A>(mapper(this._error!));
  }

  mapOr<RT = A>(mapper: (artifact: A) => RT, defaultValue: RT): RT {
    return this.isOk() ? mapper(this._artifact!) : defaultValue;
  }

  mapOrElse<RT = A>(
    mapper: (artifact: A) => RT,
    errMapper: (error: E) => RT,
  ): RT {
    return this.isOk() ? mapper(this._artifact!) : errMapper(this._error!);
  }

  mapOrErr<RE = E>(mapper: (error: E) => RE, defaultValue: RE): RE {
    return this.isOk() ? defaultValue : mapper(this._error!);
  }

  mapErrOr<RT = A>(mapper: (error: E) => RT, defaultValue: RT): RT {
    return this.isOk() ? defaultValue : mapper(this._error!);
  }

  mapErrOrElse<T = A>(mapper: (error: E) => T, defaultValue: T): T {
    return this.isOk() ? defaultValue : mapper(this._error!);
  }

  unwrapOr(defaultValue: A): A {
    return this.isOk() ? this._artifact! : defaultValue;
  }

  unwrapOrElse(defaultValue: (error: E) => A): A {
    return this.isOk() ? this._artifact! : defaultValue(this._error!);
  }

  andThen<RT = A>(fn: (artifact: A) => Result<RT, E>): Result<RT, E> {
    return this.isOk() ? fn(this._artifact!) : new Err<E, RT>(this._error!);
  }

  orElse<RE = E>(fn: (error: E) => Result<A, RE>): Result<A, RE> {
    return this.isOk() ? new Ok<A, RE>(this._artifact!) : fn(this._error!);
  }

  expect(message: string): A {
    if (this.is_err()) {
      throw new Error(message);
    }
    return this._artifact!;
  }

  expectErr(message: string): E {
    if (this.is_ok()) {
      throw new Error(message);
    }
    return this._error!;
  }

  tap(fn: (artifact: A) => void): Result<A, E> {
    if (this.isOk()) {
      fn(this._artifact!);
    }
    return this;
  }

  tapErr(fn: (error: E) => void): Result<A, E> {
    if (this.isErr()) {
      fn(this._error!);
    }
    return this;
  }
}

export class Ok<A = never, E = never> extends Result<A, E> {
  constructor(artifact: A) {
    super();
    this._ok = true;
    this._artifact = artifact;
  }
}

export class Err<E = never, A = never> extends Result<A, E> {
  constructor(error: E) {
    super();
    this._ok = false;
    this._error = error;
  }
}
