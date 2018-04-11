"use strict";
class C {
}

class A extends C {
  field = 1;

  constructor() {
    super();

    class B extends C {
      constructor() {
        super();

        assert.equal(this.field, undefined);
      }
    }

    assert.equal(this.field, 1)

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
  field = 1;

  constructor() {
    class B extends (super(), Obj) {
      constructor() {
        super();

        assert.equal(this.field, undefined)
      }
    }

    assert.equal(this.field, 1)

    new B();
  }
}

new SuperClass();

// ensure ComputedKey Method is still transformed
class ComputedMethod extends Obj {
  field = 1;

  constructor() {
    class B extends Obj {
      constructor() {
        super();

        assert.equal(this.field, undefined)
      }

      [super()]() { }
    }

    assert.equal(this.field, 1)

    new B();
  }
}

new ComputedMethod();


// ensure ComputedKey Field is still transformed
class ComputedField extends Obj {
  field = 1;

  constructor() {
    class B extends Obj {
      constructor() {
        super();

        assert.equal(this.field, undefined)
      }

      [super()] = 1;
    }

    assert.equal(this.field, 1)

    new B();
  }
}

new ComputedField();
