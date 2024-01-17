var _C;
let a, x, b;
class C {}
_C = C;
var _x = {
  writable: true,
  value: void 0
};
(() => {
  var _m;
  ({
    a = 1
  } = _C), _m = babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _x), x = _m === void 0 ? 2 : _m, ({
    b = 3
  } = _C);
})();
