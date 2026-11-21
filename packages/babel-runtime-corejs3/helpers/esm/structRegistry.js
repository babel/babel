import _typeof from "./typeof.js";
import _Symbol$for from "core-js-pure/features/symbol/for.js";
import _globalThis from "core-js-pure/features/global-this.js";
import _self from "core-js-pure/features/self.js";
import _WeakMap from "core-js-pure/features/weak-map/index.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _Object$freeze from "core-js-pure/features/object/freeze.js";
function _structRegistry() {
  if ({}.hasOwnProperty.call(_structRegistry, "r")) return _structRegistry.r;
  var t = _Symbol$for("babel.structs@1"),
    e = "object" == (typeof _globalThis === "undefined" ? "undefined" : _typeof(_globalThis)) ? _globalThis : "object" == (typeof _self === "undefined" ? "undefined" : _typeof(_self)) ? _self : "object" == (typeof global === "undefined" ? "undefined" : _typeof(global)) ? global : void 0,
    r = e && e[t];
  if (!r) {
    var o,
      base = function base() {
        var t = o;
        if (!t || t.d) throw new TypeError("Illegal constructor");
        return t.d = !0, o = void 0, t.i;
      },
      baseNull = function baseNull() {
        return base();
      };
    base.prototype = Object.prototype, baseNull.prototype = null;
    var n = new _WeakMap();
    r = {
      s: n,
      g: function g() {
        return o;
      },
      x: function x(t) {
        o = t;
      },
      o: base,
      n: baseNull,
      l: function l(e) {
        var o,
          c = n.get(e);
        if (c) return c;
        for (var a = e; "function" == typeof a && !/^\s*function\b[^{]*\{\s*\[native code\]\s*\}\s*$/.test(function () {}.toString.call(a)); a = _Object$getPrototypeOf(a)) {
          var i = _Object$getOwnPropertyDescriptor(a, t);
          i && "value" in i && !i.writable && !i.configurable && (o = i.value);
        }
        if (o !== r) try {
          return _WeakMap.prototype.get.call(_Object$getOwnPropertyDescriptor(o, "s").value, e);
        } catch (t) {}
      },
      w: new _WeakMap()
    }, _Object$defineProperty(base, t, {
      value: r
    }), _Object$defineProperty(baseNull, t, {
      value: r
    }), _Object$freeze(base), _Object$freeze(baseNull);
    try {
      _Object$defineProperty(e, t, {
        value: r
      });
    } catch (t) {}
  }
  var getRegistry = function getRegistry() {
    return r;
  };
  return getRegistry.r = r, _structRegistry = getRegistry, r;
}
export { _structRegistry as default };