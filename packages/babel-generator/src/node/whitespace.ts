import * as t from "@babel/types";

type WhitespaceObject = {
  before?: boolean;
  after?: boolean;
};

/**
 * Crawl a node to test if it contains a CallExpression, a Function, or a Helper.
 *
 * @example
 * crawl(node)
 * // { hasCall: false, hasFunction: true, hasHelper: false }
 */

function crawl(
  node: t.Node,
  state: { hasCall?: boolean; hasFunction?: boolean; hasHelper?: boolean } = {},
) {
  if (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) {
    crawl(node.object, state);
    if (node.computed) crawl(node.property, state);
  } else if (t.isBinary(node) || t.isAssignmentExpression(node)) {
    crawl(node.left, state);
    crawl(node.right, state);
  } else if (t.isCallExpression(node) || t.isOptionalCallExpression(node)) {
    state.hasCall = true;
    crawl(node.callee, state);
  } else if (t.isFunction(node)) {
    state.hasFunction = true;
  } else if (t.isIdentifier(node)) {
    // @ts-expect-error todo(flow->ts): node.callee is not really expected here…
    state.hasHelper = state.hasHelper || isHelper(node.callee);
  }

  return state;
}

/**
 * Test if a node is or has a helper.
 */

function isHelper(node: t.Node): boolean {
  if (t.isMemberExpression(node)) {
    return isHelper(node.object) || isHelper(node.property);
  } else if (t.isIdentifier(node)) {
    return node.name === "require" || node.name[0] === "_";
  } else if (t.isCallExpression(node)) {
    return isHelper(node.callee);
  } else if (t.isBinary(node) || t.isAssignmentExpression(node)) {
    return (
      (t.isIdentifier(node.left) && isHelper(node.left)) || isHelper(node.right)
    );
  } else {
    return false;
  }
}

function isType(node) {
  return (
    t.isLiteral(node) ||
    t.isObjectExpression(node) ||
    t.isArrayExpression(node) ||
    t.isIdentifier(node) ||
    t.isMemberExpression(node)
  );
}

/**
 * Tests for node types that need whitespace.
 */

export const nodes: {
  [K in string]?: (
    node: K extends t.Node["type"] ? Extract<t.Node, { type: K }> : t.Node,
    // todo:
    // node: K extends keyof typeof t
    //   ? Extract<typeof t[K], { type: "string" }>
    //   : t.Node,
    parent: t.Node,
  ) => void;
} = {
  /**
   * Test if AssignmentExpression needs whitespace.
   */

  AssignmentExpression(
    node: t.AssignmentExpression,
  ): WhitespaceObject | undefined | null {
    const state = crawl(node.right);
    if ((state.hasCall && state.hasHelper) || state.hasFunction) {
      return {
        before: state.hasFunction,
        after: true,
      };
    }
  },

  /**
   * Test if SwitchCase needs whitespace.
   */

  SwitchCase(node: t.SwitchCase, parent: t.SwitchStatement): WhitespaceObject {
    return {
      before: !!node.consequent.length || parent.cases[0] === node,
      after:
        !node.consequent.length &&
        parent.cases[parent.cases.length - 1] === node,
    };
  },

  /**
   * Test if LogicalExpression needs whitespace.
   */

  LogicalExpression(node: t.LogicalExpression): WhitespaceObject | undefined {
    if (t.isFunction(node.left) || t.isFunction(node.right)) {
      return {
        after: true,
      };
    }
  },

  /**
   * Test if Literal needs whitespace.
   */

  Literal(node: t.Literal): WhitespaceObject | undefined | null {
    if (t.isStringLiteral(node) && node.value === "use strict") {
      return {
        after: true,
      };
    }
  },

  /**
   * Test if CallExpressionish needs whitespace.
   */

  CallExpression(node: t.CallExpression): WhitespaceObject | undefined | null {
    if (t.isFunction(node.callee) || isHelper(node)) {
      return {
        before: true,
        after: true,
      };
    }
  },

  OptionalCallExpression(
    node: t.OptionalCallExpression,
  ): WhitespaceObject | undefined | null {
    if (t.isFunction(node.callee)) {
      return {
        before: true,
        after: true,
      };
    }
  },

  /**
   * Test if VariableDeclaration needs whitespace.
   */

  VariableDeclaration(
    node: t.VariableDeclaration,
  ): WhitespaceObject | undefined | null {
    for (let i = 0; i < node.declarations.length; i++) {
      const declar = node.declarations[i];

      let enabled = isHelper(declar.id) && !isType(declar.init);
      if (!enabled) {
        const state = crawl(declar.init);
        enabled = (isHelper(declar.init) && state.hasCall) || state.hasFunction;
      }

      if (enabled) {
        return {
          before: true,
          after: true,
        };
      }
    }
  },

  /**
   * Test if IfStatement needs whitespace.
   */

  IfStatement(node: t.IfStatement): WhitespaceObject | undefined | null {
    if (t.isBlockStatement(node.consequent)) {
      return {
        before: true,
        after: true,
      };
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
      parent: any,
    ): WhitespaceObject | undefined | null {
      if (parent.properties[0] === node) {
        return {
          before: true,
        };
      }
    };

nodes.ObjectTypeCallProperty = function (
  node: t.ObjectTypeCallProperty,
  parent: any,
): WhitespaceObject | undefined | null {
  if (parent.callProperties[0] === node && !parent.properties?.length) {
    return {
      before: true,
    };
  }
};

nodes.ObjectTypeIndexer = function (
  node: t.ObjectTypeIndexer,
  parent: any,
): WhitespaceObject | undefined | null {
  if (
    parent.indexers[0] === node &&
    !parent.properties?.length &&
    !parent.callProperties?.length
  ) {
    return {
      before: true,
    };
  }
};

nodes.ObjectTypeInternalSlot = function (
  node: t.ObjectTypeInternalSlot,
  parent: any,
): WhitespaceObject | undefined | null {
  if (
    parent.internalSlots[0] === node &&
    !parent.properties?.length &&
    !parent.callProperties?.length &&
    !parent.indexers?.length
  ) {
    return {
      before: true,
    };
  }
};

/**
 * Returns lists from node types that need whitespace.
 */

export const list = {
  /**
   * Return VariableDeclaration declarations init properties.
   */

  VariableDeclaration(node: t.VariableDeclaration) {
    return node.declarations.map(decl => decl.init);
  },

  /**
   * Return VariableDeclaration elements.
   */

  ArrayExpression(node: t.ArrayExpression) {
    return node.elements;
  },

  /**
   * Return VariableDeclaration properties.
   */

  ObjectExpression(node: t.ObjectExpression) {
    return node.properties;
  },
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
  ] as Array<[string, any]>
).forEach(function ([type, amounts]) {
  if (typeof amounts === "boolean") {
    amounts = { after: amounts, before: amounts };
  }
  [type as string]
    .concat(t.FLIPPED_ALIAS_KEYS[type] || [])
    .forEach(function (type) {
      nodes[type] = function () {
        return amounts;
      };
    });
});
