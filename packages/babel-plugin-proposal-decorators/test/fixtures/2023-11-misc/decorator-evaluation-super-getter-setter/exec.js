function noop() {}

function BaseFactory(logs) {
  return class A {
    static get getter() {
      logs.push("getter")
    }
    static set setter(v) {
      logs.push("setter");
    }
  }
}

{
  const logs = [];
  class B extends BaseFactory(logs) {
    static m() {
      class C {
        @(super.setter = super.getter, noop) p;
      }
    }
  }

  B.m();
  expect(logs.join()).toBe("getter,setter");
}

{
  const logs = [];
  class B extends BaseFactory(logs) {
    static m() {
      class C {
        @(super.setter = super.getter, noop) #p;
      }
    }
  }

  B.m();
  expect(logs.join()).toBe("getter,setter");
}

{
  const logs = [];
  class B extends BaseFactory(logs) {
    static m() {
      class C {
        @(super.setter = super.getter, noop) accessor [(noop(), "p")];
      }
    }
  }

  B.m();
  expect(logs.join()).toBe("getter,setter");
}

{
  const logs = [];
  class B extends BaseFactory(logs) {
    static m() {
      @noop
      class C {
        @(super.setter = super.getter, noop) p;
      }
    }
  }

  B.m();
  expect(logs.join()).toBe("getter,setter");
}

{
  const logs = [];
  class B extends BaseFactory(logs) {
    static m() {
      @noop
      class C {
        @(super.setter = super.getter, noop) static p;
      }
    }
  }

  B.m();
  expect(logs.join()).toBe("getter,setter");
}

{
  const logs = [];
  class B extends BaseFactory(logs) {
    static m() {
      @noop
      class C {
        @(super.setter = super.getter, noop) #p;
      }
    }
  }

  B.m();
  expect(logs.join()).toBe("getter,setter");
}

{
  const logs = [];
  class B extends BaseFactory(logs) {
    static m() {
      @noop
      class C {
        @(super.setter = super.getter, noop) [(noop(), "p")];
      }
    }
  }

  B.m();
  expect(logs.join()).toBe("getter,setter");
}

{
  const logs = [];
  class B extends BaseFactory(logs) {
    static m() {
      @noop
      class C {
        @(super.setter = super.getter, noop) static [(noop(), "p")];
      }
    }
  }

  B.m();
  expect(logs.join()).toBe("getter,setter");
}

{
  const logs = [];
  class B extends BaseFactory(logs) {
    static m() {
      @noop
      class C {
        @(super.setter = super.getter, noop) accessor [(noop(), "p")];
      }
    }
  }

  B.m();
  expect(logs.join()).toBe("getter,setter");
}

{
  const logs = [];
  class B extends BaseFactory(logs) {
    static m() {
      @noop
      class C {
        @(super.setter = super.getter, noop) static accessor [(noop(), "p")];
      }
    }
  }

  B.m();
  expect(logs.join()).toBe("getter,setter");
}
