// https://github.com/rwaldron/exponentiation-operator

import build from "../../helpers/build-binary-assignment-operator-transformer";
import * as t from "../../../types";

export var metadata = {
  stage: 2
};

var MATH_POW = t.memberExpression(t.identifier("Math"), t.identifier("pow"));

var {
  ExpressionStatement,
  AssignmentExpression,
  BinaryExpression
} = build({
  operator: "**",

  build(left, right) {
    return t.callExpression(MATH_POW, [left, right]);
  }
});

export {
  ExpressionStatement,
  AssignmentExpression,
  BinaryExpression
};
