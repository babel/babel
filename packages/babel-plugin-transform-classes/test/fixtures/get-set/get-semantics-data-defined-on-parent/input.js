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
assert.equal(obj.test, 2);
assert.equal(obj.get(), 1);
