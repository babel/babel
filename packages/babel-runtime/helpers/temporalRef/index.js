var temporalUndefined = require("@babel/runtime/helpers/temporalUndefined");

var tdz = require("@babel/runtime/helpers/tdz");

function _temporalRef(val, name) {
  return val === temporalUndefined ? tdz(name) : val;
}

module.exports = _temporalRef;
module.exports["default"] = module.exports, module.exports.__esModule = true;