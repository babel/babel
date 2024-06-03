import {
  FLIPPED_ALIAS_KEYS,
  isArrayExpression,
  isAssignmentExpression,
  isBinary,
  isBlockStatement,
  isCallExpression,
  isFunction,
  isIdentifier,
  isLiteral,
  isMemberExpression,
  isObjectExpression,
  isOptionalCallExpression,
  isOptionalMemberExpression,
  isStringLiteral,
} from "@babel/types";

// We inline this package
// eslint-disable-next-line import/no-extraneous-dependencies
import * as charCodes from "charcodes";

import type { NodeHandlers } from "./index.ts";

import type * as t from "@babel/types";

const enum WhitespaceFlag {
  before = 1 << 0,
  after = 1 << 1,
}

export type { WhitespaceFlag };

function crawlInternal(
  node: t.Node,
  state: { hasCall: boolean; hasFunction: boolean; hasHelper: boolean },
) {
  if (!node) return state;

  if (isMemberExpression(node) || isOptionalMemberExpression(node)) {
    crawlInternal(node.object, state);
    if (node.computed) crawlInternal(node.property, state);
  } else if (isBinary(node) || isAssignmentExpression(node)) {
    crawlInternal(node.left, state);
    crawlInternal(node.right, state);
  } else if (isCallExpression(node) || isOptionalCallExpression(node)) {
    state.hasCall = true;
    crawlInternal(node.callee, state);
  } else if (isFunction(node)) {
    state.hasFunction = true;
  } else if (isIdentifier(node)) {
    state.hasHelper =
      // @ts-expect-error todo(flow->ts): node.callee is not really expected here…
      state.hasHelper || (node.callee && isHelper(node.callee));
  }

  return state;
}

/**
 * Crawl a node to test if it contains a CallExpression, a Function, or a Helper.
 *
 * @example
 * crawl(node)
 * // { hasCall: false, hasFunction: true, hasHelper: false }
 */

function crawl(node: t.Node) {
  return crawlInternal(node, {
    hasCall: false,
    hasFunction: false,
    hasHelper: false,
  });
}

/**
 * Test if a node is or has a helper.
 */

function isHelper(node: t.Node): boolean {
  if (!node) return false;

  if (isMemberExpression(node)) {
    return isHelper(node.object) || isHelper(node.property);
  } else if (isIdentifier(node)) {
    return (
      node.name === "require" ||
      node.name.charCodeAt(0) === charCodes.underscore
    );
  } else if (isCallExpression(node)) {
    return isHelper(node.callee);
  } else if (isBinary(node) || isAssignmentExpression(node)) {
    return (
      (isIdentifier(node.left) && isHelper(node.left)) || isHelper(node.right)
    );
  } else {
    return false;
  }
}

function isType(node: t.Node) {
  return (
    isLiteral(node) ||
    isObjectExpression(node) ||
    isArrayExpression(node) ||
    isIdentifier(node) ||
    isMemberExpression(node)
  );
}

/**
 * Tests for node types that need whitespace.
 */

export const nodes: NodeHandlers<WhitespaceFlag> = {
  /**
   * Test if AssignmentExpression needs whitespace.
   */

  AssignmentExpression(node: t.AssignmentExpression): WhitespaceFlag {
    const state = crawl(node.right);
    if ((state.hasCall && state.hasHelper) || state.hasFunction) {
      return state.hasFunction
        ? WhitespaceFlag.before | WhitespaceFlag.after
        : WhitespaceFlag.after;
    }
  },

  /**
   * Test if SwitchCase needs whitespace.
   */

  SwitchCase(node: t.SwitchCase, parent: t.SwitchStatement): WhitespaceFlag {
    return (
      (!!node.consequent.length || parent.cases[0] === node
        ? WhitespaceFlag.before
        : 0) |
      (!node.consequent.length && parent.cases[parent.cases.length - 1] === node
        ? WhitespaceFlag.after
        : 0)
    );
  },

  /**
   * Test if LogicalExpression needs whitespace.
   */

  LogicalExpression(node: t.LogicalExpression): WhitespaceFlag {
    if (isFunction(node.left) || isFunction(node.right)) {
      return WhitespaceFlag.after;
    }
  },

  /**
   * Test if Literal needs whitespace.
   */

  Literal(node: t.Literal): WhitespaceFlag {
    if (isStringLiteral(node) && node.value === "use strict") {
      return WhitespaceFlag.after;
    }
  },

  /**
   * Test if CallExpressionish needs whitespace.
   */

  CallExpression(node: t.CallExpression): WhitespaceFlag {
    if (isFunction(node.callee) || isHelper(node)) {
      return WhitespaceFlag.before | WhitespaceFlag.after;
    }
  },

  OptionalCallExpression(node: t.OptionalCallExpression): WhitespaceFlag {
    if (isFunction(node.callee)) {
      return WhitespaceFlag.before | WhitespaceFlag.after;
    }
  },

  /**
   * Test if VariableDeclaration needs whitespace.
   */

  VariableDeclaration(node: t.VariableDeclaration): WhitespaceFlag {
    for (let i = 0; i < node.declarations.length; i++) {
      const declar = node.declarations[i];

      let enabled = isHelper(declar.id) && !isType(declar.init);
      if (!enabled && declar.init) {
        const state = crawl(declar.init);
        enabled = (isHelper(declar.init) && state.hasCall) || state.hasFunction;
      }

      if (enabled) {
        return WhitespaceFlag.before | WhitespaceFlag.after;
      }
    }
  },

  /**
   * Test if IfStatement needs whitespace.
   */

  IfStatement(node: t.IfStatement): WhitespaceFlag {
    if (isBlockStatement(node.consequent)) {
      return WhitespaceFlag.before | WhitespaceFlag.after;
    }
  },
};

/**
 * Test if Property needs whitespace.
 */

nodes.ObjectProperty =
  nodes.ObjectTypeProperty =
  nodes.ObjectMethod =
    function (
      node: t.ObjectProperty | t.ObjectTypeProperty | t.ObjectMethod,
      parent: t.ObjectExpression,
    ): WhitespaceFlag {
      if (parent.properties[0] === node) {
        return WhitespaceFlag.before;
      }
    };

nodes.ObjectTypeCallProperty = function (
  node: t.ObjectTypeCallProperty,
  parent: t.ObjectTypeAnnotation,
): WhitespaceFlag {
  if (parent.callProperties[0] === node && !parent.properties?.length) {
    return WhitespaceFlag.before;
  }
};

nodes.ObjectTypeIndexer = function (
  node: t.ObjectTypeIndexer,
  parent: t.ObjectTypeAnnotation,
): WhitespaceFlag {
  if (
    parent.indexers[0] === node &&
    !parent.properties?.length &&
    !parent.callProperties?.length
  ) {
    return WhitespaceFlag.before;
  }
};

nodes.ObjectTypeInternalSlot = function (
  node: t.ObjectTypeInternalSlot,
  parent: t.ObjectTypeAnnotation,
): WhitespaceFlag {
  if (
    parent.internalSlots[0] === node &&
    !parent.properties?.length &&
    !parent.callProperties?.length &&
    !parent.indexers?.length
  ) {
    return WhitespaceFlag.before;
  }
};

/**
 * Add whitespace tests for nodes and their aliases.
 */

(
  [
    ["Function", true],
    ["Class", true],
    ["Loop", true],
    ["LabeledStatement", true],
    ["SwitchStatement", true],
    ["TryStatement", true],
  ] as const
).forEach(function ([type, amounts]) {
  [type as string]
    .concat(FLIPPED_ALIAS_KEYS[type] || [])
    .forEach(function (type) {
      const ret = amounts ? WhitespaceFlag.before | WhitespaceFlag.after : 0;
      nodes[type] = () => ret;
    });
});
