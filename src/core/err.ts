import { Result } from "../result";

export class Err<E, A = unknown> extends Result<A, E> {
  constructor(error: E) {
    super();
    this._ok = false;
    this._error = error;
  }
}
