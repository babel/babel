// ensure we test the helper implementation,
// not built-in Reflect.get to which it defers
delete Reflect;

class Target {
  get typeOf() {
    return this === null ? "null" : typeof this;
  }
};

// check that the 1st argument (target) *is not* used
// in place of present but undefined 3rd argument (receiver)
expect(HELPER_GET(new Target, "typeOf", undefined)).toBe("undefined");

// because the helper replaces itself upon invocation,
// check it again with nullish arguments
expect(HELPER_GET(new Target, "typeOf", undefined)).toBe("undefined");
expect(HELPER_GET(new Target, "typeOf", null)).toBe("null");

// check other falsy types
expect(HELPER_GET(new Target, "typeOf", false)).toBe("boolean");
expect(HELPER_GET(new Target, "typeOf", 0)).toBe("number");
expect(HELPER_GET(new Target, "typeOf", "")).toBe("string");
