import { makeStrongCache } from "../lib/config/caching";

describe("caching API", () => {
  it("should allow permacaching with .forever()", () => {
    let count = 0;

    const fn = makeStrongCache((arg, cache) => {
      cache.forever();
      return { arg, count: count++ };
    });

    expect(fn("one")).toEqual({ arg: "one", count: 0 });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", count: 1 });
    expect(fn("two")).toBe(fn("two"));

    expect(fn("one")).not.toEqual(fn("two"));
  });

  it("should allow disabling caching with .never()", () => {
    let count = 0;

    const fn = makeStrongCache((arg, cache) => {
      cache.never();
      return { arg, count: count++ };
    });

    expect(fn("one")).toEqual({ arg: "one", count: 0 });
    expect(fn("one")).toEqual({ arg: "one", count: 1 });
    expect(fn("one")).not.toEqual(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", count: 4 });
    expect(fn("two")).toEqual({ arg: "two", count: 5 });
    expect(fn("two")).not.toEqual(fn("two"));

    expect(fn("one")).not.toEqual(fn("two"));
  });

  it("should allow caching based on a value with .using(fn)", () => {
    let count = 0;
    let other = "default";

    const fn = makeStrongCache((arg, cache) => {
      const val = cache.using(() => other);

      return { arg, val, count: count++ };
    });

    expect(fn("one")).toEqual({ arg: "one", val: "default", count: 0 });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", val: "default", count: 1 });
    expect(fn("two")).toBe(fn("two"));

    other = "new";

    expect(fn("one")).toEqual({ arg: "one", val: "new", count: 2 });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", val: "new", count: 3 });
    expect(fn("two")).toBe(fn("two"));

    other = "default";

    expect(fn("one")).toEqual({ arg: "one", val: "default", count: 0 });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", val: "default", count: 1 });
    expect(fn("two")).toBe(fn("two"));

    other = "new";

    expect(fn("one")).toEqual({ arg: "one", val: "new", count: 2 });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", val: "new", count: 3 });
    expect(fn("two")).toBe(fn("two"));
  });

  it("should allow invalidation based on a value with .invalidate(fn)", () => {
    let count = 0;
    let other = "default";

    const fn = makeStrongCache((arg, cache) => {
      const val = cache.invalidate(() => other);

      return { arg, val, count: count++ };
    });

    expect(fn("one")).toEqual({ arg: "one", val: "default", count: 0 });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", val: "default", count: 1 });
    expect(fn("two")).toBe(fn("two"));

    other = "new";

    expect(fn("one")).toEqual({ arg: "one", val: "new", count: 2 });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", val: "new", count: 3 });
    expect(fn("two")).toBe(fn("two"));

    other = "default";

    expect(fn("one")).toEqual({ arg: "one", val: "default", count: 4 });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", val: "default", count: 5 });
    expect(fn("two")).toBe(fn("two"));

    other = "new";

    expect(fn("one")).toEqual({ arg: "one", val: "new", count: 6 });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", val: "new", count: 7 });
    expect(fn("two")).toBe(fn("two"));
  });

  it("should allow invalidation with .using and .invalidate", () => {
    let count = 0;
    let other = "default";
    let another = "another";

    const fn = makeStrongCache((arg, cache) => {
      const val = cache.using(() => other);
      const val2 = cache.invalidate(() => another);

      return { arg, val, val2, count: count++ };
    });

    expect(fn("one")).toEqual({
      arg: "one",
      val: "default",
      val2: "another",
      count: 0,
    });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({
      arg: "two",
      val: "default",
      val2: "another",
      count: 1,
    });
    expect(fn("two")).toBe(fn("two"));

    other = "new";

    expect(fn("one")).toEqual({
      arg: "one",
      val: "new",
      val2: "another",
      count: 2,
    });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({
      arg: "two",
      val: "new",
      val2: "another",
      count: 3,
    });
    expect(fn("two")).toBe(fn("two"));

    other = "default";

    expect(fn("one")).toEqual({
      arg: "one",
      val: "default",
      val2: "another",
      count: 4,
    });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({
      arg: "two",
      val: "default",
      val2: "another",
      count: 5,
    });
    expect(fn("two")).toBe(fn("two"));

    other = "new";

    expect(fn("one")).toEqual({
      arg: "one",
      val: "new",
      val2: "another",
      count: 6,
    });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({
      arg: "two",
      val: "new",
      val2: "another",
      count: 7,
    });
    expect(fn("two")).toBe(fn("two"));

    another = "second";

    expect(fn("one")).toEqual({
      arg: "one",
      val: "new",
      val2: "second",
      count: 8,
    });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({
      arg: "two",
      val: "new",
      val2: "second",
      count: 9,
    });
    expect(fn("two")).toBe(fn("two"));
  });

  it("should auto-permacache by default", () => {
    let count = 0;

    const fn = makeStrongCache(arg => ({ arg, count: count++ }));

    expect(fn("one")).toEqual({ arg: "one", count: 0 });
    expect(fn("one")).toBe(fn("one"));

    expect(fn("two")).toEqual({ arg: "two", count: 1 });
    expect(fn("two")).toBe(fn("two"));

    expect(fn("one")).not.toEqual(fn("two"));
  });

  it("should throw if you set permacaching and use .using", () => {
    const fn = makeStrongCache((arg, cache) => {
      cache.forever();

      cache.using(() => null);
    });

    expect(() => fn()).toThrow(/Caching has already been configured/);
  });

  it("should throw if you set permacaching and use .invalidate", () => {
    const fn = makeStrongCache((arg, cache) => {
      cache.forever();

      cache.invalidate(() => null);
    });

    expect(() => fn()).toThrow(/Caching has already been configured/);
  });

  it("should throw if you set permacaching and use .never", () => {
    const fn = makeStrongCache((arg, cache) => {
      cache.forever();

      cache.never();
    });

    expect(() => fn()).toThrow(/Caching has already been configured/);
  });

  it("should throw if you set no caching and use .using", () => {
    const fn = makeStrongCache((arg, cache) => {
      cache.never();

      cache.using(() => null);
    });

    expect(() => fn()).toThrow(/Caching has already been configured/);
  });

  it("should throw if you set no caching and use .invalidate", () => {
    const fn = makeStrongCache((arg, cache) => {
      cache.never();

      cache.invalidate(() => null);
    });

    expect(() => fn()).toThrow(/Caching has already been configured/);
  });

  it("should throw if you set no caching and use .never", () => {
    const fn = makeStrongCache((arg, cache) => {
      cache.never();

      cache.using(() => null);
    });

    expect(() => fn()).toThrow(/Caching has already been configured/);
  });

  it("should throw if you configure .forever after exiting", () => {
    const fn = makeStrongCache((arg, cache) => cache);

    expect(() => fn().forever()).toThrow(
      /Cannot change caching after evaluation/,
    );
  });

  it("should throw if you configure .never after exiting", () => {
    const fn = makeStrongCache((arg, cache) => cache);

    expect(() => fn().never()).toThrow(
      /Cannot change caching after evaluation/,
    );
  });

  it("should throw if you configure .using after exiting", () => {
    const fn = makeStrongCache((arg, cache) => cache);

    expect(() => fn().using(() => null)).toThrow(
      /Cannot change caching after evaluation/,
    );
  });

  it("should throw if you configure .invalidate after exiting", () => {
    const fn = makeStrongCache((arg, cache) => cache);

    expect(() => fn().invalidate(() => null)).toThrow(
      /Cannot change caching after evaluation/,
    );
  });

  describe("simple", () => {
    it("should allow permacaching with cache(true)", () => {
      let count = 0;

      const fn = makeStrongCache((arg, cache) => {
        cache = cache.simple();

        cache(true);
        return { arg, count: count++ };
      });

      expect(fn("one")).toEqual({ arg: "one", count: 0 });
      expect(fn("one")).toBe(fn("one"));

      expect(fn("two")).toEqual({ arg: "two", count: 1 });
      expect(fn("two")).toBe(fn("two"));

      expect(fn("one")).not.toEqual(fn("two"));
    });

    it("should allow disabling caching with cache(false)", () => {
      let count = 0;

      const fn = makeStrongCache((arg, cache) => {
        cache = cache.simple();

        cache(false);
        return { arg, count: count++ };
      });

      expect(fn("one")).toEqual({ arg: "one", count: 0 });
      expect(fn("one")).toEqual({ arg: "one", count: 1 });
      expect(fn("one")).not.toEqual(fn("one"));

      expect(fn("two")).toEqual({ arg: "two", count: 4 });
      expect(fn("two")).toEqual({ arg: "two", count: 5 });
      expect(fn("two")).not.toEqual(fn("two"));

      expect(fn("one")).not.toEqual(fn("two"));
    });

    it("should allow caching based on a value with cache(fn)", () => {
      let count = 0;
      let other = "default";

      const fn = makeStrongCache((arg, cache) => {
        cache = cache.simple();

        const val = cache(() => other);

        return { arg, val, count: count++ };
      });

      expect(fn("one")).toEqual({ arg: "one", val: "default", count: 0 });
      expect(fn("one")).toBe(fn("one"));

      expect(fn("two")).toEqual({ arg: "two", val: "default", count: 1 });
      expect(fn("two")).toBe(fn("two"));

      other = "new";

      expect(fn("one")).toEqual({ arg: "one", val: "new", count: 2 });
      expect(fn("one")).toBe(fn("one"));

      expect(fn("two")).toEqual({ arg: "two", val: "new", count: 3 });
      expect(fn("two")).toBe(fn("two"));

      other = "default";

      expect(fn("one")).toEqual({ arg: "one", val: "default", count: 0 });
      expect(fn("one")).toBe(fn("one"));

      expect(fn("two")).toEqual({ arg: "two", val: "default", count: 1 });
      expect(fn("two")).toBe(fn("two"));

      other = "new";

      expect(fn("one")).toEqual({ arg: "one", val: "new", count: 2 });
      expect(fn("one")).toBe(fn("one"));

      expect(fn("two")).toEqual({ arg: "two", val: "new", count: 3 });
      expect(fn("two")).toBe(fn("two"));
    });
  });
});
