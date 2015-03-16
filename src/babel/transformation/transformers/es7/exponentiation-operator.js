// https://github.com/rwaldron/exponentiation-operator

import build from "../../helpers/build-binary-assignment-operator-transformer";
import * as t from "../../../types";

export var metadata = {
  optional: true
};

var MATH_POW = t.memberExpression(t.identifier("Math"), t.identifier("pow"));

build(exports, {
  operator: "**",

  build(left, right) {
    return t.callExpression(MATH_POW, [left, right]);
  }
});
