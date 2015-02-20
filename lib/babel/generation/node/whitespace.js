"use strict";

var isBoolean = require("lodash/lang/isBoolean");
var each      = require("lodash/collection/each");
var map       = require("lodash/collection/map");
var t         = require("../../types");

var crawl = function (node, state) {
  state = state || {};

  if (t.isMemberExpression(node)) {
    crawl(node.object, state);
    if (node.computed) crawl(node.property, state);
  } else if (t.isBinary(node) || t.isAssignmentExpression(node)) {
    crawl(node.left, state);
    crawl(node.right, state);
  } else if (t.isCallExpression(node)) {
    state.hasCall = true;
    crawl(node.callee, state);
  } else if (t.isFunction(node)) {
    state.hasFunction = true;
  } else if (t.isIdentifier(node)) {
    state.hasHelper = state.hasHelper || isHelper(node.callee);
  }

  return state;
};

var isHelper = function (node) {
  if (t.isMemberExpression(node)) {
    return isHelper(node.object) || isHelper(node.property);
  } else if (t.isIdentifier(node)) {
    return node.name === "require" || node.name[0] === "_";
  } else if (t.isCallExpression(node)) {
    return isHelper(node.callee);
  } else if (t.isBinary(node) || t.isAssignmentExpression(node)) {
    return (t.isIdentifier(node.left) && isHelper(node.left)) || isHelper(node.right);
  } else {
    return false;
  }
};

var isType = function (node) {
  return t.isLiteral(node) || t.isObjectExpression(node) || t.isArrayExpression(node) ||
         t.isIdentifier(node) || t.isMemberExpression(node);
};

exports.nodes = {
  AssignmentExpression: function (node) {
    var state = crawl(node.right);
    if ((state.hasCall && state.hasHelper) || state.hasFunction) {
      return {
        before: state.hasFunction,
        after: true
      };
    }
  },

  SwitchCase: function (node, parent) {
    return {
      before: node.consequent.length || parent.cases[0] === node
    };
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
    if (t.isFunction(node.callee) || isHelper(node)) {
      return {
        before: true,
        after: true
      };
    }
  },

  VariableDeclaration: function (node) {
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];

      var enabled = isHelper(declar.id) && !isType(declar.init);
      if (!enabled) {
        var state = crawl(declar.init);
        enabled = (isHelper(declar.init) && state.hasCall) || state.hasFunction;
      }

      if (enabled) {
        return {
          before: true,
          after: true
        };
      }
    }
  },

  IfStatement: function (node) {
    if (t.isBlockStatement(node.consequent)) {
      return {
        before: true,
        after: true
      };
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
  TryStatement: true
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
