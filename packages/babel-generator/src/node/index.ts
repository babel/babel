import * as parens from "./parentheses.ts";
import { VISITOR_KEYS } from "@babel/types";
import type * as t from "@babel/types";
import * as charCodes from "charcodes";

import { generatorInfosMap } from "../nodes.ts";

export const enum TokenContext {
  normal = 0,
  expressionStatement = 1 << 0,
  arrowBody = 1 << 1,
  exportDefault = 1 << 2,
  arrowFlowReturnType = 1 << 3,
  forInitHead = 1 << 4,
  forInHead = 1 << 5,
  forOfHead = 1 << 6,
  // This flag lives across the token boundary, and will
  // be reset after forIn or forInit head is printed
  forInOrInitHeadAccumulate = 1 << 7,
  forInOrInitHeadAccumulatePassThroughMask = 0b10000000,
  // Set while printing the binding of a `using` declaration in a for-of head
  // (see VariableDeclaration); cleared by the next printed token.
  usingForOfBinding = 1 << 8,
}

export type NodeHandler<R> = (
  node: t.Node,
  // todo:
  // node: K extends keyof typeof t
  //   ? Extract<typeof t[K], { type: "string" }>
  //   : t.Node,
  parent: t.Node,
  parentId: number,
  tokenContext?: number,
  getRawIdentifier?: (node: t.Identifier) => string,
) => R | undefined;

for (const type of Object.keys(parens) as (keyof typeof parens)[]) {
  const func = parens[type];
  if (generatorInfosMap.has(type)) {
    generatorInfosMap.get(type)![2] = func as NodeHandler<boolean>;
  }
}

// Whether the parent prints something right after the node, such as `()` in
// `node()`, `.x` in `node.x` or `!` in `node!`.
export function hasPostfixPart(node: t.Node, parent: t.Node | null): boolean {
  return (
    parent != null &&
    parens.hasPostfixPart(node, parent, generatorInfosMap.get(parent.type)![1])
  );
}

function newCalleeNeedsParens(node: t.Node): boolean {
  let current: t.Node = node;
  while (true) {
    switch (current.type) {
      case "CallExpression":
      case "ImportExpression":
      case "OptionalCallExpression":
      case "OptionalMemberExpression":
        return true;
      case "MemberExpression":
        // `(a?.b).c` and `(a?.b!).c` already wrap the object in parentheses
        if (parens.isOptionalChainOrTSWrapped(current.object)) return false;
        current = current.object;
        break;
      case "TaggedTemplateExpression":
        current = current.tag;
        break;
      case "TSInstantiationExpression":
      case "TSNonNullExpression":
        current = current.expression;
        break;
      default:
        return false;
    }
  }
}

// Whether `child` is printed in parentheses inside `parent`.
function printsParens(child: t.Node, parent: t.Node): boolean {
  const parentId = generatorInfosMap.get(parent.type)![1];
  const needsParens = generatorInfosMap.get(child.type)?.[2];
  return (
    parentNeedsParens(child, parent, parentId) ||
    (needsParens != null && !!needsParens(child, parent, parentId))
  );
}

// Whether a `<` printed right after `node` would be misparsed: after a JSX
// element it starts another JSX element (`(<a />) < b`), and after a type
// any operator starting with `<` starts type arguments (`(a as B) <= c`).
function endsBeforeLessThanAmbiguously(
  node: t.Node,
  operator: string,
): boolean {
  let current: t.Node = node;
  while (true) {
    let next: t.Node | null | undefined;
    switch (current.type) {
      case "JSXElement":
      case "JSXFragment":
        return operator === "<";
      case "TSAsExpression":
      case "TSSatisfiesExpression":
        return true;
      case "BinaryExpression":
      case "LogicalExpression":
        next = current.right;
        break;
      case "UnaryExpression":
      case "AwaitExpression":
        next = current.argument;
        break;
    }
    // A parenthesized operand ends with `)`
    if (next == null || printsParens(next, current)) return false;
    current = next;
  }
}

export function parentNeedsParens(
  node: t.Node,
  parent: any,
  parentId: number,
): boolean {
  switch (parentId) {
    case __node("BinaryExpression"):
      if (
        parent.left === node &&
        parent.operator.charCodeAt(0) === charCodes.lessThan
      ) {
        return endsBeforeLessThanAmbiguously(node, parent.operator);
      }
      break;
    case __node("NewExpression"):
      if (parent.callee === node) {
        return newCalleeNeedsParens(node);
      }
      break;
    case __node("TaggedTemplateExpression"):
      if (parent.tag === node) {
        return parens.isOptionalChainOrTSWrapped(node);
      }
      break;
    case __node("Decorator"):
      return (
        !isDecoratorMemberExpression(node) &&
        !(
          node.type === "CallExpression" &&
          isDecoratorMemberExpression(node.callee)
        ) &&
        node.type !== "ParenthesizedExpression"
      );
  }
  return false;
}

function isDecoratorMemberExpression(node: t.Node): boolean {
  switch (node.type) {
    case "Identifier":
      return true;
    case "MemberExpression":
      return (
        !node.computed &&
        node.property.type === "Identifier" &&
        isDecoratorMemberExpression(node.object)
      );
    default:
      return false;
  }
}

export function isLastChild(parent: t.Node, child: t.Node) {
  const visitorKeys = VISITOR_KEYS[parent.type];
  for (let i = visitorKeys.length - 1; i >= 0; i--) {
    const val = (parent as any)[visitorKeys[i]] as t.Node | t.Node[] | null;
    if (val === child) {
      return true;
    } else if (Array.isArray(val)) {
      let j = val.length - 1;
      while (j >= 0 && val[j] === null) j--;
      return j >= 0 && val[j] === child;
    } else if (val) {
      return false;
    }
  }
  return false;
}
