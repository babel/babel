import regenerator from "regenerator-babel";
import * as t from "../../../types";

export function check(node) {
  return t.isFunction(node) && (node.async || node.generator);
}

export var Program = {
  enter(ast) {
    regenerator.transform(ast);
    this.stop();
  }
};
