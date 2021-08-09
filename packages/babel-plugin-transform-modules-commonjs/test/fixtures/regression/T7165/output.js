"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _exportFromThis(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === this[key]) return;
  var imports = this;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return imports[key];
    }
  });
}

var _foo = _interopRequireDefault(require("foo"));

var _bar = require("bar");

Object.keys(_bar).forEach(_exportFromThis, _bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var anything = {};
