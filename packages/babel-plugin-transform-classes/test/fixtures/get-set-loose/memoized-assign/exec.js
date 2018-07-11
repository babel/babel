"use strict";
class Base {}
Object.defineProperty(Base.prototype, 0, {
  value: 0,
  writable: true,
  configurable: true,
});
Object.defineProperty(Base.prototype, 1, {
  value: 1,
  writable: true,
  configurable: true,
});

let i = 0;
const proper = {
  get prop() {
    return i++;
  },
};

class Obj extends Base {
  assign() {
    super[proper.prop] += 1;
  }

  assign2() {
    super[i] += 1;
  }
}

const obj = new Obj();

obj.assign();
expect(i).toBe(1);
expect(obj[0]).toBe(1);
expect(obj[1]).toBe(1);

obj.assign2();
expect(i).toBe(1);
expect(obj[0]).toBe(1);
expect(obj[1]).toBe(2);
