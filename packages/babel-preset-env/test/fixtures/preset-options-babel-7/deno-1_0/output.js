"use strict";

var _selfBrandCheck = /*#__PURE__*/new WeakSet();
// These syntaxes should be transpiled:
// static {} / ??= / #self in / C?.#self
// The class declaration and the static private property should not be transpiled
class C {
  static #self = (_selfBrandCheck.add(this), C);
  static #_ = C.#self ?? (C.#self = _selfBrandCheck.has(babelHelpers.checkInRHS(C === null || C === void 0 ? void 0 : C.#self)));
}
