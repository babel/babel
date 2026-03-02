expect(() => {
  class C {
    static #_ = new C;
    static #p;
    constructor() {
      C.#p;
    }
  }
}).toThrow(/attempted to use private field on non-instance/);

expect(() => {
  class C {
    static #_ = new C;
    static #p;
    constructor() {
      C.#p = 0;
    }
  }
}).toThrow(/attempted to use private field on non-instance/);

expect(() => {
  class C {
    static #_ = new C;
    static #p;
    constructor() {
      for (C.#p of [0]);
    }
  }
}).toThrow(/attempted to use private field on non-instance/);
