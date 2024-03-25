let _init_foo, _init_extra_foo, _init_bar, _init_extra_bar;
function decorate() {
  return function (target, context) {};
}
class Test {
  static {
    [_init_foo, _init_extra_foo] = babelHelpers.applyDecs2311(this, [], [[decorate(), 1, "foo"]]).e;
  }
  #A = _init_foo(this, 42);
  get foo() {
    return this.#A;
  }
  set foo(v) {
    this.#A = v;
  }
  constructor() {
    _init_extra_foo(this);
    console.log('hello');
  }
}
new Test();
class TestChild extends Test {
  static {
    [_init_bar, _init_extra_bar] = babelHelpers.applyDecs2311(this, [], [[decorate(), 1, "bar"]], 0, void 0, Test).e;
  }
  #A = _init_bar(this, 1);
  get bar() {
    return this.#A;
  }
  set bar(v) {
    this.#A = v;
  }
  constructor() {
    super(), _init_extra_bar(this);
  }
}
const r = new TestChild();
