System.register([], function (_export, _context) {
  "use strict";

  var symbol;
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
          _createClass(AxiosHeaders, [{
            key: _objectWithPrimitive,
            value: function value() {
              return;
            }
          }]);
          return AxiosHeaders;
        }(objectWithPrimitive(symbol));
      }).not.toThrow();
      expect(function () {
        var AxiosHeaders = /*#__PURE__*/function (_objectWithPrimitive2) {
          "use strict";

          function AxiosHeaders() {
            _classCallCheck(this, AxiosHeaders);
          }
          _createClass(AxiosHeaders, [{
            key: _objectWithPrimitive2,
            value: function value() {
              return;
            }
          }]);
          return AxiosHeaders;
        }(objectWithPrimitive({}));
      }).toThrow();
      return "ok";
    }
  };
});
