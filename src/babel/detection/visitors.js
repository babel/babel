import includes from "lodash/collection/includes";
import t from "../types";

export function AssignmentExpression(node, parent, detected) {
  if (node.operator === "**=") {
    detected("es6.exponentation");
  }
}

export function BinaryExpression(node, parent, detected) {
  if (node.operator === "**") {
    detected("es6.exponentation");
  }
}

export function VariableDeclaration(node, parent, detected) {
  if (node.kind === "let" || node.kind === "const") {
    detected("es6.blockScoping");
  }

  if (node.kind === "const") {
    detected("es6.constants");
  }
}

export function Property(node, parent, detected) {
  if (node.shorthand || node.method) {
    detected("es6.properties.shorthand");
  }

  if (node.kind === "set" || node.kind === "get") {
    detected("es5.properties.mutators");
  }

  if (node.computed) {
    detected("es6.properties.computed");
  }
}

export function AssignmentPattern(node, parent, detected) {
  if (t.isFunction(parent) && includes(parent.params, node)) {
    detected("es6.parameters.default");
  }
}

exports.Function = function (node, parent, detected) {
  if (node.generator) {
    detected("es6.generators");
  }

  if (node.async) {
    detected("es7.asyncFunctions");
  }
}
