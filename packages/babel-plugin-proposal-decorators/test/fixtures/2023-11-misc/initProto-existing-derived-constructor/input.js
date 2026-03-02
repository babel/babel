{
  let self, a, initCalled;

  function deco(_, context) {
    context.addInitializer(() => {
      initCalled = true;
    });
  }

  class B {
    constructor(s) {
      a = s;
    }
  }

  class A extends B {
    constructor() {
      let a = 2;
      self = super(a);
    }

    @deco
    method() {}
  }

  let instance = new A();
  expect(self).toBe(instance);
  expect(a).toBe(2);
  expect(initCalled).toBe(true);
}

{
  const dec = (fn) => {
    return function () {
      return fn.call(this) + 100;
    };
  };

  class B {
    constructor(v) {
      this.a = v;
    }
    method() {
      return this.a;
    }
  }

  {
    ("super() nested within another constructor should not be transformed");
    let log = [];
    class A extends B {
      constructor() {
        log.push(super(3).method());
        new (class Dummy extends B {
          constructor() {
            log.push(super(4).method());
          }
        })();
      }

      @dec
      method() {
        return this.a;
      }
    }

    new A();

    expect(log + "").toBe("103,4");
  }

  {
    ("super() not in decorated derived constructor should not be transformed: computed key");
    let log = [];
    new (class Dummy extends B {
      constructor() {
        let key;
        class A extends B {
          constructor() {
            log.push(super(6).method());
          }

          @dec
          method() {
            return this.a;
          }

          [((key = super(5).method()), log.push(key), key)];
        }

        new A();
      }
    })();

    expect(log + "").toBe("5,106");
  }

  {
    ("super() in decorator expression within decorated derived constructor should be transformed: decorator expression");
    let log = [];
    const noop = () => (fn) => fn;
    new (class extends B {
      constructor() {
        class A extends B {
          constructor() {
            log.push(super(8).method());
          }

          @dec
          method() {
            return this.a;
          }

          @noop(log.push(super(7).method())) noop() {}
        }

        new A();
      }
    })();

    expect(log + "").toBe("7,108");
  }

  {
    ("super() within decorated derived constructor should be transformed: computed key");
    let log = [];
    class A extends B {
      constructor() {
        let key;
        new (class Dummy extends B {
          constructor() {
            log.push(super(10).method());
          }
          [((key = super(9).method()), log.push(key), key)];
        })();
      }

      @dec
      method() {
        return this.a;
      }
    }

    new A();

    expect(log + "").toBe("109,10");
  }

  {
    ("super() within decorated derived constructor should be transformed: decorator expression");
    let log = [];
    const noop = () => (fn) => fn;
    class A extends B {
      constructor() {
        new (class Dummy extends B {
          constructor() {
            log.push(super(12).method());
          }
          @noop(log.push(super(11).method())) noop() {}
        })();
      }

      @dec
      method() {
        return this.a;
      }
    }

    new A();

    expect(log + "").toBe("111,12");
  }
}
