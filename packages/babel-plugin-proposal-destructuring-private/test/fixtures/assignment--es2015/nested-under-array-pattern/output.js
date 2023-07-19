var _class;
class C {}
_class = C;
function _self() {
  return _class;
}
var _x = {
  writable: true,
  value: "x"
};
var _y = {
  writable: true,
  value: []
};
var _z = {
  writable: true,
  value: void 0
};
babelHelpers.defineProperty(C, "self", _class);
(() => {
  var _p, _p2, _p3, _p4, _m;
  let x, y, z;
  [_p, _p2,, _p3] = [_class, _class], x = babelHelpers.classStaticPrivateFieldSpecGet(_p === void 0 ? _class.self : _p, _class, _x), [, _p4] = babelHelpers.classStaticPrivateFieldSpecGet(_p2, _class, _y), _m = babelHelpers.classStaticPrivateFieldSpecGet(_p4 === void 0 ? _class.self : _p4, _class, _z), y = _m === void 0 ? babelHelpers.classStaticPrivateMethodGet(_class, _class, _self).call(_class) : _m, z = _p3 === void 0 ? babelHelpers.classStaticPrivateFieldSpecGet(y, _class, _y) : _p3;
})();
