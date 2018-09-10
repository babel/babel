"use strict";
class Base {
}

let value = 2;
class Obj extends Base {
  set test(v) {
    value = v;
  }

  set() {
    return super.test = 3;
  }
}

const obj = new Obj();
expect(obj.set()).toBe(3);
expect(Base.prototype.test).toBeUndefined();
expect(Obj.prototype.test).toBeUndefined();

// This is incorrect according to the spec,
// but close enough for loose.
expect(value).toBe(3);

expect(obj.test).toBe(undefined);
