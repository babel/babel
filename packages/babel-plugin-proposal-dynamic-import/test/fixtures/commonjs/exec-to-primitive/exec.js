return expect(import({
  [Symbol.toPrimitive](hint) {
    if (hint === "string") return "./foo.js";
    return null;
  }
})).resolves.toHaveProperty("default", "foo");
