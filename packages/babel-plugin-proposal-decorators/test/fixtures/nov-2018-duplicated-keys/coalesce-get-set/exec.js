var el, el1;

@(_ => el = _)
class A {
  @(_ => el1 = _)
  get foo() { return 1; }

  set foo(x) { return 2; }
}

expect(el.elements).toHaveLength(1);

expect(el1).toEqual(expect.objectContaining({
  descriptor: expect.objectContaining({
    get: expect.any(Function),
    set: expect.any(Function)
  })
}));

var desc = Object.getOwnPropertyDescriptor(A.prototype, "foo");
expect(desc.get()).toBe(1);
expect(desc.set()).toBe(2);
