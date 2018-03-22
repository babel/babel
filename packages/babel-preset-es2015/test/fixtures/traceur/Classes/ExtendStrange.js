class C extends null {}

var c = new C;
expect(c instanceof C).toBe(true);
expect(c instanceof Object).toBe(false);

// Closure testing framework tries to toString the object and fails.
expect(Object.getPrototypeOf(c)).toBe(C.prototype);
expect(Object.getPrototypeOf(Object.getPrototypeOf(c))).toBeNull();

expect(c.toString).toBe(undefined);

class D extends null {
  constructor(...args) {
    super(...args);
  }
}

// super() does not depend on the [HomeObject]. It just calls the [Prototype]
// of the function.
new D();

class E extends function() { return null }() {
  constructor(...args) {
    super(...args);
  }
}

// super() does not depend on the [HomeObject]. It just calls the [Prototype]
// of the function.
new E();

function f() {};
f.prototype = null;

class F extends f {
  get x() {
    return 1;
  }
}

expect(1).toBe(new F().x);


function g() {}
function h() {}
g.prototype = h;
class G extends g {
  get x() {
    return 2;
  }
}

expect(2).toBe(new G().x);
