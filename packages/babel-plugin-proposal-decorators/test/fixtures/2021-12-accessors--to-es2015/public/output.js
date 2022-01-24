var _init_a, _init_b, _computedKey, _init_computedKey, _dec, _dec2, _dec3, _initProto;

_dec = dec
_dec2 = dec
_computedKey = 'c'
_dec3 = dec

var _A = /*#__PURE__*/new WeakMap();

var _B = /*#__PURE__*/new WeakMap();

var _C = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _A, {
      writable: true,
      value: (_initProto(this), _init_a(this))
    });
    babelHelpers.classPrivateFieldInitSpec(this, _B, {
      writable: true,
      value: _init_b(this, 123)
    });
    babelHelpers.classPrivateFieldInitSpec(this, _C, {
      writable: true,
      value: _init_computedKey(this, 456)
    });
  }

  get a() {
    return babelHelpers.classPrivateFieldGet(this, _A);
  }

  set a(v) {
    babelHelpers.classPrivateFieldSet(this, _A, v);
  }

  get b() {
    return babelHelpers.classPrivateFieldGet(this, _B);
  }

  set b(v) {
    babelHelpers.classPrivateFieldSet(this, _B, v);
  }

  get [_computedKey]() {
    return babelHelpers.classPrivateFieldGet(this, _C);
  }

  set [_computedKey](v) {
    babelHelpers.classPrivateFieldSet(this, _C, v);
  }

}

(() => {
  [_init_a, _init_b, _init_computedKey, _initProto] = babelHelpers.applyDecs(Foo, [[_dec, 1, "a"], [_dec2, 1, "b"], [_dec3, 1, _computedKey]], []);
})();
