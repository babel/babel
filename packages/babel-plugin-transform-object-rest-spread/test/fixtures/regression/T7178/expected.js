"use strict";

var _props = require("props");

var _props2 = _interopRequireDefault(_props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; var objKeys = Object.keys(obj); if (Object.getOwnPropertySymbols) { objKeys = objKeys.concat(Object.getOwnPropertySymbols(obj)); } for (var i = 0; i < objKeys.length; i++) { key = objKeys[i]; if (!Object.prototype.propertyIsEnumerable.call(obj, key)) continue; if (keys.indexOf(key) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, key)) continue; target[key] = obj[key]; } return target; }

console.log(_props2.default);

(function () {
  const props = _objectWithoutProperties(this.props, []);

  console.log(props);
})();