var _setter = /*#__PURE__*/new WeakSet();
class A {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _setter);
  }
  m() {
    [babelHelpers.toSetter(babelHelpers.classPrivateSetter, null, this, _setter, _set_setter)._] = [1];
    [(this, babelHelpers.readOnlyError("#getter"))._] = [1];
  }
}
function _set_setter(v) {}
function _get_getter() {}
