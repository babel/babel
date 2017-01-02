import type { NodePath } from "babel-traverse";

import * as destructuring from "./destructuring";
import * as def from "./default";
import * as rest from "./rest";

export default function ({ traverse }) {
  return {
    visitor: traverse.visitors.merge([{
      ArrowFunctionExpression(path) {
        // default/rest visitors require access to `arguments`
        let params: Array<NodePath> = path.get("params");
        for (let param of params) {
          if (param.isRestElement() || param.isAssignmentPattern()) {
            path.arrowFunctionToShadowed();
            break;
          }
        }
      }
    }, destructuring.visitor, rest.visitor, def.visitor])
  };
}
