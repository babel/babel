var _Symbol = require("core-js/library/fn/symbol/index.js");
var _Symbol$iterator = require("core-js/library/fn/symbol/iterator.js");
var _Array$isArray = require("core-js/library/fn/array/is-array.js");
function _iterableToArray(r) {
  var e = "undefined" != typeof _Symbol && r[_Symbol$iterator] || r["@@iterator"];
  if (_Array$isArray(r) && (null == e || e === ("undefined" != typeof _Symbol && [][_Symbol$iterator]) || e === []["@@iterator"])) return r;
  if (null != e) {
    for (var t, o = [], a = e.call(r); !(t = a.next()).done;) o.push(t.value);
    return o;
  }
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;