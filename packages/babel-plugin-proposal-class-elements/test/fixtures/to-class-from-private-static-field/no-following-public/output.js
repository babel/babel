var _priv = babelHelpers.temporalUndefined,
    _foo = babelHelpers.temporalUndefined,
    _bar = babelHelpers.temporalUndefined;

class A {}

babelHelpers.defineProperty(A, "pub", 3);
_priv = 0;
babelHelpers.defineProperty(A, "pub2", 2);
_foo = void 0;
_bar = 1;
