// from https://github.com/tc39/test262/blob/9e03c403e73341658d8d485a673798ae61f6f94a/test/language/statements/class/decorator/syntax/class-valid/decorator-member-expr-private-identifier.js
class C {
  static #$() {}
  static #_() {}

  static {
    var D = @C.#$
    @C.#_ class {}
  }
};
