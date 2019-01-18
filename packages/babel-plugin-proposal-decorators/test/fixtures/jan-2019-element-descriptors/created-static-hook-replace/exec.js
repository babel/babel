function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

function f() {}

@pushElement({
  kind: "hook",
  placement: "static",
  replace() {
    return f;
  }
})
class A {}

expect(A).toBe(f);
expect(A).not.toHaveProperty("undefined");
