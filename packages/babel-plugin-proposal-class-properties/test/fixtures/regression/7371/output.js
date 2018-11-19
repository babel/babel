"use strict";

class C {}

class A extends C {
  constructor() {
    super();
    babelHelpers.defineProperty(this, "field", 1);

    class B extends C {
      constructor() {
        super();
        expect(this.field).toBeUndefined();
      }

    }

    expect(this.field).toBe(1);
    new B();
  }

}

new A();

class Obj {
  constructor() {
    return {};
  }

}

// ensure superClass is still transformed
class SuperClass extends Obj {
  constructor() {
    var _temp;

    class B extends ((_temp = super(), babelHelpers.defineProperty(this, "field", 1), _temp), Obj) {
      constructor() {
        super();
        expect(this.field).toBeUndefined();
      }

    }

    expect(this.field).toBe(1);
    new B();
  }

}

new SuperClass();

// ensure ComputedKey Method is still transformed
class ComputedMethod extends Obj {
  constructor() {
    var _temp2;

    class B extends Obj {
      constructor() {
        super();
        expect(this.field).toBeUndefined();
      }

      [(_temp2 = super(), babelHelpers.defineProperty(this, "field", 1), _temp2)]() {}

    }

    expect(this.field).toBe(1);
    new B();
  }

}

new ComputedMethod();

// ensure ComputedKey Field is still transformed
class ComputedField extends Obj {
  constructor() {
    var _temp3;

    var _ref = (_temp3 = super(), babelHelpers.defineProperty(this, "field", 1), _temp3);

    class B extends Obj {
      constructor() {
        super();
        babelHelpers.defineProperty(this, _ref, 1);
        expect(this.field).toBeUndefined();
      }

    }

    expect(this.field).toBe(1);
    new B();
  }

}

new ComputedField();
