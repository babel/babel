import { NodePath } from "../../lib/index.js";

import * as t from "@babel/types";

describe("NodePath", () => {
  describe("setData/getData", () => {
    it("can set default value", () => {
      const path = new NodePath({}, {});

      expect(path.getData("foo", "test")).toBe("test");
    });
    it("can set false", () => {
      const path = new NodePath({}, {});
      path.setData("foo", false);

      expect(path.getData("foo", true)).toBe(false);
    });

    it("can set true", () => {
      const path = new NodePath({}, {});
      path.setData("foo", true);

      expect(path.getData("foo", false)).toBe(true);
    });

    it("can set null", () => {
      const path = new NodePath({}, {});
      path.setData("foo", null);

      expect(path.getData("foo", true)).toBe(null);
    });

    it("can use false as default", () => {
      const path = new NodePath({}, {});

      expect(path.getData("foo", false)).toBe(false);
    });

    it("does not use object base properties", () => {
      const path = new NodePath({}, {});

      expect(path.getData("__proto__", "test")).toBe("test");
    });

    it("can use symbols as keys", () => {
      const path = new NodePath({}, {});
      const symbol = Symbol("foo");
      path.setData(symbol, 42);

      expect(path.getData(symbol)).toBe(42);
    });

    describe("hasNode", () => {
      it("returns false if node is null", () => {
        const path = new NodePath({}, {});

        expect(path.hasNode()).toBe(false);
      });

      it("returns true if node is not null", () => {
        const path = new NodePath({}, {});
        path.node = {};

        expect(path.hasNode()).toBe(true);
      });
    });

    function isAndAssertFilter(key) {
      return !(
        (key.startsWith("assert") || key.startsWith("is")) &&
        (t[key] ||
          key.endsWith("TSClassImplements") ||
          key.endsWith("TSInterfaceHeritage"))
      );
    }

    it("methods babel 8", () => {
      const path = new NodePath({}, {});
      const keys = Object.keys(Object.getPrototypeOf(path))
        .sort()
        .filter(isAndAssertFilter);

      expect(keys).toMatchInlineSnapshot(`
        Array [
          "_guessExecutionStatusRelativeTo",
          "addComment",
          "addComments",
          "arrowFunctionToExpression",
          "baseTypeStrictlyMatches",
          "canHaveVariableDeclarationOrExpression",
          "canSwapBetweenExpressionAndStatement",
          "couldBeBaseType",
          "ensureBlock",
          "ensureFunctionName",
          "evaluate",
          "evaluateTruthy",
          "find",
          "findParent",
          "get",
          "getAllNextSiblings",
          "getAllPrevSiblings",
          "getAncestry",
          "getAssignmentIdentifiers",
          "getBindingIdentifierPaths",
          "getBindingIdentifiers",
          "getCompletionRecords",
          "getDeepestCommonAncestorFrom",
          "getEarliestCommonAncestorFrom",
          "getFunctionParent",
          "getNextSibling",
          "getOpposite",
          "getOuterBindingIdentifierPaths",
          "getOuterBindingIdentifiers",
          "getPrevSibling",
          "getSibling",
          "getSource",
          "getStatementParent",
          "getTypeAnnotation",
          "inType",
          "insertAfter",
          "insertBefore",
          "isAncestor",
          "isBaseType",
          "isBindingIdentifier",
          "isCompletionRecord",
          "isConstantExpression",
          "isDenylisted",
          "isDescendant",
          "isForAwaitStatement",
          "isGenerated",
          "isGenericType",
          "isInStrictMode",
          "isNodeType",
          "isPure",
          "isReferencedIdentifier",
          "isReferencedMemberExpression",
          "isStatementOrBlock",
          "isStatic",
          "isUser",
          "matchesPattern",
          "pushContainer",
          "referencesImport",
          "remove",
          "replaceExpressionWithStatements",
          "replaceInline",
          "replaceWith",
          "replaceWithMultiple",
          "replaceWithSourceString",
          "requeue",
          "requeueComputedKeyAndDecorators",
          "resolve",
          "setContext",
          "shareCommentsWithSiblings",
          "skip",
          "skipKey",
          "splitExportDeclaration",
          "stop",
          "toComputedKey",
          "unshiftContainer",
          "unwrapFunctionEnvironment",
          "visit",
          "willIMaybeExecuteBefore",
        ]
      `);
    });
  });
});
