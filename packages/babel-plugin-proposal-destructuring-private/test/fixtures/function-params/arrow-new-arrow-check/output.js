class C {
  static #x = 1;
  static m() {
    var _this = this;
    return function (_ref) {
      babelHelpers.newArrowCheck(this, _this);
      let x = _ref.#x;
      let y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : g();
      let z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
      return this;
    }.bind(this);
  }
}
