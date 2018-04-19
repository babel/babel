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
expect(object[0]()).toBe(0);
expect(object[1]).toBe(1);
object[2] = 2;
expect(y).toBe(2);
var g = object[3]();
expect(g.next()).toEqual({value: 3, done: false});
expect(g.next()).toEqual({value: undefined, done: true});


expect(C[4]()).toBe(4);
expect(C[5]).toBe(5);
C[6] = 6;
expect(y).toBe(6);
var g = C[7]();
expect(g.next()).toEqual({value: 7, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
