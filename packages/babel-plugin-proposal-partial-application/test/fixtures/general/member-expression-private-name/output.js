class obj {
  static #add = (x, y) => x + y;
  static test() {
    var _obj$add, _obj;
    const addOne = (_obj = obj, _obj$add = _obj.#add, function _add(_argPlaceholder) {
      return _obj$add.call(_obj, 1, _argPlaceholder);
    });
  }
}
obj.test();
