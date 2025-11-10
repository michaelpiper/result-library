import type { Result } from "../core/result";
import { ResultBuilder } from "../result-builder";

export type IResult<A = never, E = never> = Result<A, E>;

export type IResultBuilder<A=never, E=never> = typeof ResultBuilder<A, E>;