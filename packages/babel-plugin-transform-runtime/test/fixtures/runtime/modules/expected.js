"use strict";

import _Object$defineProperty from "babel-runtime/core-js/object/define-property";
import _Object$keys from "babel-runtime/core-js/object/keys";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bar = _interopRequireDefault(require("bar"));

var _mod = require("mod");

_Object$keys(_mod).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mod[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bar.default;
