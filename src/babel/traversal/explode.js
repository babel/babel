import * as t from "../types";

export default function (obj) {
  for (var type in obj) {
    var fns = obj[type];
    if (typeof fns === "function") {
      obj[type] = fns = { enter: fns };
    }

    var aliases = t.FLIPPED_ALIAS_KEYS[type];
    if (aliases) {
      for (var i = 0; i < aliases.length; i++) {
        var alias = aliases[i];
        obj[alias] = obj[alias] || fns;
      }
    }
  }
  return obj;
}
