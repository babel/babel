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
        assert.equal(this.field, undefined);
      }

    }

    assert.equal(this.field, 1);
    new B();
  }

}

new A();

class Obj {
  constructor() {
    return {};
  }

} // ensure superClass is still transformed


class SuperClass extends Obj {
  constructor() {
    var _temp;

    class B extends ((_temp = super(), Object.defineProperty(this, "field", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 1
    }), _temp), Obj) {
      constructor() {
        super();
        assert.equal(this.field, undefined);
      }

    }

    assert.equal(this.field, 1);
    new B();
  }

}

new SuperClass(); // ensure ComputedKey Method is still transformed

class ComputedMethod extends Obj {
  constructor() {
    var _temp2;

    class B extends Obj {
      constructor() {
        super();
        assert.equal(this.field, undefined);
      }

      [(_temp2 = super(), Object.defineProperty(this, "field", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: 1
      }), _temp2)]() {}

    }

    assert.equal(this.field, 1);
    new B();
  }

}

new ComputedMethod(); // ensure ComputedKey Field is still transformed

class ComputedField extends Obj {
  constructor() {
    var _temp3;

    var _ref = (_temp3 = super(), Object.defineProperty(this, "field", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: 1
    }), _temp3);

    class B extends Obj {
      constructor() {
        super();
        Object.defineProperty(this, _ref, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: 1
        });
        assert.equal(this.field, undefined);
      }

    }

    assert.equal(this.field, 1);
    new B();
  }

}

new ComputedField();
