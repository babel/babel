var _A_brand = /*#__PURE__*/new WeakSet();
class A {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _A_brand);
  }
  m() {
    [babelHelpers.toSetter(babelHelpers.classPrivateSetter, [_A_brand, _set_setter, this])._] = [1];
    [(this, babelHelpers.readOnlyError("#getter"))._] = [1];
  }
}
function _set_setter(_this, v) {}
function _get_getter(_this2) {}
