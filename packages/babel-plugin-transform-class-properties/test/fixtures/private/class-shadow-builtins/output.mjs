function _classPrivateFieldInitSpec(t, i, a) { _checkPrivateRedeclaration(t, i), i.set(t, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
var _message = /*#__PURE__*/new WeakMap();
class _TypeError2 {
  constructor() {
    _classPrivateFieldInitSpec(this, _message, void 0);
  }
}
export { _TypeError2 as TypeError };
