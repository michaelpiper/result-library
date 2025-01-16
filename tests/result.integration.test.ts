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

describe("Integration test for fetchData function", () => {
  test("should handle success case with Ok result", () => {
    // Simulate a successful operation
    const successResult = fetchData(true);

    // Ensure result is Ok
    expect(successResult.is_ok()).toBe(true);

    // Verify the success value
    expect(successResult.unwrap()).toBe("Data retrieved successfully");

    // Ensure unwrap_err() throws an error for Ok result
    expect(() => successResult.unwrap_err()).toThrow(
      "Called unwrap_err() on an Ok value",
    );
  });

  test("should handle failure case with Err result", () => {
    // Simulate a failed operation
    const errorResult = fetchData(false);

    // Ensure result is Err
    expect(errorResult.is_err()).toBe(true);

    // Verify the error message
    expect(errorResult.unwrap_err()).toBe("Failed to retrieve data");

    // Ensure unwrap() throws an error for Err result
    expect(() => errorResult.unwrap()).toThrow(
      "Called unwrap() on an Err value",
    );
  });
});
