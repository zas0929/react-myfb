import { sum, delay, getUniqueID, getFullApiUrl } from "./";

describe("instruments:", () => {
  test("sum should be a function", () => {
    expect(sum).toBeInstanceOf(Function);
  });

  test("Wright arguments, check when called with non-number second argument", () => {
    expect(() => sum(2, "привет")).toThrow();
  });

  test("Wright arguments, check when called with non-number first argument", () => {
    expect(() => sum("привет", 2)).toThrow();
  });

  test("sum should return regular sum", () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(1, 3)).toMatchSnapshot();
  });

  test("delay function should return a resolved promise", async () => {
    await expect(delay()).resolves.toBeUndefined();
  });

  test("getUniqueID should be a function", () => {
    expect(getUniqueID).toBeInstanceOf(Function);
  });

  test("getUniqueID should throw, when called non-number", () => {
    expect(() => getUniqueID("привет")).toThrow();
  });

  test("getUniqueID should produce a string with desired length", () => {
    expect(typeof getUniqueID()).toBe("string");
    expect(getUniqueID(5)).toHaveLength(5);
    expect(getUniqueID(10)).toHaveLength(10);
  });

  test("getFullApiUrl should have right arguments", () => {
    expect(() => getFullApiUrl(2, 3)).toThrow();
    expect(() => getFullApiUrl(2, "hello")).toThrow();
    expect(() => getFullApiUrl("hello", 3)).toThrow();
  });

  test("getFullApiUrl should return string of arguments", () => {
    expect(getFullApiUrl("hi", "there")).toBe("hi/there");
  });
});
