module.exports = CommonJSStrictFormatter;

var CommonJSFormatter = require("./common");
var util              = require("../../util");

function CommonJSStrictFormatter() {
  this.noInteropExport = true;
  CommonJSFormatter.apply(this, arguments);
}

util.inherits(CommonJSStrictFormatter, CommonJSFormatter);
