import { isAssignmentPattern, isRestElement } from "@babel/types";
import type * as t from "@babel/types";

export default function (node: t.Function): number {
  const params = node.params;
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    if (isAssignmentPattern(param) || isRestElement(param)) {
      return i;
    }
  }
  return params.length;
}
