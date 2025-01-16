import { ResultBuilder } from "../src";

// Deconstruct ResultBuilder and create Ok, Err builder instance
const { Ok, Err } = ResultBuilder<string, string>();

// Simulate a function that can either succeed or fail
function fetchData(success: boolean) {
  if (success) {
    return Ok("Data retrieved successfully");
  } else {
    return Err("Failed to retrieve data");
  }
}

describe("fetchData function tests", () => {
  test("should return Ok result on success", () => {
    const successResult = fetchData(true);

    // Check if the result is Ok
    expect(successResult.is_ok()).toBe(true);
    expect(successResult.ok()).toBe("Data retrieved successfully");
  });

  test("should return Err result on failure", () => {
    const errorResult = fetchData(false);

    // Check if the result is Err
    expect(errorResult.is_err()).toBe(true);
    expect(errorResult.err()).toBe("Failed to retrieve data");
  });

  test("should correctly unwrap Ok result", () => {
    const successResult = fetchData(true);

    // Unwrap the Ok result
    expect(successResult.unwrap()).toBe("Data retrieved successfully");
  });

  test("should throw error when unwrapping Err result", () => {
    const errorResult = fetchData(false);

    // Expect an error when unwrapping Err
    expect(() => errorResult.unwrap()).toThrow(
      "Called unwrap() on an Err value",
    );
  });

  test("should correctly unwrap_err on Err result", () => {
    const errorResult = fetchData(false);

    // Unwrap the Err result
    expect(errorResult.unwrap_err()).toBe("Failed to retrieve data");
  });

  test("should throw error when unwrapping_err on Ok result", () => {
    const successResult = fetchData(true);

    // Expect an error when unwrapping_err on Ok
    expect(() => successResult.unwrap_err()).toThrow(
      "Called unwrap_err() on an Ok value",
    );
  });
});
