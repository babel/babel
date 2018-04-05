"use strict";

class C {}

class A extends C {
  constructor() {
    super();
    Object.defineProperty(this, "field", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 1
    });

    class B extends C {
      constructor() {
        super();
        assert.equal(this.field === undefined);
      }

    }

    ;
    assert.equal(this.field === 1);
    new B();
  }

}

new A(); // ensure superClass is still transformed

class Obj {
  constructor() {
    return {};
  }

}

class O extends Obj {
  constructor() {
    var _temp;

    class B extends (_temp = super(), Object.defineProperty(this, "field", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 1
    }), _temp) {
      constructor() {
        super();
        assert.equal(this.field === undefined);
      }

    }

    ;
    assert.equal(this.field === 1);
    new B();
  }

}
