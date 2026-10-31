import _Reflect$get from "core-js-pure/features/reflect/get.js";
import _Reflect$getOwnPropertyDescriptor from "core-js-pure/features/reflect/get-own-property-descriptor.js";
import _Reflect$has from "core-js-pure/features/reflect/has.js";
import _Reflect$ownKeys from "core-js-pure/features/reflect/own-keys.js";
function _importDeferProxy(e) {
  var t;
  function r() {
    return !1;
  }
  function n(r) {
    return function (n, o, f) {
      return r(t || (t = e()), o, f);
    };
  }
  return new Proxy({
    __proto__: null
  }, {
    defineProperty: r,
    deleteProperty: r,
    get: n(_Reflect$get),
    getOwnPropertyDescriptor: n(_Reflect$getOwnPropertyDescriptor),
    isExtensible: r,
    has: n(_Reflect$has),
    ownKeys: n(_Reflect$ownKeys),
    preventExtensions: function preventExtensions() {
      return !0;
    },
    set: r,
    setPrototypeOf: r
  });
}
export { _importDeferProxy as default };