let _initClass, _computedKey, _init_computedKey, _init_extra_computedKey, _computedKey2, _init_computedKey2, _init_extra_computedKey2;
let dec1, dec2, dec3;
let _A;
class A {
  static {
    ({
      e: [_init_computedKey, _init_extra_computedKey, _init_computedKey2, _init_extra_computedKey2],
      c: [_A, _initClass]
    } = babelHelpers.applyDecs2311(this, [dec1], [[dec2, 0, Symbol.iterator], [dec3, 0, _computedKey2]]));
  }
  constructor() {
    _init_extra_computedKey2(this);
  }
  [_computedKey = notSymbol()] = 1;
  [Symbol.iterator] = _init_computedKey(this, 2);
  [Symbol.for("foo")] = (_init_extra_computedKey(this), 3);
  [_computedKey2 = babelHelpers.toPropertyKey(notSymbolAgain())] = _init_computedKey2(this, 4);
  static {
    _initClass();
  }
}
