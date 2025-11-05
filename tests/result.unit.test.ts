import { Err, Ok, Result, ResultBuilder } from "../src"; // Adjust the path

describe("Result", () => {
  describe("Ok", () => {
    it("should create an Ok result and return true for is_ok", () => {
      const okResult = new Ok<number, string>(42);
      expect(okResult.is_ok()).toBe(true);
      expect(okResult.ok()).toBe(42);
      expect(okResult).toBeInstanceOf(Result); // Check if it is an instance of Result
      expect(okResult).toBeInstanceOf(Ok); // Check if it is an instance of Ok
    });

    it("should return false for is_err", () => {
      const okResult = new Ok<number, string>(42);
      expect(okResult.is_err()).toBe(false);
    });

    it("should return the correct artifact in ok()", () => {
      const okResult = new Ok<number, string>(42);
      expect(okResult.ok()).toBe(42);
    });
  });

  describe("Err", () => {
    it("should create an Err result and return false for is_ok", () => {
      const errResult = new Err<string, number>("Something went wrong");
      expect(errResult.is_ok()).toBe(false);
      expect(errResult.err()).toBe("Something went wrong");
      expect(errResult).toBeInstanceOf(Result); // Check if it is an instance of Result
      expect(errResult).toBeInstanceOf(Err); // Check if it is an instance of Err
    });

    it("should return true for is_err", () => {
      const errResult = new Err<string, number>("Something went wrong");
      expect(errResult.is_err()).toBe(true);
    });

    it("should return the correct error in err()", () => {
      const errResult = new Err<string, number>("Something went wrong");
      expect(errResult.err()).toBe("Something went wrong");
    });
  });

  describe("ResultBuilder", () => {
    it("should create Ok result using ResultBuilder", () => {
      const builder = ResultBuilder<number, string>();
      const result = builder.Ok(42);
      expect(result.is_ok()).toBe(true);
      expect(result.ok()).toBe(42);
      expect(result).toBeInstanceOf(Result); // Check if it is an instance of Result
      expect(result).toBeInstanceOf(Ok); // Check if it is an instance of Ok
    });

    it("should create Err result using ResultBuilder", () => {
      const builder = ResultBuilder<number, string>();
      const result = builder.Err("Something went wrong");
      expect(result.is_err()).toBe(true);
      expect(result.err()).toBe("Something went wrong");
      expect(result).toBeInstanceOf(Result); // Check if it is an instance of Result
      expect(result).toBeInstanceOf(Err); // Check if it is an instance of Err
    });
  });
});
