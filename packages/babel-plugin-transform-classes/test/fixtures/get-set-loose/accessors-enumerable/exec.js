class C {
  get a() {}
  set a(v) {}
  static get b() {}
  m() {}
}

// The spec requires them to not be enumerable
expect(Object.getOwnPropertyDescriptor(C.prototype, "a").enumerable).toBe(true);
expect(Object.getOwnPropertyDescriptor(C, "b").enumerable).toBe(true);
expect(Object.getOwnPropertyDescriptor(C.prototype, "m").enumerable).toBe(true);
