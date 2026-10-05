System.register([], function (_export, _context) {
  "use strict";

  var symbol;
  function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
  function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
  function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
  function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function objectWithPrimitive(prim) {
    return _defineProperty({}, Symbol.toPrimitive, function () {
      return prim;
    });
  }
  return {
    setters: [],
    execute: function execute() {
      // Ref: https://github.com/babel/babel/issues/16219

      // delete global.Symbol doesn't work with jest in node 6
      Object.defineProperty(global, "Symbol", {
        configurable: true,
        writable: true,
        value: undefined
      });
      require("core-js/modules/es.symbol.js");
      require("core-js/modules/es.symbol.to-primitive");
      symbol = Symbol("test"); // Use eval to not let Babel transform this `typeof`
      expect(eval('typeof symbol')).toBe("object");
      expect(_typeof(symbol)).toBe("symbol");
      expect(function () {
        var AxiosHeaders = /*#__PURE__*/function (_objectWithPrimitive) {
          "use strict";

          function AxiosHeaders() {
            _classCallCheck(this, AxiosHeaders);
          }
          return _createClass(AxiosHeaders, [{
            key: _objectWithPrimitive,
            value: function value() {
              return;
            }
          }]);
        }(objectWithPrimitive(symbol));
      }).not.toThrow();
      expect(function () {
        var AxiosHeaders = /*#__PURE__*/function (_objectWithPrimitive2) {
          "use strict";

          function AxiosHeaders() {
            _classCallCheck(this, AxiosHeaders);
          }
          return _createClass(AxiosHeaders, [{
            key: _objectWithPrimitive2,
            value: function value() {
              return;
            }
          }]);
        }(objectWithPrimitive({}));
      }).toThrow();
      return "ok";
    }
  };
});
