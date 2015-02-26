import clone from "lodash/lang/clone";
import t from "../../../types";

exports.check = function (node) {
  return t.isProperty(node) && (node.method || node.shorthand);
};

exports.Property = function (node) {
  if (node.method) {
    node.method = false;
  }

  if (node.shorthand) {
    node.shorthand = false;
    node.key = t.removeComments(clone(node.key));
  }
};
