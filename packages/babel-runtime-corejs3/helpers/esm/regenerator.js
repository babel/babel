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
        p = 1,
        s = o || [],
        y = !1,
        d = 0,
        l = {
          prev: 0,
          next: 0,
          sent: e,
          stop: G,
          abrupt: v,
          finish: _bindInstanceProperty(v).call(v, e, 4),
          delegateYield: function delegateYield(t, r) {
            return a = regeneratorValues(t), d = 0, c = e, l.next = r, f;
          }
        };
      function G() {
        return y = !0, i;
      }
      function v(t, r) {
        d = t, c = r;
        for (var n = s.length - 1; !y && 1 !== p && n >= 0; --n) {
          var o,
            i = s[n],
            a = l.prev,
            u = i[0],
            G = i[1],
            v = i[2];
          if (4 === t ? (o = v === r) && (d = i[4] || 3, c = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : u <= a && ((o = 1 === t && a < G) ? (d = 0, l.sent = r, l.next = G) : a < v && (o = 1 === t || !(3 === t && u <= r && r <= v)) && (i[4] = t, i[5] = r, l.next = v, d = 0)), o) break;
        }
        if (o || 1 !== t) return f;
        throw p = 4, r;
      }
      return function (o, s, h) {
        if (3 === p) throw Error("Generator is already running");
        if (4 === p) {
          if (1 === s) throw h;
          return {
            value: e,
            done: !0
          };
        }
        for (d = s, c = h;;) {
          a || (0 === d ? l.sent = c : 1 === d ? v(1, c) : 2 === d ? (i = c, l.next = -1, v(2, c)) : l.next = c);
          try {
            if (a) {
              if (t = a[u[d]]) {
                if (t = t.call(a, c)) {
                  if (!t) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  c = t.value, 2 !== d && (d = 0);
                }
              } else 1 === d && (t = a["return"]) && t.call(a), 2 !== d && (c = TypeError("The iterator does not provide a '" + u[d] + "' method"), d = 1);
              a = e;
            } else if (p = 3, t = (-1 === l.next ? G : r).call(n, l), p = y ? 4 : 2, t !== f) return {
              value: t,
              done: y
            };
          } catch (t) {
            p = 4, a = e, d = 1, c = t;
          }
        }
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