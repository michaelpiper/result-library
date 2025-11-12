import { Ok, Err } from "../src";

describe("Variant-specific mapping", () => {
  it("Ok.map returns Ok with mapped value", () => {
    const res = new Ok<number, string>(2).map((n) => n + 1);
    expect(res.isOk()).toBe(true);
    expect(res.ok()).toBe(3);
    expect(res).toBeInstanceOf(Ok);
  });

  it("Ok.mapErr returns Ok unchanged but with new error type", () => {
    const res = new Ok<number, string>(2).mapErr((e) => e.length);
    expect(res.isOk()).toBe(true);
    expect(res.ok()).toBe(2);
    expect(res).toBeInstanceOf(Ok);
  });

  it("Err.map returns Err unchanged but with new ok type", () => {
    const res = new Err<string, number>("boom").map((n) => n * 2);
    expect(res.isErr()).toBe(true);
    expect(res.err()).toBe("boom");
    expect(res).toBeInstanceOf(Err);
  });

  it("Err.mapErr returns Err with mapped error", () => {
    const res = new Err<string, number>("boom").mapErr((e) => e + "!");
    expect(res.isErr()).toBe(true);
    expect(res.err()).toBe("boom!");
    expect(res).toBeInstanceOf(Err);
  });

  it("Err.mapErr returns Err with mapped error", () => {
    const res = new Err<string, number>("boom").mapErr((e) => {
      void e;
      return 1;
    });
    expect(res.isErr()).toBe(true);
    expect(res.err()).toBe(1);
    expect(res).toBeInstanceOf(Err);
  });
});
