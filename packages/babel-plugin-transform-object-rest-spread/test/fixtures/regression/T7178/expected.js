"use strict";

var _props = require("props");

var _props2 = _interopRequireDefault(_props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; if (obj == null) return target; var i, key, toExclude = []; for (i = 0; i < keys.length; i++) { key = keys[i]; toExclude.push(typeof key == "symbol" ? key : "" + key); } var objKeys = []; for (i in obj) { objKeys.push(i); } if (Object.getOwnPropertySymbols) { objKeys = objKeys.concat(Object.getOwnPropertySymbols(obj)); } for (i = 0; i < objKeys.length; i++) { key = objKeys[i]; if (!Object.prototype.propertyIsEnumerable.call(obj, key)) continue; if (toExclude.indexOf(key) >= 0) continue; target[key] = obj[key]; } return target; }

console.log(_props2.default);

(function () {
  const props = _objectWithoutProperties(this.props, []);

  console.log(props);
})();