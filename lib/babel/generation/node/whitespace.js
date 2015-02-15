"use strict";

var t        = require("../../types");
var each     = require("lodash/collection/each");
var map      = require("lodash/collection/map");
var isNumber = require("lodash/lang/isNumber");

exports.before = {
  nodes: {
    Property: function (node, parent) {
      if (parent.properties[0] === node) {
        return 1;
      }
    },

    SpreadProperty: function (node, parent) {
      return exports.before.nodes.Property(node, parent);
    },

    SwitchCase: function (node, parent) {
      if (parent.cases[0] === node) {
        return 1;
      }
    },

    CallExpression: function (node) {
      if (t.isFunction(node.callee)) {
        return 1;
      }
    }
  }
};

exports.after = {
  nodes: {
    LogicalExpression: function (node) {
      return t.isFunction(node.left) || t.isFunction(node.right);
    },

    AssignmentExpression: function (node) {
      if (t.isFunction(node.right)) {
        return 1;
      }
    }
  },

  list: {
    VariableDeclaration: function (node) {
      return map(node.declarations, "init");
    },

    ArrayExpression: function (node) {
      return node.elements;
    },

    ObjectExpression: function (node) {
      return node.properties;
    }
  }
};

each({
  Function: 1,
  Class: 1,
  For: 1,
  ArrayExpression: { after: 1 },
  ObjectExpression: { after: 1 },
  SwitchStatement: 1,
  IfStatement: { before: 1 },
  CallExpression: { after: 1 },
  Literal: { after: 1 }
}, function (amounts, type) {
  if (isNumber(amounts)) {
    amounts = { after: amounts, before: amounts };
  }

  each([type].concat(t.FLIPPED_ALIAS_KEYS[type] || []), function (type) {
    each(amounts, function (amount, key) {
      exports[key].nodes[type] = function () {
        return amount;
      };
    });
  });
});
