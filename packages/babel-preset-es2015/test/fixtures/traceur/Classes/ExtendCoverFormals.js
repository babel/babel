class C {}

var x = 1;
var y = C;
class D extends (x, y) {

}

expect(new D()).toBeInstanceOf(C);
expect(new D()).toBeInstanceOf(D);
