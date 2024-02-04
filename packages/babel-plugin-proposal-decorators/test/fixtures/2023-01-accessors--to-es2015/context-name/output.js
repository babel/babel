var _initStatic, _init_a, _init_a2, _get_a, _set_a, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _computedKey, _init_computedKey7, _Foo;
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
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      get: _get_a2,
      set: _set_a2
    });
  }
  static get a() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _A);
  }
  static set a(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _A, v);
  }
  static get "b"() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _C);
  }
  static set "b"(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _C, v);
  }
  static get ["c"]() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _D);
  }
  static set ["c"](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _D, v);
  }
  static get 0() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _E);
  }
  static set 0(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _E, v);
  }
  static get [1]() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _F);
  }
  static set [1](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _F, v);
  }
  static get 2n() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _G);
  }
  static set 2n(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _G, v);
  }
  static get [3n]() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _H);
  }
  static set [3n](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _H, v);
  }
  static get [_computedKey]() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _I);
  }
  static set [_computedKey](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _I, v);
  }
}
_Foo = Foo;
function _set_a2(v) {
  _set_a(this, v);
}
function _get_a2() {
  return _get_a(this);
}
(() => {
  [_init_a, _init_a2, _get_a, _set_a, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7, _initStatic] = babelHelpers.applyDecs2301(_Foo, [[dec, 6, "a"], [dec, 6, "a", o => babelHelpers.classStaticPrivateFieldSpecGet(o, _Foo, _B), (o, v) => babelHelpers.classStaticPrivateFieldSpecSet(o, _Foo, _B, v)], [dec, 6, "b"], [dec, 6, "c"], [dec, 6, 0], [dec, 6, 1], [dec, 6, 2n], [dec, 6, 3n], [dec, 6, _computedKey]], []).e;
  _initStatic(_Foo);
})();
var _A = {
  writable: true,
  value: _init_a(_Foo)
};
var _B = {
  writable: true,
  value: _init_a2(_Foo)
};
var _C = {
  writable: true,
  value: _init_computedKey(_Foo)
};
var _D = {
  writable: true,
  value: _init_computedKey2(_Foo)
};
var _E = {
  writable: true,
  value: _init_computedKey3(_Foo)
};
var _F = {
  writable: true,
  value: _init_computedKey4(_Foo)
};
var _G = {
  writable: true,
  value: _init_computedKey5(_Foo)
};
var _H = {
  writable: true,
  value: _init_computedKey6(_Foo)
};
var _I = {
  writable: true,
  value: _init_computedKey7(_Foo)
};
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
