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

function buildListClone(listKey, bindingKey, refKey) {
  var clone = buildClone(bindingKey, refKey);

  return function (node) {
    if (!node[listKey]) return;

    for (var subNode of (node[listKey]: Array)) {
      clone(subNode);
    }
  };
}

export var Property = buildClone("value", "key");
export var ExportDeclaration = buildListClone("specifiers", "local", "exported");
export var ImportDeclaration = buildListClone("specifiers", "local", "imported");
