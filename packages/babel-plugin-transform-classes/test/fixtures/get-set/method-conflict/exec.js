class A {
  get x() {}
  x() {}
  set x(_) {}
}

expect(Object.getOwnPropertyDescriptors(A.prototype)).toMatchObject({
  x: {
    get: undefined,
    set: expect.any(Function),
  }
});
