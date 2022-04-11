/* @minVersion 7.2.6 */

import setPrototypeOf from "setPrototypeOf";
import inherits from "inherits";

export default function _wrapRegExp() {
  _wrapRegExp = function (re, groups) {
    return new BabelRegExp(re, undefined, groups);
  };

  var _super = RegExp.prototype;
  var _groups = new WeakMap();

  function BabelRegExp(re, flags, groups) {
    var _this = new RegExp(re, flags);
    // if the regex is recreated with 'g' flag
    _groups.set(_this, groups || _groups.get(re));
    return setPrototypeOf(_this, BabelRegExp.prototype);
  }
  inherits(BabelRegExp, RegExp);

  BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);
    if (result) result.groups = buildGroups(result, this);
    return result;
  };
  BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if (typeof substitution === "string") {
      var groups = _groups.get(this);
      return _super[Symbol.replace].call(
        this,
        str,
        substitution.replace(/\$<([^>]+)>/g, function (_, name) {
          return "$" + groups[name];
        })
      );
    } else if (typeof substitution === "function") {
      var _this = this;
      return _super[Symbol.replace].call(this, str, function () {
        var args = arguments;
        // Modern engines already pass result.groups returned by exec() as the last arg.
        if (typeof args[args.length - 1] !== "object") {
          args = [].slice.call(args);
          args.push(buildGroups(args, _this));
        }
        return substitution.apply(this, args);
      });
    } else {
      return _super[Symbol.replace].call(this, str, substitution);
    }
  };

  function buildGroups(result, re) {
    // NOTE: This function should return undefined if there are no groups,
    // but in that case Babel doesn't add the wrapper anyway.

    var g = _groups.get(re);
    return Object.keys(g).reduce(function (groups, name) {
      groups[name] = result[g[name]];
      return groups;
    }, Object.create(null));
  }

  return _wrapRegExp.apply(this, arguments);
}
