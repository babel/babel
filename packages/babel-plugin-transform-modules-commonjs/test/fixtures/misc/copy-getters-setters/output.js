"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Foo", {
  enumerable: true,
  get: function () {
    return _moduleWithGetter.default;
  }
});
Object.defineProperty(exports, "baz", {
  enumerable: true,
  get: function () {
    return _moduleWithGetter.baz;
  }
});

var _moduleWithGetter = _interopRequireDefault(require("./moduleWithGetter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
