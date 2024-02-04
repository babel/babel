/* @minVersion 7.19.0 */

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
    if (result) {
      result.groups = buildGroups(result, this);
      var indices = result.indices;
      if (indices) indices.groups = buildGroups(indices, this);
    }
    return result;
  };
  BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if (typeof substitution === "string") {
      var groups = _groups.get(this);
      return _super[Symbol.replace].call(
        this,
        str,
        substitution.replace(/\$<([^>]+)>/g, function (_, name) {
          var group = groups[name];
          return "$" + (Array.isArray(group) ? group.join("$") : group);
        }),
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
      var i = g[name];
      if (typeof i === "number") groups[name] = result[i];
      else {
        // i is an array of indexes
        var k = 0;
        // if no group matched, we stop at k = i.length - 1 and then
        // we store result[i[i.length - 1]] which is undefined.
        while (result[i[k]] === undefined && k + 1 < i.length) k++;
        groups[name] = result[i[k]];
      }
      return groups;
    }, Object.create(null));
  }

  return _wrapRegExp.apply(this, arguments);
}
