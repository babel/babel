import {
  createFlowUnionType,
  createTSUnionType,
  createUnionTypeAnnotation,
  isFlowType,
  isTSType,
} from "@babel/types";
import type * as t from "@babel/types";

export function createUnionType(
  types: Array<t.FlowType | t.TSType>,
): t.FlowType | t.TSType {
  if (process.env.BABEL_8_BREAKING) {
    if (isFlowType(types[0])) {
      return createFlowUnionType(types as t.FlowType[]);
    }
    if (isTSType(types[0])) {
      return createTSUnionType(types as t.TSType[]);
    }
  } else {
    if (isFlowType(types[0])) {
      if (createFlowUnionType) {
        return createFlowUnionType(types as t.FlowType[]);
      }

      return createUnionTypeAnnotation(types as t.FlowType[]);
    } else {
      if (createTSUnionType) {
        return createTSUnionType(types as t.TSType[]);
      }
    }
  }
}
