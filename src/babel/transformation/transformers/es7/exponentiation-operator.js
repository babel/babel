// https://github.com/rwaldron/exponentiation-operator

exports.experimental = true;

import build from "../../helpers/build-binary-assignment-operator-transformer";
import t from "../../../types";

var MATH_POW = t.memberExpression(t.identifier("Math"), t.identifier("pow"));

build(exports, {
  operator: "**",

  build(left, right) {
    return t.callExpression(MATH_POW, [left, right]);
  }
});
