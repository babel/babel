(x = (() => {
  var _fooBrandCheck;

  return _fooBrandCheck = new WeakSet(), class {
    #foo = void _fooBrandCheck.add(this);

    test(other) {
      return _fooBrandCheck.has(other);
    }

  };
})()) => {};
