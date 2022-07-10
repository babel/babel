let x = 1;

class A {
  get [x]() {}
  [(x = 3, 2)]() {}
  set [x](_) {}
}

expect(Object.getOwnPropertyDescriptors(A.prototype)).toMatchObject({
  1: {
    get: expect.any(Function),
    set: undefined,
  },
  2: {
    value: expect.any(Function),
  },
  3: {
    get: undefined,
    set: expect.any(Function),
  }
});
