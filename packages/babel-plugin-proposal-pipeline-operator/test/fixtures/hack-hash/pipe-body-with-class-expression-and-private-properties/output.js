var _ref, _ref2, _ref3;

const result = (_ref3 = 1, (_ref2 = class {
  #baz;

  constructor() {
    this.#baz = _ref3;
  }

  #bar() {
    return this.#baz + 2;
  }

  foo() {
    return this.#bar() + 3;
  }

}, (_ref = new _ref2(), _ref.foo())));
expect(result).toBe(1 + 2 + 3);
