"use strict";
"use exports { default }";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(_ref) {
  var _onClick = _ref.onClick;
  return React.createElement("div", {
    onClick: function onClick() {
      return _onClick();
    }
  });
};

exports.default = _default;
