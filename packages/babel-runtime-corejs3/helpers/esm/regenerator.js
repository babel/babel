import _Symbol from "core-js-pure/features/symbol/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import regeneratorDefine from "./regeneratorDefine.js";
import regeneratorDefineIM from "./regeneratorDefineIM.js";
import regeneratorValues from "./regeneratorValues.js";
function _regenerator() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = "function" == typeof _Symbol ? _Symbol : {},
    i = o.iterator || "@@iterator",
    a = o.toStringTag || "@@toStringTag",
    u = ["next", "throw", "return"];
  function c(r, n, o, i) {
    var a = n && n.prototype instanceof Generator ? n : Generator,
      c = _Object$create(a.prototype);
    return regeneratorDefine(c, "_invoke", function (r, n, o) {
      var i,
        a,
        c,
        p = 0,
        s = o || [],
        y = !1,
        d = {
          prev: 0,
          next: 0,
          sent: e,
          abrupt: l,
          finish: _bindInstanceProperty(l).call(l, e, 4),
          delegateYield: function delegateYield(t, r) {
            return i = regeneratorValues(t), a = 0, c = e, d.next = r, f;
          }
        };
      function l(t, r) {
        a = t, c = r;
        for (var n = s.length - 1; !y && p && n >= 0; --n) {
          var o,
            i = s[n],
            u = d.prev,
            l = i[2];
          if (t > 3 ? (o = l === r) && (a = i[4] || 3, c = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= u && ((o = t < 2 && u < i[1]) ? (a = 0, d.sent = r, d.next = i[1]) : u < l && (o = t < 3 || i[0] > r || r > l) && (i[4] = t, i[5] = r, d.next = l, a = 0)), o) break;
        }
        if (o || t > 1) return f;
        throw y = !0, r;
      }
      return function (o, s, G) {
        if (2 === p) throw Error("Generator is already running");
        for (y && 1 === s && l(s, G), a = s, c = G; !y || (t = e);) {
          i || (a ? a < 3 ? (a > 1 && (d.next = -1), l(a, c)) : d.next = c : d.sent = c);
          try {
            if (i) {
              if (t = i[u[a]]) {
                if (t = t.call(i, c)) {
                  if (!t) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  c = t.value, a < 2 && (a = 0);
                }
              } else 1 === a && (t = i[u[2]]) && t.call(i), a < 2 && (c = TypeError("The iterator does not provide a '" + u[a] + "' method"), a = 1);
              i = e;
            } else if (p = 2, t = (y = d.next < 0) ? c : r.call(n, d), p = y ? 3 : 1, t !== f) break;
          } catch (t) {
            p = 3, i = e, a = 1, c = t;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), c;
  }
  var f = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  regeneratorDefine(p, i, function () {
    return this;
  });
  var s = _Object$getPrototypeOf,
    y = s && s(s(regeneratorValues([])));
  y && y !== r && n.call(y, i) && (p = y);
  var d = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(p);
  function l(e) {
    return _Object$setPrototypeOf ? _Object$setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, a, "GeneratorFunction")), e.prototype = _Object$create(d), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(d, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), regeneratorDefineIM(d), regeneratorDefine(d, a, "Generator"), regeneratorDefine(d, i, function () {
    return this;
  }), regeneratorDefine(d, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: c,
      m: l
    };
  })();
}
export { _regenerator as default };