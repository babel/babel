var x = '0';
var y;
var object = {
  [x]: 0,
  [1]: 1,
  [2]() {
    return 2;
  },
  get [3]() {
    return 3;
  },
  set [4](v) {
    y = v;
  },
  *[5]() {
    yield 5;
  }
};

expect(object[0]).toBe(0);
expect(object[1]).toBe(1);
expect(object[2]()).toBe(2);
object[4] = 4;
expect(y).toBe(4);
var g = object[5]();
expect(g.next()).toEqual({value: 5, done: false});
expect(g.next()).toEqual({value: undefined, done: true});

var object2 = {
  __proto__: object,
  [6]: 6
};

expect(object2[6]).toBe(6);
expect(object2[0]).toBe(0);
