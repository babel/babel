var x = '0';
var y;

class C {
  [x]() {
    return 0;
  }
  get [1]() {
    return 1;
  }
  set [2](v) {
    y = v;
  }
  *[3]() {
    yield 3;
  }

  static [4]() {
    return 4;
  }
  static get [5]() {
    return 5;
  }
  static set [6](v) {
    y = v;
  }
  static *[7]() {
    yield 7;
  }
}

var object = new C;
assert.equal(object[0](), 0);
assert.equal(object[1], 1);
object[2] = 2;
assert.equal(y, 2);
var g = object[3]();
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});


assert.equal(C[4](), 4);
assert.equal(C[5], 5);
C[6] = 6;
assert.equal(y, 6);
var g = C[7]();
assert.deepEqual(g.next(), {value: 7, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
