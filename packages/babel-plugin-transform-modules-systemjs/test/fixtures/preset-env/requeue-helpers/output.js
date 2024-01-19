System.register([], function (_export, _context) {
  "use strict";

  var nativeSymbol, symbol, AxiosHeaders;
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  return {
    setters: [],
    execute: function execute() {
      // Ref: https://github.com/babel/babel/issues/16219
      nativeSymbol = Symbol;
      try {
        delete global.Symbol;
        require("core-js/es/symbol");
        symbol = Symbol("test");
        expect(eval('typeof symbol === "object"')).toBe(true);
        expect(_typeof(symbol) === "symbol").toBe(true);
        expect(eval("_toPropertyKey(symbol)")).toBe(symbol);
      } finally {
        global.Symbol = nativeSymbol;
      }
      return "done";
      AxiosHeaders = /*#__PURE__*/function (_Symbol$iterator) {
        "use strict";

        function AxiosHeaders() {
          _classCallCheck(this, AxiosHeaders);
        }
        _createClass(AxiosHeaders, [{
          key: _Symbol$iterator,
          value: function value() {
            return;
          }
        }]);
        return AxiosHeaders;
      }(Symbol.iterator);
    }
  };
});
