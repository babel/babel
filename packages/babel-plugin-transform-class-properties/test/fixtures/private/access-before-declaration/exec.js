expect(() => {
  class C {
    static #_ = new C;
    static #p;
    constructor() {
      C.#p;
    }
  }
}).toThrow(TypeError);

expect(() => {
  class C {
    static #_ = new C;
    static #p;
    constructor() {
      C.#p = 0;
    }
  }
}).toThrow(TypeError);

expect(() => {
  class C {
    static #_ = new C;
    static #p;
    constructor() {
      for (C.#p of [0]);
    }
  }
}).toThrow(TypeError);
