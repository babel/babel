import * as t from "babel-types";

export let metadata = {
  optional: true,
  stage: 0
};

export let visitor = {
  DoExpression(node) {
    let body = node.body.body;
    if (body.length) {
      return body;
    } else {
      return this.scope.buildUndefinedNode();
    }
  }
};
