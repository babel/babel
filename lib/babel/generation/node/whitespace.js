"use strict";

var isBoolean = require("lodash/lang/isBoolean");
var each      = require("lodash/collection/each");
var map       = require("lodash/collection/map");
var t         = require("../../types");

var shouldWhitespace = function (node) {
  if (t.isFunction(node)) {
    return true;
  } else if (t.isAssignmentExpression(node)) {
    return shouldWhitespace(node.right);
  } else if (t.isBinary(node)) {
    return shouldWhitespace(node.left) || shouldWhitespace(node.right);
  }

  return false;
};

exports.nodes = {
  AssignmentExpression: function (node) {
    if (shouldWhitespace(node.right)) {
      return {
        before: true,
        after: true
      };
    }
  },

  SwitchCase: function (node, parent) {
    if (parent.cases[0] === node) {
      return {
        before: true
      };
    }
  },

  LogicalExpression: function (node) {
    if (t.isFunction(node.left) || t.isFunction(node.right)) {
      return {
        after: true
      };
    }
  },

  Literal: function (node) {
    if (node.value === "use strict") {
      return {
        after: true
      };
    }
  },

  CallExpression: function (node) {
    if (t.isFunction(node.callee)) {
      return {
        before: true,
        after: true
      };
    }
  },

  VariableDeclaration: function (node) {
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      var init   = declar.init;
      if (!t.isIdentifier(init) && shouldWhitespace(init)) {
        return {
          before: true,
          after: true
        };
      }
    }
  }
};

exports.nodes.Property =
exports.nodes.SpreadProperty = function (node, parent) {
  if (parent.properties[0] === node) {
    return {
      before: true
    };
  }
};

exports.list = {
  VariableDeclaration: function (node) {
    return map(node.declarations, "init");
  },

  ArrayExpression: function (node) {
    return node.elements;
  },

  ObjectExpression: function (node) {
    return node.properties;
  }
};

each({
  Function: true,
  Class: true,
  Loop: true,
  LabeledStatement: true,
  SwitchStatement: true,
  TryStatement: true,
  IfStatement: true
}, function (amounts, type) {
  if (isBoolean(amounts)) {
    amounts = { after: amounts, before: amounts };
  }

  each([type].concat(t.FLIPPED_ALIAS_KEYS[type] || []), function (type) {
    exports.nodes[type] = function () {
      return amounts;
    };
  });
});
