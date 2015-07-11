import clone from "lodash/lang/clone";
import * as t from "../../../types";

export var metadata = {
  group: "builtin-pre"
};

function buildClone(bindingKey, refKey, check?) {
  return function (node) {
    if (node[bindingKey] === node[refKey] || (check && check(node))) {
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

export var visitor = {
  Property: buildClone("value", "key", function (node) {
    return t.isAssignmentPattern(node.value) && node.value.left === node.key;
  }),
  ExportDeclaration: buildListClone("specifiers", "local", "exported"),
  ImportDeclaration: buildListClone("specifiers", "local", "imported")
};
