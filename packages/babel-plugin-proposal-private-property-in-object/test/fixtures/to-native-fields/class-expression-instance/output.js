function fn() {
  var _brandCheck;

  return new (_brandCheck = new WeakSet(), class {
    #priv = void _brandCheck.add(this);

    method(obj) {
      return _brandCheck.has(obj);
    }

  })();
}
