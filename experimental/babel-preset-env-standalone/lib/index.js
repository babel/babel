"use strict";

exports.__esModule = true;
exports.version = void 0;

var _standalone = require("@babel/standalone");

var _presetEnv = _interopRequireDefault(require("@babel/preset-env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _standalone.registerPreset)("env", _presetEnv.default);
var version = VERSION;
exports.version = version;