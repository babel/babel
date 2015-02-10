var t = require("../types");
var includes = require("lodash/collection/includes");

exports.AssignmentExpression = function (node, parent, detected) {
  if (node.operator === "**=") {
    detected("es6.exponentation");
  }
};

exports.BinaryExpression = function (node, parent, detected) {
  if (node.operator === "**") {
    detected("es6.exponentation");
  }
};

exports.VariableDeclaration = function (node, parent, detected) {
  if (node.kind === "let" || node.kind === "const") {
    detected("es6.blockScoping");
  }

  if (node.kind === "const") {
    detected("es6.constants");
  }
};

exports.Property = function (node, parent, detected) {
  if (node.shorthand || node.method) {
    detected("es6.properties.shorthand");
  }

  if (node.kind === "set" || node.kind === "get") {
    detected("es5.properties.mutators");
  }

  if (node.computed) {
    detected("es6.properties.computed");
  }
};

exports.AssignmentPattern = function (node, parent, detected) {
  if (t.isFunction(parent) && includes(parent.params, node)) {
    detected("es6.parameters.default");
  }
};

exports.Function = function (node, parent, detected) {
  if (node.generator) {
    detected("es6.generators");
  }

  if (node.async) {
    detected("es7.asyncFunctions");
  }
};
