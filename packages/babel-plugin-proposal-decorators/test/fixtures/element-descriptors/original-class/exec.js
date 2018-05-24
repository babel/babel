var el = null;

@(_ => el = _)
class A {}

expect(el).toEqual({
  [Symbol.toStringTag]: "Class Descriptor",
  kind: "class",
  elements: []
});

@(_ => el = _)
class B {
  foo = 2;
  static bar() {}
  get baz() {}
  set baz(x) {}
}

expect(el.elements).toHaveLength(3);
