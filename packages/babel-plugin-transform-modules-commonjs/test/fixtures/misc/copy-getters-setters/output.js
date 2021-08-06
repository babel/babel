"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _export(key, get) {
  Object.defineProperty(exports, key, {
    enumerable: true,
    get
  });
}

_export("Foo", () => _moduleWithGetter.default);

_export("baz", () => _moduleWithGetter.baz);

var _moduleWithGetter = _interopRequireDefault(require("./moduleWithGetter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
