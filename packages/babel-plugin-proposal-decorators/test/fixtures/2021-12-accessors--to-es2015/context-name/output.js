var _Foo;
let _initStatic, _init_a, _init_a2, _get_a, _set_a, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _computedKey, _init_computedKey7;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
};
const f = () => {
  logs.push("computing f");
  return {
    [Symbol.toPrimitive]: () => (logs.push("calling toPrimitive"), "f()")
  };
};
_computedKey = babelHelpers.toPropertyKey(f());
class Foo {
  static get a() {
    return babelHelpers.assertClassBrand(Foo, this, _A)._;
  }
  static set a(v) {
    _A._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
  static get "b"() {
    return babelHelpers.assertClassBrand(Foo, this, _C)._;
  }
  static set "b"(v) {
    _C._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
  static get ["c"]() {
    return babelHelpers.assertClassBrand(Foo, this, _D)._;
  }
  static set ["c"](v) {
    _D._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
  static get 0() {
    return babelHelpers.assertClassBrand(Foo, this, _E)._;
  }
  static set 0(v) {
    _E._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
  static get [1]() {
    return babelHelpers.assertClassBrand(Foo, this, _F)._;
  }
  static set [1](v) {
    _F._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
  static get 2n() {
    return babelHelpers.assertClassBrand(Foo, this, _G)._;
  }
  static set 2n(v) {
    _G._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
  static get [3n]() {
    return babelHelpers.assertClassBrand(Foo, this, _H)._;
  }
  static set [3n](v) {
    _H._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
  static get [_computedKey]() {
    return babelHelpers.assertClassBrand(Foo, this, _I)._;
  }
  static set [_computedKey](v) {
    _I._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
}
_Foo = Foo;
(() => {
  [_init_a, _init_a2, _get_a, _set_a, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7, _initStatic] = babelHelpers.applyDecs(_Foo, [[dec, 6, "a"], [dec, 6, "a", function () {
    return babelHelpers.assertClassBrand(_Foo, this, _B)._;
  }, function (value) {
    _B._ = babelHelpers.assertClassBrand(_Foo, this, value);
  }], [dec, 6, "b"], [dec, 6, "c"], [dec, 6, 0], [dec, 6, 1], [dec, 6, 2n], [dec, 6, 3n], [dec, 6, _computedKey]], []);
  _initStatic(_Foo);
})();
var _A = {
  _: _init_a(_Foo)
};
var _B = {
  _: _init_a2(_Foo)
};
var _C = {
  _: _init_computedKey(_Foo)
};
var _D = {
  _: _init_computedKey2(_Foo)
};
var _E = {
  _: _init_computedKey3(_Foo)
};
var _F = {
  _: _init_computedKey4(_Foo)
};
var _G = {
  _: _init_computedKey5(_Foo)
};
var _H = {
  _: _init_computedKey6(_Foo)
};
var _I = {
  _: _init_computedKey7(_Foo)
};
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
