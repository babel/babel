var _init_a, _init_a2, _get_a, _set_a, _init_computedKey, _computedKey, _init_computedKey2, _init_computedKey3, _computedKey2, _init_computedKey4, _init_computedKey5, _computedKey3, _init_computedKey6, _computedKey4, _init_computedKey7, _initStatic, _class;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
};
const f = () => {
  logs.push("computing f");
  return {
    [Symbol.toPrimitive]: () => "f()"
  };
};
_computedKey = "c";
_computedKey2 = 1;
_computedKey3 = 3n;
_computedKey4 = f();
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      get: _get_a2,
      set: _set_a2
    });
  }
  static get a() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _A);
  }
  static set a(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _A, v);
  }
  static get "b"() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _C);
  }
  static set "b"(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _C, v);
  }
  static get [_computedKey]() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _D);
  }
  static set [_computedKey](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _D, v);
  }
  static get 0() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _E);
  }
  static set 0(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _E, v);
  }
  static get [_computedKey2]() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _F);
  }
  static set [_computedKey2](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _F, v);
  }
  static get 2n() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _G);
  }
  static set 2n(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _G, v);
  }
  static get [_computedKey3]() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _H);
  }
  static set [_computedKey3](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _H, v);
  }
  static get [_computedKey4]() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _I);
  }
  static set [_computedKey4](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _I, v);
  }
}
_class = Foo;
function _set_a2(v) {
  _set_a(this, v);
}
function _get_a2() {
  return _get_a(this);
}
(() => {
  [_init_a, _init_a2, _get_a, _set_a, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7, _initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 9, "a"], [dec, 9, "a", o => babelHelpers.classStaticPrivateFieldSpecGet(o, _class, _B), (o, v) => babelHelpers.classStaticPrivateFieldSpecSet(o, _class, _B, v)], [dec, 9, "b"], [dec, 9, _computedKey], [dec, 9, 0], [dec, 9, _computedKey2], [dec, 9, 2n], [dec, 9, _computedKey3], [dec, 9, _computedKey4]], []).e;
  _initStatic(_class);
})();
var _A = {
  writable: true,
  value: _init_a(_class)
};
var _B = {
  writable: true,
  value: _init_a2(_class)
};
var _C = {
  writable: true,
  value: _init_computedKey(_class)
};
var _D = {
  writable: true,
  value: _init_computedKey2(_class)
};
var _E = {
  writable: true,
  value: _init_computedKey3(_class)
};
var _F = {
  writable: true,
  value: _init_computedKey4(_class)
};
var _G = {
  writable: true,
  value: _init_computedKey5(_class)
};
var _H = {
  writable: true,
  value: _init_computedKey6(_class)
};
var _I = {
  writable: true,
  value: _init_computedKey7(_class)
};
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
