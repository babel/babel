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

assert.equal(object[0], 0);
assert.equal(object[1], 1);
assert.equal(object[2](), 2);
object[4] = 4;
assert.equal(y, 4);
var g = object[5]();
assert.deepEqual(g.next(), {value: 5, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});

var object2 = {
  __proto__: object,
  [6]: 6
};

assert.equal(object2[6], 6);
assert.equal(object2[0], 0);
