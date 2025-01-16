import { ResultBuilder } from "..";

describe("Result Library Tests", () => {
  const { Ok, Err } = ResultBuilder();

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
});
