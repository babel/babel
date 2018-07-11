"use strict";
class Base {
}
Base.prototype.test = 1;

class Obj extends Base {
  get() {
    return super.test;
  }
}
Obj.prototype.test = 2;

const obj = new Obj();
expect(obj.test).toBe(2);
expect(obj.get()).toBe(1);
