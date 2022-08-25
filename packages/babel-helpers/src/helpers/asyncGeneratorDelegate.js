/* @minVersion 7.0.0-beta.0 */

import OverloadYield from "OverloadYield";

export default function _asyncGeneratorDelegate(inner) {
  var iter = {},
    // See the comment in AsyncGenerator to understand what this is.
    waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: new OverloadYield(value, /* kind: delegate */ 1),
    };
  }

  iter[(typeof Symbol !== "undefined" && Symbol.iterator) || "@@iterator"] =
    function () {
      return this;
    };

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }
    return pump("next", value);
  };

  if (typeof inner.throw === "function") {
    iter.throw = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }
      return pump("throw", value);
    };
  }

  if (typeof inner.return === "function") {
    iter.return = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("return", value);
    };
  }

  return iter;
}
