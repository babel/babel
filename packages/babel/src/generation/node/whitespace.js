import isBoolean from "lodash/lang/isBoolean";
import each from "lodash/collection/each";
import map from "lodash/collection/map";
import * as t from "../../types";

/**
 * Crawl a node to test if it contains a CallExpression, a Function, or a Helper.
 *
 * @example
 * crawl(node)
 * // { hasCall: false, hasFunction: true, hasHelper: false }
 */

function crawl(node, state = {}) {
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
}

/**
 * Test if a node is or has a helper.
 */

function isHelper(node) {
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
}

/**
 * [Please add a description.]
 */

function isType(node) {
  return t.isLiteral(node) || t.isObjectExpression(node) || t.isArrayExpression(node) ||
         t.isIdentifier(node) || t.isMemberExpression(node);
}

/**
 * Tests for node types that need whitespace.
 */

exports.nodes = {

  /**
   * Test if AssignmentExpression needs whitespace.
   */

  AssignmentExpression(node) {
    var state = crawl(node.right);
    if ((state.hasCall && state.hasHelper) || state.hasFunction) {
      return {
        before: state.hasFunction,
        after: true
      };
    }
  },

  /**
   * Test if SwitchCase needs whitespace.
   */

  SwitchCase(node, parent) {
    return {
      before: node.consequent.length || parent.cases[0] === node
    };
  },

  /**
   * Test if LogicalExpression needs whitespace.
   */

  LogicalExpression(node) {
    if (t.isFunction(node.left) || t.isFunction(node.right)) {
      return {
        after: true
      };
    }
  },

  /**
   * Test if Literal needs whitespace.
   */

  Literal(node) {
    if (node.value === "use strict") {
      return {
        after: true
      };
    }
  },

  /**
   * Test if CallExpression needs whitespace.
   */

  CallExpression(node) {
    if (t.isFunction(node.callee) || isHelper(node)) {
      return {
        before: true,
        after: true
      };
    }
  },

  /**
   * Test if VariableDeclaration needs whitespace.
   */

  VariableDeclaration(node) {
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

  /**
   * Test if IfStatement needs whitespace.
   */

  IfStatement(node) {
    if (t.isBlockStatement(node.consequent)) {
      return {
        before: true,
        after: true
      };
    }
  }
};

/**
 * Test if Property or SpreadProperty needs whitespace.
 */

exports.nodes.Property =
exports.nodes.SpreadProperty = function (node, parent) {
  if (parent.properties[0] === node) {
    return {
      before: true
    };
  }
};

/**
 * Returns lists from node types that need whitespace.
 */

exports.list = {

  /**
   * Return VariableDeclaration declarations init properties.
   */

  VariableDeclaration(node) {
    return map(node.declarations, "init");
  },

  /**
   * Return VariableDeclaration elements.
   */

  ArrayExpression(node) {
    return node.elements;
  },

  /**
   * Return VariableDeclaration properties.
   */

  ObjectExpression(node) {
    return node.properties;
  }
};

/**
 * Add whitespace tests for nodes and their aliases.
 */

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
