import _typeof from "./typeof.js";
import _WeakMap from "core-js-pure/features/weak-map/index.js";
import _reduceInstanceProperty from "core-js-pure/features/instance/reduce.js";
import _Object$keys from "core-js-pure/features/object/keys.js";
import _Object$create from "core-js-pure/features/object/create.js";
import _Symbol$replace from "core-js-pure/features/symbol/replace.js";
import _Array$isArray from "core-js-pure/features/array/is-array.js";
import _pushInstanceProperty from "core-js-pure/features/instance/push.js";
import _sliceInstanceProperty from "core-js-pure/features/instance/slice.js";
import setPrototypeOf from "./setPrototypeOf.js";
import inherits from "./inherits.js";
function _wrapRegExp() {
  _wrapRegExp = function _wrapRegExp(e, r) {
    return new BabelRegExp(e, void 0, r);
  };
  var t = RegExp.prototype,
    p = new _WeakMap();
  function BabelRegExp(r, t, o) {
    var n = RegExp(r, t);
    return p.set(n, o || p.get(r)), setPrototypeOf(n, BabelRegExp.prototype);
  }
  function buildGroups(e, r) {
    var _context;
    var t = p.get(r);
    return _reduceInstanceProperty(_context = _Object$keys(t)).call(_context, function (r, p) {
      var o = t[p];
      if ("number" == typeof o) r[p] = e[o];else {
        for (var n = 0; void 0 === e[o[n]] && n + 1 < o.length;) n++;
        r[p] = e[o[n]];
      }
      return r;
    }, _Object$create(null));
  }
  return inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (e) {
    var r = t.exec.call(this, e);
    if (r) {
      r.groups = buildGroups(r, this);
      var p = r.indices;
      p && (p.groups = buildGroups(p, this));
    }
    return r;
  }, BabelRegExp.prototype[_Symbol$replace] = function (e, r) {
    if ("string" == typeof r) {
      var o = p.get(this);
      return t[_Symbol$replace].call(this, e, r.replace(/\$<([^>]+)(>|$)/g, function (e, r, t) {
        if ("" === t) return e;
        var p = o[r];
        return _Array$isArray(p) ? "$" + p.join("$") : "number" == typeof p ? "$" + p : "";
      }));
    }
    if ("function" == typeof r) {
      var n = this;
      return t[_Symbol$replace].call(this, e, function () {
        var _context2;
        var e = arguments;
        return "object" != _typeof(e[e.length - 1]) && _pushInstanceProperty(_context2 = e = _sliceInstanceProperty([]).call(e)).call(_context2, buildGroups(e, n)), r.apply(this, e);
      });
    }
    return t[_Symbol$replace].call(this, e, r);
  }, _wrapRegExp.apply(this, arguments);
}
export { _wrapRegExp as default };