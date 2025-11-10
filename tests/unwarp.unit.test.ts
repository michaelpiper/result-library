import { ResultBuilder, Ok as OkResult, Result } from "../src";

describe("Result Library Tests", () => {
  const { Ok, Err } = ResultBuilder<string, string>();

  test("unwrap() on Ok value", () => {
    const success = Ok("Success value");
    expect(success.unwrap()).toBe("Success value");
  });

  test("unwrap() on Err value should throw", () => {
    const failure = Err("Error value");
    expect(() => failure.unwrap()).toThrow("Called unwrap() on an Err value");
  });

  test("unwrap_err() on Err value", () => {
    const failure = Err("Error value");
    expect(failure.unwrap_err()).toBe("Error value");
  });

  test("unwrap_err() on Ok value should throw", () => {
    const success = Ok("Success value");
    expect(() => success.unwrap_err()).toThrow(
      "Called unwrap_err() on an Ok value",
    );
  });

  test("expect() on Ok value", () => {
    const success = Ok("Success value");
    expect(success.expect("Test message")).toBe("Success value");
  });

  test("expect() on Err value should throw", () => {
    const failure = Err("Error value");
    expect(() => failure.expect("Test message")).toThrow(
      "Test message: Error value",
    );
  });

  test("expectErr() on Err value", () => {
    const failure = Err("Error value");
    expect(failure.expectErr("Test message")).toBe("Error value");
  });

  test("expectErr() on Ok value should throw", () => {
    const success = Ok("Success value");
    expect(() => success.expectErr("Test message")).toThrow(
      "Test message: Success value",
    );
  });

  test("tap() on Ok value", () => {
    const success = Ok("Success value");
    const tapped = success.tap((value) => expect(value).toBe("Success value"));
    expect(tapped).toBe(success);
  });

  test("tapErr() on Err value", () => {
    const failure = Err("Error value");
    const tapped = failure.tapErr((error) => expect(error).toBe("Error value"));
    expect(tapped).toBe(failure);
  });

  test("test result build err vs err", () => {
    const err = Err("Error value");
    const err2 = ResultBuilder.Err("Error value");

    expect(err).toStrictEqual(err2);
  });

  test("test result build ok vs ok", () => {
    const ok = new OkResult("Success value");
    const ok2: Result<string, string> = ResultBuilder.Ok<string, string>(
      "Success value",
    );

    expect(ok).toStrictEqual(ok2);
    expect(ok.unwrap()).toBe("Success value");
    expect(ok2.unwrap()).toBe("Success value");
  });
});
