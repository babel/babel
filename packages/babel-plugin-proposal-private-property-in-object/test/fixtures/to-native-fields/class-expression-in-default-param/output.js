(x = (() => {
  var _fooBrandCheck;
  return _fooBrandCheck = /*#__PURE__*/new WeakSet(), class {
    #foo = void _fooBrandCheck.add(this);
    test(other) {
      return _fooBrandCheck.has(babelHelpers.checkInRHS(other));
    }
  };
})()) => {};
