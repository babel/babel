class A {
  v = 7;
  #f(x) {
    return [this.v, x];
  }
  static direct(o) {
    return o?.#f~(?);
  }
  static nested(o) {
    return o?.x.#f~(?);
  }
}
const a = new A();
expect(A.direct(a)(1)).toEqual([7, 1]);
expect(A.direct(null)).toBe(undefined);
expect(A.nested({ x: a })(2)).toEqual([7, 2]);
expect(A.nested(undefined)).toBe(undefined);
