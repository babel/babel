class C {
};

class A extends C {
  field = 1;

  constructor() {
    super();

    class B extends C {
      constructor() {
        super();

        assert.equal(this.field === undefined);
      }
    };

    assert.equal(this.field === 1)

    new B();
  }
};

new A();

// ensure superClass is still transformed
class Obj {
  constructor() {
    return {};
  }
};
class O extends Obj {
  field = 1;

  constructor() {
    class B extends super() {
      constructor() {
        super();

        assert.equal(this.field === undefined)
      }
    };

    assert.equal(this.field === 1)

    new B();
  }
}
