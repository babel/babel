import _Symbol from "core-js-pure/features/symbol/index.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _Object$setPrototypeOf from "core-js-pure/features/object/set-prototype-of.js";
import regeneratorDefine from "./regeneratorDefine.js";
import regeneratorDefineIM from "./regeneratorDefineIM.js";
import regeneratorValues from "./regeneratorValues.js";
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
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
        y = o || [],
        d = !1,
        l = {
          prev: 0,
          next: 0,
          sent: e,
          abrupt: s,
          finish: _bindInstanceProperty(s).call(s, e, 4),
          delegateYield: function delegateYield(t, r) {
            return i = regeneratorValues(t), a = 0, c = e, l.next = r, f;
          }
        };
      function s(r, n) {
        for (a = r, c = n, t = 0; !d && p && !o && t < y.length; t++) {
          var o,
            i = y[t],
            u = l.prev,
            s = i[2];
          r > 3 ? (o = s === n) && (a = i[4] || 3, c = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= u && ((o = r < 2 && u < i[1]) ? (a = 0, l.sent = n, l.next = i[1]) : u < s && (o = r < 3 || i[0] > n || n > s) && (i[4] = r, i[5] = n, l.next = s, a = 0));
        }
        if (o || r > 1) return f;
        throw d = !0, n;
      }
      return function (o, y, G) {
        if (2 === p) throw Error("Generator is already running");
        for (d && 1 === y && s(y, G), a = y, c = G; !d || (t = e);) {
          i || (a ? a < 3 ? (a > 1 && (l.next = -1), s(a, c)) : l.next = c : l.sent = c);
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
            } else if (p = 2, t = (d = l.next < 0) ? c : r.call(n, l), p = d ? 3 : 1, t !== f) break;
          } catch (t) {
            p = 3, i = e, a = 1, c = t;
          }
        }
        return {
          value: t,
          done: d
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
  var y = _Object$getPrototypeOf,
    d = y && y(y(regeneratorValues([])));
  d && d !== r && n.call(d, i) && (p = d);
  var l = GeneratorFunctionPrototype.prototype = Generator.prototype = _Object$create(p);
  function s(e) {
    return _Object$setPrototypeOf ? _Object$setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, a, "GeneratorFunction")), e.prototype = _Object$create(l), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(l, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = regeneratorDefine(GeneratorFunctionPrototype, a, "GeneratorFunction"), regeneratorDefineIM(l), regeneratorDefine(l, a, "Generator"), regeneratorDefine(l, i, function () {
    return this;
  }), regeneratorDefine(l, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: c,
      m: s
    };
  })();
}
export { _regenerator as default };