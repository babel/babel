"use strict";

module.exports = CommonStandardFormatter;

var CommonStrictFormatter = require("./common-strict");
var util = require("../../util");

function CommonStandardFormatter() {
  this.noInteropRequireImport = true;
  CommonStrictFormatter.apply(this, arguments);
}

util.inherits(CommonStandardFormatter, CommonStrictFormatter);
