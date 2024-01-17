function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _message = /*#__PURE__*/new WeakMap();
class _TypeError2 {
  constructor() {
    _classPrivateFieldInitSpec(this, _message, {
      writable: true,
      value: void 0
    });
  }
}
export { _TypeError2 as TypeError };
