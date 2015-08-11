import * as t from "babel-types";

export var metadata = {
  optional: true,
  stage: 0
};

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  DoExpression(node) {
    var body = node.body.body;
    if (body.length) {
      return body;
    } else {
      return t.identifier("undefined");
    }
  }
};
