const _excluded = ["0"];
let result;

class C {}

var _x = {
  writable: true,
  value: void 0
};

(() => {
  var _m = [C],
      [..._p] = _m,
      _m2 = _p[0],
      _m3 = babelHelpers.classStaticPrivateFieldSpecGet(_m2, C, _x),
      x = _m3 === void 0 ? 1 : _m3,
      z = babelHelpers.objectWithoutProperties(_p, _excluded);

  result = {
    x,
    z
  };
})();
