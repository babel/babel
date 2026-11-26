import * as parens from "./parentheses.ts";
import { VISITOR_KEYS, isExpression, isFlowType, isTSType } from "@babel/types";
import type * as t from "@babel/types";
// We inline this package
// eslint-disable-next-line import/no-extraneous-dependencies
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
  // Set while printing a class heritage and the leading `new`s of its
  // expression; cleared by the next printed token.
  classHeritage = 1 << 9,
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
    generatorInfosMap.get(type)![2] = func;
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
        current = current.object;
        if (isWrappedOptionalChain(current)) return false;
        break;
      case "TaggedTemplateExpression":
        current = current.tag;
        if (isWrappedOptionalChain(current)) return false;
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

// Whether `node` is an optional chain, possibly wrapped in `!` or type
// arguments. When such a node is followed by a non-optional call, member access
// or template, it must be parenthesized so that the chain ends before them:
// `(a?.b!).c` is not the same as `a?.b!.c`.
function isWrappedOptionalChain(node: t.Node): boolean {
  let current: t.Node = node;
  while (true) {
    switch (current.type) {
      case "OptionalCallExpression":
      case "OptionalMemberExpression":
        return true;
      case "TSInstantiationExpression":
        // Inside `!`, it is already wrapped in its own parentheses: `(a?.b<c>)!`
        if (current !== node) return false;
        current = current.expression;
        break;
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

// Whether `operator` printed right after an expression ending with type
// arguments would be misparsed: `f<T> > x` and `f<T> >> x` are not valid
// instantiation expressions, `+`, `-` and `%` can start an expression so
// `f<T> + x` is parsed as `(f < T) > +x`, and with JSX any operator starting
// with `<` after `>` starts a JSX element.
function isAmbiguousAfterTypeArguments(operator: string): boolean {
  switch (operator) {
    case "<":
    case "<=":
    case "<<":
    case ">":
    case ">>":
    case ">>>":
    case "+":
    case "-":
    case "%":
      return true;
  }
  return false;
}

// Whether `operator` printed right after `node` would be misparsed: after a JSX
// element `<` starts another JSX element (`(<a />) < b`), after a type any
// operator starting with `<` starts type arguments (`(a as B) <= c`), and after
// an instantiation expression see isAmbiguousAfterTypeArguments.
function endsBeforeOperatorAmbiguously(
  node: t.Node,
  operator: string,
): boolean {
  // All the ambiguous operators are ambiguous after type arguments
  if (!isAmbiguousAfterTypeArguments(operator)) return false;
  let parent: t.Node | null = null;
  let current: t.Node = node;
  while (true) {
    let next: t.Node | undefined;
    let result = false;
    switch (current.type) {
      case "JSXElement":
      case "JSXFragment":
        result = operator === "<";
        break;
      case "TSAsExpression":
      case "TSSatisfiesExpression":
        result = operator.charCodeAt(0) === charCodes.lessThan;
        break;
      case "TSInstantiationExpression":
        result = true;
        break;
      case "BinaryExpression":
      case "LogicalExpression":
        next = current.right;
        break;
      case "UnaryExpression":
      case "AwaitExpression":
        next = current.argument;
        break;
      case "TSTypeAssertion":
        next = current.expression;
        break;
      default:
        return false;
    }
    // A parenthesized operand ends with `)`
    if (parent !== null && printsParens(current, parent)) return false;
    if (next === undefined) return result;
    parent = current;
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
      if (parent.left === node) {
        return endsBeforeOperatorAmbiguously(node, parent.operator);
      }
      break;
    case __node("NewExpression"):
      if (parent.callee === node) {
        return newCalleeNeedsParens(node);
      }
      break;
    case __node("TaggedTemplateExpression"):
      if (parent.tag === node) {
        return isWrappedOptionalChain(node);
      }
      break;
    case __node("CallExpression"):
      if (parent.callee === node) {
        return isWrappedOptionalChain(node);
      }
      break;
    case __node("MemberExpression"):
      if (parent.object === node) {
        return isWrappedOptionalChain(node);
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

// Whether wrapping `node` in parentheses keeps the code valid, which is not
// the case for nodes that are neither expressions nor types, such as a class
// body or a Flow predicate
export function canBeParenthesized(node: t.Node): boolean {
  return isExpression(node) || isTSType(node) || isFlowType(node);
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
