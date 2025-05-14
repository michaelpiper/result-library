import { Err } from "./core/err";
import { Ok } from "./core/ok";
import { IResultBuilder } from "./interface";

export const ResultBuilder: IResultBuilder = <A = never, E = never>() => ({
  Ok(result: A) {
    return new Ok<A, E>(result);
  },
  Err(err: E) {
    return new Err<E, A>(err);
  },
});

ResultBuilder._Ok = Ok;
ResultBuilder._Err = Err;
ResultBuilder.Ok = <A = never, E = never>(artifact: A) =>
  new Ok<A, E>(artifact);
ResultBuilder.Err = <E = never, A = never>(error: E) => new Err<E, A>(error);
Object.freeze(ResultBuilder);
