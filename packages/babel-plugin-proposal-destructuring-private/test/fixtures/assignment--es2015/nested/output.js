var _class;
class C {}
_class = C;
var _y = {
  writable: true,
  value: "y"
};
var _z = {
  writable: true,
  value: "self"
};
var _x = {
  writable: true,
  value: void 0
};
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "self", _class);
var _self = {
  writable: true,
  value: _class
};
(() => {
  var _m, _m2, _m3, _m4, _m5;
  let cloned, b, y, yy, yy2;
  _m = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _x), _m2 = _m === void 0 ? babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _self) : _m, _m3 = _m2[babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _z)], ({
    b
  } = _m3), _m4 = babelHelpers.classStaticPrivateFieldSpecGet(_m3, _class, _x), y = _m4 === void 0 ? (_class.b = "bb", babelHelpers.classStaticPrivateFieldSpecGet(babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _self), _class, _y)) : _m4, _m5 = babelHelpers.classStaticPrivateFieldSpecGet(_m2, _class, _x), yy = _m5 === void 0 ? (delete _class.self, ({
    ...cloned
  } = _class), babelHelpers.classStaticPrivateFieldSpecSet(_class, _class, _y, "yy")) : _m5, yy2 = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _y);
})();
