import * as t from "../../../types";
import * as util from "../../../util";

export var metadata = {
  optional: true
};

// foo in bar
export function BinaryExpression(node) {
  if (node.operator === "in") {
    return util.template("ludicrous-in", {
      LEFT: node.left,
      RIGHT: node.right
    });
  }
}

// { 1: "foo" }
export function Property(node) {
  var key = node.key;
  if (t.isLiteral(key) && typeof key.value === "number") {
    key.value = "" + key.value;
  }
}

// /foobar/g
export function Literal(node) {
  if (node.regex) {
    node.regex.pattern = "foobar";
    node.regex.flags = "";
  }
}

// foo.bar
export function MemberExpression(node) {

}

// Object.setPrototypeOf
// Object.preventExtensions
// Object.keys
// Object.isExtensible
// Object.getOwnPropertyDescriptor
// Object.defineProperty
export function CallExpression(node) {

}

// delete foo.bar
export function UnaryExpression(node) {

}

// foo.bar = bar;
export function AssignmentExpression(node) {

}

// new Proxy
export function NewExpression(node, parent, scope, file) {
  if (this.get("callee").isIdentifier({ name: "Proxy" })) {
    return t.callExpression(file.addHelper("proxy-create"), [node.arguments[0], file.addHelper("proxy-directory")]);
  } else {
    // possible proxy constructor
  }
}
