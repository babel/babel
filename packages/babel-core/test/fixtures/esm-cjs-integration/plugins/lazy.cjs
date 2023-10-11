/*
import { types as t } from "../../../../cjs-proxy.cjs";

export default function () {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === "REPLACE_ME") {
          path.replaceWith(t.stringLiteral("Replaced!"));
        }
      }
    }
  }
}
*/

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = _default;
var _core = require("../../../../cjs-proxy.cjs");
function _default() {
  return {
    visitor: {
      Identifier: function Identifier(path) {
        if (path.node.name === "REPLACE_ME") {
          path.replaceWith(_core.types.stringLiteral("Replaced!"));
        }
      },
    },
  };
}
