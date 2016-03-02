import { visitors } from "babel-traverse";

import * as destructuring from "./destructuring";
import * as def from "./default";
import * as rest from "./rest";

export default function () {
  return {
    visitor: visitors.merge([{
      ArrowFunctionExpression(path) {
        // default/rest visitors require access to `arguments`
        let params = path.get("params");
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
