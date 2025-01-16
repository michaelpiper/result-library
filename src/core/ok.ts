import { Result } from "../result";

export class Ok<A, E = unknown> extends Result<A, E> {
  constructor(artifact: A) {
    super();
    this._ok = true;
    this._artifact = artifact;
  }
}
