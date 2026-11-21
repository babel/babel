import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _WeakSet from "core-js-pure/features/weak-set/index.js";
import _concatInstanceProperty from "core-js-pure/features/instance/concat.js";
import _Map from "core-js-pure/features/map/index.js";
import _Array$isArray from "core-js-pure/features/array/is-array.js";
import _forEachInstanceProperty from "core-js-pure/features/instance/for-each.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _Object$seal from "core-js-pure/features/object/seal.js";
import structRegistry from "./structRegistry.js";
import wrapStructMethod from "./wrapStructMethod.js";
function _defineStruct(e, o, c, a, p, f) {
  var _context;
  var i = structRegistry(),
    n = _Object$getPrototypeOf(e),
    s = i.l(n),
    y = new _WeakSet(),
    u = {
      k: e,
      h: n,
      p: s,
      b: y,
      f: c,
      fk: f,
      i: a,
      c: [],
      r: i
    };
  u.c = s ? _concatInstanceProperty(_context = s.c).call(_context, [u]) : [u];
  for (var l = 0; l < u.c.length; l++) u.c[l].r.s.set(e, u);
  if (p) {
    var v = new _Map();
    for (l = 0; l < p.length; l++) {
      var O = p[l];
      _Array$isArray(O) ? v.set(O[0], !1) : v.set(O, !0);
    }
    _forEachInstanceProperty(v).call(v, function (t, o) {
      if (t) {
        var c = _Object$getOwnPropertyDescriptor(e.prototype, o);
        c.value = wrapStructMethod(c.value, y, o), _Object$defineProperty(e.prototype, o, c);
      }
    });
  }
  o && _Object$seal(e.prototype);
}
export { _defineStruct as default };