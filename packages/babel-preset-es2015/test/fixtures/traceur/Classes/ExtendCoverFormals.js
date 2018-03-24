class C {}

var x = 1;
var y = C;
class D extends (x, y) {

}

expect(new D() instanceof C).toBe(true);
expect(new D() instanceof D).toBe(true);
