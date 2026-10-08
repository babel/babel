"use strict";

const o = { v: 1, f() { return this.v; } };
const getO = () => o;

class A {
  field = getO().f~();
  static staticField = getO()?.f~();
  static fromBlock;
  static {
    A.fromBlock = getO().f~();
  }
}
expect(new A().field()).toBe(1);
expect(A.staticField()).toBe(1);
expect(A.fromBlock()).toBe(1);

function defaultParam(g = getO().f~(), h = getO()?.f~()) {
  return [g(), h()];
}
expect(defaultParam()).toEqual([1, 1]);

const arrow = () => getO().f~();
expect(arrow()()).toBe(1);
