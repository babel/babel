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
    return _A._;
  }
  static set a(v) {
    _A._ = v;
  }
  static get "b"() {
    return _C._;
  }
  static set "b"(v) {
    _C._ = v;
  }
  static get ["c"]() {
    return _D._;
  }
  static set ["c"](v) {
    _D._ = v;
  }
  static get 0() {
    return _E._;
  }
  static set 0(v) {
    _E._ = v;
  }
  static get [1]() {
    return _F._;
  }
  static set [1](v) {
    _F._ = v;
  }
  static get 2n() {
    return _G._;
  }
  static set 2n(v) {
    _G._ = v;
  }
  static get [3n]() {
    return _H._;
  }
  static set [3n](v) {
    _H._ = v;
  }
  static get [_computedKey]() {
    return _I._;
  }
  static set [_computedKey](v) {
    _I._ = v;
  }
}
_Foo = Foo;
(() => {
  [_init_a, _init_a2, _get_a, _set_a, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7, _initStatic] = babelHelpers.applyDecs2305(_Foo, [[dec, 9, "a"], [dec, 9, "a", o => babelHelpers.assertClassBrand(_Foo, o, _B)._, (o, v) => _B._ = babelHelpers.assertClassBrand(_Foo, o, v)], [dec, 9, "b"], [dec, 9, "c"], [dec, 9, 0], [dec, 9, 1], [dec, 9, 2n], [dec, 9, 3n], [dec, 9, _computedKey]], []).e;
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
