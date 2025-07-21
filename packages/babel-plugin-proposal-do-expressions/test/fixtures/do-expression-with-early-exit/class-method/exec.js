class C {
  constructor({ ...x }, readonly y) {
    const z = do {
      if (Object.keys(x).length > 0 && y) {
        return (this.result = 'xy');
      }
      else if (Object.keys(x).length > 0) {
        return (this.result = 'x');
      }
      else if (y) {
        return (this.result = 'y');
      }
    };
  }
}

expect(new C({ a: 1 }, 2).result).toBe('xy');
expect(new C({ a: 1 }, undefined).result).toBe('x');
expect(new C({}, 2).result).toBe('y');
expect(new C({}, undefined).result).toBe(undefined);
