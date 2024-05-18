var _typeof = require("./typeof.js")["default"];
var assertThisInitialized = require("./assertThisInitialized.js");

function _possibleConstructorReturn<T, U>(t: T, e: U): U | T {
  if (e && (typeof e === "object" || typeof e === "function")) return e;
  if (e !== undefined) throw new TypeError("Derived constructors may only return object or undefined");
  return assertThisInitialized(t);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;