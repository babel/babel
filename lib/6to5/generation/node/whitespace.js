var _ = require("lodash");
var t = require("../../types");

exports.static = {
  FunctionExpression: 1,
  FunctionStatement: 1,
  ClassExpression: 1,
  ClassStatement: 1,
  ForOfStatement: 1,
  ForInStatement: 1,
  ForStatement: 1,
  SwitchStatement: 1,
  IfStatement: { before: 1 },
  CallExpression: { after: 1 },
  Literal: { after: 1 }
};

_.each(exports.static, function (amounts, type) {
  if (_.isNumber(amounts)) amounts = { after: amounts, before: amounts };
  exports.static[type] = amounts;
});

exports.before = {
  nodes: {
    Property: function (node, parent) {
      if (parent.properties[0] === node) {
        return 1;
      }
    },

    SwitchCase: function (node, parent) {
      if (parent.cases[0] === node) {
        return 1;
      }
    },

    CallExpression: function (node, parent) {
      if (t.isFunction(node.callee)) {
        return 1;
      }
    }
  }
};

exports.after = {
  list: {
    VariableDeclaration: function (node) {
      return _.map(node.declarations, "init");;
    },

    ArrayExpression: function (node) {
      return node.elements;
    },

    ObjectExpression: function (node) {
      return node.properties;
    }
  }
};
