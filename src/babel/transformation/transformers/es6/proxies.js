import * as t from "../../../types";

export var metadata = {
  optional: true
};

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

// foo in bar
export function BinaryExpression(node) {

}

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
