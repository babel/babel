"use strict";

var _ = require("lodash");
var t = require("../../types");

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
    AssignmentExpression: function (node) {
      if (t.isFunction(node.right)) {
        return 1;
      }
    }
  },

  list: {
    VariableDeclaration: function (node) {
      return _.map(node.declarations, "init");
    },

    ArrayExpression: function (node) {
      return node.elements;
    },

    ObjectExpression: function (node) {
      return node.properties;
    }
  }
};

_.each({
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
  if (_.isNumber(amounts)) {
    amounts = { after: amounts, before: amounts };
  }

  _.each([type].concat(t.FLIPPED_ALIAS_KEYS[type] || []), function (type) {
    _.each(amounts, function (amount, key) {
      exports[key].nodes[type] = function () {
        return amount;
      };
    });
  });
});
