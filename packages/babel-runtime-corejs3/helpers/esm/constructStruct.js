import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import _Reflect$construct from "core-js-pure/features/reflect/construct.js";
import _Object$seal from "core-js-pure/features/object/seal.js";
import _Reflect$apply from "core-js-pure/features/reflect/apply.js";
import structRegistry from "./structRegistry.js";
function _constructStruct(e, r, o) {
  var f = structRegistry(),
    c = f.g();
  if (!c || c.d || c.k !== r) {
    var n = f.s.get(e);
    if (r !== e || !n) throw new TypeError("Struct constructors cannot be used with a different new.target");
    var a,
      h = n.c,
      l = [],
      p = [];
    for (a = 0; a < h.length; a++) {
      var s = _Object$getPrototypeOf(h[a].k);
      s !== h[a].h && (_pushInstanceProperty(l).call(l, h[a]), _pushInstanceProperty(p).call(p, s));
    }
    var g = _Object$create(e.prototype),
      u = [],
      i = [];
    for (a = 0; a < h.length; a++) -1 === _indexOfInstanceProperty(u).call(u, h[a].r) && (_pushInstanceProperty(u).call(u, h[a].r), _pushInstanceProperty(i).call(i, h[a].r.g()));
    var y = {
      i: g,
      k: e
    };
    for (a = 0; a < u.length; a++) u[a].x(y);
    try {
      for (a = 0; a < l.length; a++) _Object$setPrototypeOf(l[a].k, l[a].h);
      _Reflect$construct(e, [], e);
    } finally {
      for (a = 0; a < u.length; a++) u[a].x(i[a]);
      for (a = 0; a < l.length; a++) try {
        _Object$setPrototypeOf(l[a].k, p[a]);
      } catch (t) {}
    }
    for (a = 0; a < h.length; a++) h[a].b.add(g);
    for (_Object$seal(g), a = 0; a < h.length; a++) h[a].f && _Reflect$apply(h[a].f(g), g, h[a].fk || []);
    return n.i && _Reflect$apply(n.i(g), g, o), g;
  }
}
export { _constructStruct as default };