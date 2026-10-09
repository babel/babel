class obj {
  static #add = (x, y) => x + y;
  static test() {
    var _obj$add;
    const addOne = (_obj$add = obj.#add, function _add(_argPlaceholder) {
      return _obj$add.call(obj, 1, _argPlaceholder);
    });
  }
}
obj.test();
