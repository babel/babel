function _foo(bar) {}

export { _foo as foo };
var bar = {
  foo: function foo() {
    _foo;
  }
};
