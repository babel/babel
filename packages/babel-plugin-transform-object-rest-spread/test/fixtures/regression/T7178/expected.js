"use strict";

var _props = _interopRequireDefault(require("props"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

console.log(_props.default);

(function () {
  const props = _objectWithoutProperties(this.props, []);

  console.log(props);
})();