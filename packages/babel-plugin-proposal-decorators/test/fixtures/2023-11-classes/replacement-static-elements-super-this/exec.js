{
  "different super access in a static class property";

  const dummy = () => {}

  const createClassWithStaticX = (hint) => {
    return class {
      static accessor ["x" + hint] = hint + "Super" + ".x";
    }
  }

  class C extends createClassWithStaticX("C") { static accessor xC = "C.x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  class A extends createClassWithStaticX("A") {
    static accessor xA = "A.x";
    static *[Symbol.iterator]() {
      @dec
      class B extends createClassWithStaticX("B") {
        static accessor xB = "B.x";
        @(yield super.xA, expect(this.xA).toBe("A.x"), dummy)
        static [(yield this.xA, expect(super.xA).toBe("ASuper.x"), "value")] = [super.xC, this.xC];

        static *iter() {
          yield super.xB;
          yield this.xB;
          yield* C.value;
        }
      }
      yield* originalB.iter();
    }
  }
  expect([...A].join()).toBe("ASuper.x,A.x,BSuper.x,B.x,CSuper.x,C.x");
}

{
  "different super access in a static private method";

  const dummy = () => {}

  const createClassWithStaticX = (hint) => {
    return class {
      static accessor ["x" + hint] = hint + "Super" + ".x";
    }
  }

  class C extends createClassWithStaticX("C") { static accessor xC = "C.x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  class A extends createClassWithStaticX("A") {
    static accessor xA = "A.x";
    static *[Symbol.iterator]() {
      @dec
      class B extends createClassWithStaticX("B") {
        static accessor xB = "B.x";
        @(yield super.xA, yield this.xA, dummy)
        static *#method({ superX = super.xC, x = this.xC, [expect(super.xC).toBe("CSuper.x")]: _ } = {}) {
          expect(superX).toBe(super.xC);
          expect(x).toBe(this.xC);
          yield superX;
          yield x;
        };

        static *iter() {
          yield super.xB;
          yield this.xB;
          yield* C.#method();
        }
      }
      yield* originalB.iter();
    }
  }
  expect([...A].join()).toBe("ASuper.x,A.x,BSuper.x,B.x,CSuper.x,C.x");
}

{
  "different super access in a non-decorated static method";

  const createClassWithStaticX = (hint) => {
    return class {
      static accessor ["x" + hint] = hint + "Super" + ".x";
    }
  }

  class C extends createClassWithStaticX("C") { static accessor xC = "C.x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  class A extends createClassWithStaticX("A") {
    static accessor xA = "A.x";
    static *[Symbol.iterator]() {
      @dec
      class B extends createClassWithStaticX("B") {
        static accessor xB = "B.x";
        static *method({ superX = super.xB, x = this.xB, [expect(super.xC).toBe(undefined)]: _ } = {}) {
          expect(superX).toBe(super.xB);
          expect(x).toBe(this.xB);
          yield superX;
          yield x;
        };

        static *[(yield super.xA, yield this.xA, Symbol.iterator)]() {
          yield super.xB;
          yield this.xB;
          yield* originalB.method();
        }
      }
      yield* originalB;
    }
  }
  expect([...A].join()).toBe("ASuper.x,A.x,BSuper.x,B.x,BSuper.x,B.x");
}

{
  "different super access in a non-decorated static method with overwritten this binding";

  const createClassWithStaticX = (hint) => {
    return class {
      static accessor ["x" + hint] = hint + "Super" + ".x";
    }
  }

  class C extends createClassWithStaticX("C") { static accessor xC = "C.x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  class A extends createClassWithStaticX("A") {
    static accessor xA = "A.x";
    static *[Symbol.iterator]() {
      @dec
      class B extends createClassWithStaticX("B") {
        static accessor xB = "B.x";
        static *method({ superX = super.xB, x = this.xC, [expect(super.xC).toBe(undefined)]: _ } = {}) {
          expect(superX).toBe(super.xB);
          expect(x).toBe(this.xC);
          expect(this.xB).toBe(undefined);
          yield superX;
          yield x;
        };

        static *[(yield super.xA, yield this.xA, Symbol.iterator)]() {
          yield super.xB;
          yield this.xB;
          yield* originalB.method.call(B);
        }
      }
      yield* originalB;
    }
  }
  expect([...A].join()).toBe("ASuper.x,A.x,BSuper.x,B.x,BSuper.x,C.x");
}

{
  "different super access in a decorated static method";

  const dummy = () => {}

  const createClassWithStaticX = (hint) => {
    return class {
      static accessor ["x" + hint] = hint + "Super" + ".x";
    }
  }

  class C extends createClassWithStaticX("C") { static accessor xC = "C.x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  class A extends createClassWithStaticX("A") {
    static accessor xA = "A.x";
    static *[Symbol.iterator]() {
      @dec
      class B extends createClassWithStaticX("B") {
        static accessor xB = "B.x";
        @(yield super.xA, expect(this.xA).toBe("A.x"), dummy)
        static *method({ superX = super.xB, x = this.xB, [expect(super.xC).toBe(undefined)]: _ } = {}) {
          expect(superX).toBe(super.xB);
          expect(x).toBe(this.xB);
          yield superX;
          yield x;
        };

        static *[(yield this.xA, expect(super.xA).toBe("ASuper.x"), Symbol.iterator)]() {
          yield super.xB;
          yield this.xB;
          yield* originalB.method();
        }
      }
      yield* originalB;
    }
  }
  expect([...A].join()).toBe("ASuper.x,A.x,BSuper.x,B.x,BSuper.x,B.x");
}

{
  "different super access in a decorated static method with overwritten this binding";

  const dummy = () => {}

  const createClassWithStaticX = (hint) => {
    return class {
      static accessor ["x" + hint] = hint + "Super" + ".x";
    }
  }

  class C extends createClassWithStaticX("C") { static accessor xC = "C.x"; }

  const dec = (b) => {
    originalB = b;
    return C;
  }

  class A extends createClassWithStaticX("A") {
    static accessor xA = "A.x";
    static *[Symbol.iterator]() {
      @dec
      class B extends createClassWithStaticX("B") {
        static accessor xB = "B.x";
        @(yield super.xA, expect(this.xA).toBe("A.x"), dummy)
        static *method({ superX = super.xB, x = this.xC, [expect(super.xC).toBe(undefined)]: _ } = {}) {
          expect(superX).toBe(super.xB);
          expect(x).toBe(this.xC);
          expect(this.xB).toBe(undefined);
          yield superX;
          yield x;
        };

        static *[(yield this.xA, expect(super.xA).toBe("ASuper.x"), Symbol.iterator)]() {
          yield super.xB;
          yield this.xB;
          yield* originalB.method.call(B);
        }
      }
      yield* originalB;
    }
  }
  expect([...A].join()).toBe("ASuper.x,A.x,BSuper.x,B.x,BSuper.x,C.x");
}
