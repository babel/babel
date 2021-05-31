var el = null;

@(_ => el = _)
class A {}

expect(el).toEqual(Object.defineProperty({
  kind: "class",
  elements: []
}, Symbol.toStringTag, { value: "Descriptor" }));

@(_ => el = _)
class B {
  foo = 2;
  static bar() {}
  get baz() {}
  set baz(x) {}
}

expect(el.elements).toHaveLength(3);
