expect(() => {
  class C {
    static #_ = new C;
    static get #p() { return C };
    constructor() {
      C.#p;
    }
  }
}).toThrow(/attempted to use private field on non-instance/);

expect(() => {
  class C {
    static #_ = new C;
    static set #p(v) {};
    constructor() {
      C.#p = 0;
    }
  }
}).toThrow(/attempted to use private field on non-instance/);

expect(() => {
  class C {
    static #_ = new C;
    static set #p(v) {};
    constructor() {
      for (C.#p of [0]);
    }
  }
}).toThrow(/attempted to use private field on non-instance/);
