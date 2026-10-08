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

// Temporary variables are not shared by the partial applications
const objs = [0, 1, 2].map(v => ({ v, f() { return this.v; } }));
const fromReceiver = [];
const fromOptionalChain = [];
const fromOptionalCall = [];
for (let i = 0; i < 3; i++) {
  fromReceiver.push(objs[i].f~());
  fromOptionalChain.push(objs[i]?.f~());
  fromOptionalCall.push(objs[i].f?.~());
}
expect(fromReceiver.map(fn => fn())).toEqual([0, 1, 2]);
expect(fromOptionalChain.map(fn => fn())).toEqual([0, 1, 2]);
expect(fromOptionalCall.map(fn => fn())).toEqual([0, 1, 2]);
