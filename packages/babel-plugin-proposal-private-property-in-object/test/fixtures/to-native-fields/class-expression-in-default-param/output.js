(x = (() => {
  var _brandCheck;

  return _brandCheck = new WeakSet(), class {
    #foo = void _brandCheck.add(this);

    test(other) {
      return _brandCheck.has(other);
    }

  };
})()) => {};
