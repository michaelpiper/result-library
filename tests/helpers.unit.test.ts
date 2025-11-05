import { Ok, Err } from "../src";

describe("Result helpers", () => {
  describe("andThen", () => {
    it("chains on Ok and returns mapped Ok", () => {
      const res = new Ok<number, string>(2).andThen(
        (n) => new Ok<number, string>(n * 10),
      );
      expect(res.isOk()).toBe(true);
      expect(res.ok()).toBe(20);
    });

    it("short-circuits on Err and keeps Err", () => {
      const res = new Err<string, number>("boom").andThen(
        (n) => new Ok<number, string>(n * 10),
      );
      expect(res.isErr()).toBe(true);
      expect(res.err()).toBe("boom");
    });
  });

  describe("orElse", () => {
    it("passes through Ok without calling handler", () => {
      const res = new Ok<number, string>(5).orElse(
        () => new Ok<number, string>(-1),
      );
      expect(res.isOk()).toBe(true);
      expect(res.ok()).toBe(5);
    });

    it("maps Err using handler", () => {
      const res = new Err<string, number>("oops").orElse(
        (e) => new Err<number, number>(e.length),
      );
      expect(res.isErr()).toBe(true);
      expect(res.err()).toBe(4);
    });
  });

  describe("expect / expectErr", () => {
    it("expect returns value for Ok", () => {
      const res = new Ok<number, string>(7);
      expect(res.expect("not used")).toBe(7);
    });

    it("expect throws on Err", () => {
      const res = new Err<string, number>("bad");
      expect(() => res.expect("Expected Ok")).toThrowError("Expected Ok");
    });

    it("expectErr returns error for Err", () => {
      const res = new Err<string, number>("bad");
      expect(res.expectErr("not used")).toBe("bad");
    });

    it("expectErr throws on Ok", () => {
      const res = new Ok<number, string>(7);
      expect(() => res.expectErr("Expected Err")).toThrowError("Expected Err");
    });
  });

  describe("tap / tapErr", () => {
    it("tap executes side-effect on Ok", () => {
      let seen: number | undefined;
      const res = new Ok<number, string>(3).tap((n) => {
        seen = n;
      });
      expect(seen).toBe(3);
      expect(res.isOk()).toBe(true);
      expect(res.ok()).toBe(3);
    });

    it("tapErr executes side-effect on Err", () => {
      let seen: string | undefined;
      const res = new Err<string, number>("err").tapErr((e) => {
        seen = e;
      });
      expect(seen).toBe("err");
      expect(res.isErr()).toBe(true);
      expect(res.err()).toBe("err");
    });
  });
});
