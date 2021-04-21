function fn() {
  var _privBrandCheck;

  return new (_privBrandCheck = new WeakSet(), class {
    static #priv = void _privBrandCheck.add(this);

    method(obj) {
      return _privBrandCheck.has(obj);
    }

  })();
}
