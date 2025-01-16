import { Err } from "./core/err";
import { Ok } from "./core/ok";
import { IResultBuilder } from "./interface";

export const ResultBuilder: IResultBuilder = <A = unknown, E = unknown>() => ({
  Ok(result: A) {
    return new Ok<A, E>(result);
  },
  Err(err: E) {
    return new Err<E, A>(err);
  },
});

ResultBuilder._Ok = Ok;
ResultBuilder._Err = Err;

Object.freeze(ResultBuilder);