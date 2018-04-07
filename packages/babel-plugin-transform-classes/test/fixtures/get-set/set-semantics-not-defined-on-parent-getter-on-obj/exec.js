"use strict";
class Base {
}

class Obj extends Base {
  get test() { }

  set() {
    return super.test = 3;
  }
}

const obj = new Obj();
assert.equal(obj.set(), 3);
assert.equal(Base.prototype.test, undefined);
assert.equal(Obj.prototype.test, undefined);
assert.equal(obj.test, 3);
