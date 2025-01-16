import { IResult } from "./interface";
export class Result<A, E> implements IResult<A, E> {
  protected _ok!: boolean;
  protected _artifact!: A;
  protected _error!: E;

  is_ok() {
    return this._ok === true;
  }
  is_err() {
    return this.is_ok() === false;
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
}
