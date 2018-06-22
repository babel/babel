"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/builtin/interopRequireDefault");

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/taggedTemplateLiteral"));

function _templateObject() {
  const data = (0, _taggedTemplateLiteral2.default)(["foo"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

tag(_templateObject());
