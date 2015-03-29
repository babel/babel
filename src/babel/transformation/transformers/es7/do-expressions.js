import * as t from "../../../types";

export var metadata = {
  experimental: true,
  optional: true,
  stage: 0
};

export var check = t.isDoExpression;

export function DoExpression(node) {
  var body = node.body.body;
  if (body.length) {
    return body;
  } else {
    return t.identifier("undefined");
  }
}
