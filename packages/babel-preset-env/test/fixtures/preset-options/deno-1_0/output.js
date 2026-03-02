"use strict";

var _staticBlock;
var _selfBrandCheck = /*#__PURE__*/new WeakSet();
// These syntaxes should be transpiled:
// static {} / ??= / #self in / C?.#self
// The class declaration and the static private property should not be transpiled
class C {
  static #self = (_staticBlock = () => C.#self ?? (C.#self = _selfBrandCheck.has(babelHelpers.checkInRHS(C?.#self))), _selfBrandCheck.add(this), C);
}
_staticBlock();
