class C {}

var x = 1;
var y = C;
class D extends (x, y) {

}

assert.instanceOf(new D(), C);
assert.instanceOf(new D(), D);
