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

        expect(this.field).toBeUndefined();
      }
    }

    expect(this.field).toBe(1)

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

        expect(this.field).toBeUndefined()
      }
    }

    expect(this.field).toBe(1)

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

        expect(this.field).toBeUndefined()
      }

      [super()]() { }
    }

    expect(this.field).toBe(1)

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

        expect(this.field).toBeUndefined()
      }

      [super()] = 1;
    }

    expect(this.field).toBe(1)

    new B();
  }
}

new ComputedField();
