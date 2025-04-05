/* @minVersion 7.19.0 */

import setPrototypeOf from "./setPrototypeOf.ts";
import inherits from "./inherits.ts";

// Define interfaces for clarity and type safety
interface GroupMap {
  [key: string]: number | [number, number];
}

declare class BabelRegExp extends RegExp {
  exec(str: string): RegExpExecArray | null;
  [Symbol.replace](str: string, substitution: string | Function): string;
}

interface BabelRegExpConstructor {
  new (re: RegExp, flags?: string, groups?: GroupMap): BabelRegExp;
  readonly prototype: BabelRegExp;
}

export default function _wrapRegExp(this: any): RegExp {
  // @ts-expect-error -- deliberately re-assign
  _wrapRegExp = function (re: RegExp, groups?: GroupMap): RegExp {
    return new (BabelRegExp as any as BabelRegExpConstructor)(
      re,
      undefined,
      groups,
    );
  };

  var _super = RegExp.prototype;
  var _groups = new WeakMap<RegExp, GroupMap>();

  function BabelRegExp(
    this: BabelRegExp,
    re: RegExp,
    flags?: string,
    groups?: GroupMap,
  ) {
    var _this = new RegExp(re, flags);
    // if the regex is re-created with 'g' flag
    _groups.set(_this, groups || _groups.get(re)!);
    return setPrototypeOf(_this, BabelRegExp.prototype) as BabelRegExp;
  }
  inherits(BabelRegExp, RegExp);

  BabelRegExp.prototype.exec = function (
    this: BabelRegExp,
    str: string,
  ): RegExpExecArray | null {
    var result = _super.exec.call(this, str);
    if (result) {
      result.groups = buildGroups(result, this);
      var indices = result.indices;
      if (indices) indices.groups = buildGroups(indices, this);
    }
    return result;
  };

  BabelRegExp.prototype[Symbol.replace] = function (
    this: BabelRegExp,
    str: string,
    substitution: string | Function,
  ): string {
    if (typeof substitution === "string") {
      var groups = _groups.get(this)!;
      return (
        _super[Symbol.replace] as (
          string: string,
          replaceValue: string,
        ) => string
      ).call(
        this,
        str,
        substitution.replace(/\$<([^>]+)(>|$)/g, function (match, name, end) {
          if (end === "") {
            // return unterminated group name as-is
            return match;
          } else {
            var group = groups[name];
            return Array.isArray(group)
              ? "$" + group.join("$")
              : typeof group === "number"
                ? "$" + group
                : "";
          }
        }),
      );
    } else if (typeof substitution === "function") {
      var _this = this;
      return (
        _super[Symbol.replace] as (
          string: string,
          replacer: (substring: string, ...args: any[]) => string,
        ) => string
      ).call(this, str, function (this: any) {
        var args: IArguments | any[] = arguments;
        // Modern engines already pass result.groups returned by exec() as the last arg.
        if (typeof args[args.length - 1] !== "object") {
          args = [].slice.call(args) as any[];
          args.push(buildGroups(args, _this));
        }
        return substitution.apply(this, args);
      });
    } else {
      return _super[Symbol.replace].call(this, str, substitution);
    }
  };

  function buildGroups(
    result: RegExpExecArray,
    re: RegExp,
  ): Record<string, string>;
  function buildGroups(
    result: RegExpIndicesArray,
    re: RegExp,
  ): Record<string, [number, number]>;
  function buildGroups(
    result: RegExpExecArray | RegExpIndicesArray,
    re: RegExp,
  ): Record<string, string> | Record<string, [number, number]> {
    var g = _groups.get(re)!;
    return Object.keys(g).reduce(function (groups, name) {
      var i = g[name];
      if (typeof i === "number") groups[name] = result[i];
      else {
        var k = 0;
        while (result[i[k]] === undefined && k + 1 < i.length) {
          k++;
        }
        groups[name] = result[i[k]];
      }
      return groups;
    }, Object.create(null));
  }

  return _wrapRegExp.apply(this, arguments as any);
}
