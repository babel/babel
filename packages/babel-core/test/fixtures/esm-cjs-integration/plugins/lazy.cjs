/*
import { types as t } from "../../../../lib/index.js";

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
var _core = require("../../../../lib/index.js");
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
