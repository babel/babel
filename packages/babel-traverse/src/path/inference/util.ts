import {
  createFlowUnionType,
  createTSUnionType,
  isFlowType,
  isTSType,
} from "@babel/types";
import type * as t from "@babel/types";

export function createUnionType(
  types: (t.FlowType | t.TSType)[],
): t.FlowType | t.TSType | undefined {
  if (types.every(v => isFlowType(v))) {
    return createFlowUnionType(types);
  }
  if (types.every(v => isTSType(v))) {
    return createTSUnionType(types);
  }
}
