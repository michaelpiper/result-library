import { Result } from "../result";

export class Ok<A=never, E = never> extends Result<A, E> {
  constructor(artifact: A) {
    super();
    this._ok = true;
    this._artifact = artifact;
  }
}
