var _Symbol = require("@babel/runtime-corejs3/core-js-stable/symbol");
var _Symbol$toPrimitive = require("@babel/runtime-corejs3/core-js-stable/symbol/to-primitive");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), _Object$defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), _Object$defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != typeof t || !t) return t; var r; if ("undefined" != typeof _Symbol && void 0 !== (r = t[_Symbol$toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
let Foo = /*#__PURE__*/_createClass(function Foo() {
  "use strict";

  _classCallCheck(this, Foo);
});
