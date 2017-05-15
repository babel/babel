var concat = (() => {
  var _ref2 = babelHelpers.asyncToGenerator(function* (..._ref4) {
    let [..._ref3] = [..._ref4];
    let [..._ref] = [..._ref3];
    let [...arrs] = [..._ref];

    var x = arrs[0];
    var y = arrs[1];
  });

  return function concat() {
    return _ref2.apply(this, arguments);
  };
})();

var x = (() => {
  var _ref6 = babelHelpers.asyncToGenerator(function* (..._ref8) {
    let [..._ref7] = [..._ref8];
    let [..._ref5] = [..._ref7];
    let [...rest] = [..._ref5];

    if (noNeedToWork) return 0;
    return rest;
  });

  return function x() {
    return _ref6.apply(this, arguments);
  };
})();