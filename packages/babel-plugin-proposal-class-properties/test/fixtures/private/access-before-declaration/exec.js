expect(() => {
  class C {
    static #_ = new C;
    static #p;
    constructor() {
      C.#p;
    }
  }
}).toThrow(/attempted to get private static field before its declaration/);

expect(() => {
  class C {
    static #_ = new C;
    static #p;
    constructor() {
      C.#p = 0;
    }
  }
}).toThrow(/attempted to set private static field before its declaration/);

expect(() => {
  class C {
    static #_ = new C;
    static #p;
    constructor() {
      for (C.#p of [0]);
    }
  }
}).toThrow(/attempted to set private static field before its declaration/);
