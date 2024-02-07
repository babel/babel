var _method = /*#__PURE__*/new WeakSet();
class A {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _method);
    babelHelpers.classPrivateMethodGet(this, _method, _method2).call(this);
    babelHelpers.classPrivateGetter(this, _method, _get_getter);
    babelHelpers.classPrivateSetter(this, _method, _set_setter, 1);
    babelHelpers.classPrivateGetter(this, _method, _get_getset);
    babelHelpers.classPrivateSetter(this, _method, _set_getset, 2);
  }
}
function _method2() {}
function _get_getter() {}
function _set_setter(v) {}
function _get_getset() {}
function _set_getset(v) {}
