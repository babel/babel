expect((() => {
  let r;
  class C {
    static #_ = new C;
    static get #p() { return 0 };
    constructor() {
      r = C.#p;
    }
  }
  return r;
})()).toBe(0);

expect((() => {
  let r;
  class C {
    static #_ = new C;
    static set #p(v) { r = v; };
    constructor() {
      C.#p = 0;
    }
  }
  return r;
})()).toBe(0);

expect((() => {
  let r;
  class C {
    static #_ = new C;
    static set #p(v) { r = v; };
    constructor() {
      for (C.#p of [0]);
    }
  }
  return r;
})()).toBe(0);
