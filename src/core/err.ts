import { Result } from "../result";

export class Err<E = never, A = never> extends Result<A, E> {
  constructor(error: E) {
    super();
    this._ok = false;
    this._error = error;
  }
}
