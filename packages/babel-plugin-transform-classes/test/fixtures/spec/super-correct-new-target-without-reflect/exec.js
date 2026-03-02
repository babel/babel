"use strict";

const oldReflect = global.Reflect;
try {
  global.Reflect = undefined;

  let NewTarget;

  class A {
    constructor() { NewTarget = new.target; }
  }
  class B extends A {}

  new A();
  expect(NewTarget).toBe(A);

  new B();
  expect(NewTarget).toBe(B);
} finally {
  global.Reflect = oldReflect;
}

