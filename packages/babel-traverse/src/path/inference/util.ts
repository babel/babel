import {
  createFlowUnionType,
  createTSUnionType,
  createUnionTypeAnnotation,
  isFlowType,
  isTSType,
} from "@babel/types";
import type * as t from "@babel/types";

export function createUnionType(
  types: (t.FlowType | t.TSType)[],
): t.FlowType | t.TSType | undefined {
  if (process.env.BABEL_8_BREAKING) {
    if (types.every(v => isFlowType(v))) {
      return createFlowUnionType(types as t.FlowType[]);
    }
    if (types.every(v => isTSType(v))) {
      return createTSUnionType(types as t.TSType[]);
    }
  } else {
    if (types.every(v => isFlowType(v))) {
      if (createFlowUnionType) {
        return createFlowUnionType(types as t.FlowType[]);
      }

      return createUnionTypeAnnotation(types as t.FlowType[]);
    } else if (types.every(v => isTSType(v))) {
      if (createTSUnionType) {
        return createTSUnionType(types as t.TSType[]);
      }
    }
  }
}
