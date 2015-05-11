import clone from "lodash/lang/clone";
import * as t from "../../../types";

export var metadata = {
  group: "builtin-setup"
};

function buildClone(bindingKey, refKey) {
  return function (node) {
    if (node[bindingKey] === node[refKey]) {
      node[refKey] = t.removeComments(clone(node[refKey]));
    }
  };
}

export var Property = buildClone("value", "key");
export var ExportSpecifier = buildClone("local", "exported");
export var ImportSpecifier = buildClone("local", "imported");
