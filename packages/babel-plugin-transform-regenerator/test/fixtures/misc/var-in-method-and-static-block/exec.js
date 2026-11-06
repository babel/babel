var x = "outer x";
var y = "outer y";

function* g() {
  var o = {
    m() {
      var x = 1;
      return x;
    }
  };
  class A {
    static {
      var y = 2;
    }
  }
  expect(o.m()).toBe(1);
  yield [x, y];
}

expect(g().next().value).toEqual(["outer x", "outer y"]);
