import * as parens from "./parentheses.ts";
import { FLIPPED_ALIAS_KEYS, VISITOR_KEYS } from "@babel/types";
import type * as t from "@babel/types";

import { generatorInfosMap, generatorNamesRecord } from "../nodes.ts";

const { NewExpressionId, DecoratorId } = generatorNamesRecord;

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
}

type NodeHandler<R> = (
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

export type NodeHandlers<R> = Partial<Record<string, NodeHandler<R>>>;

function expandAliases<R>(obj: NodeHandlers<R>) {
  const map = new Map<string, NodeHandler<R>>();

  function add(type: string, func: NodeHandler<R>) {
    if (map.has(type)) {
      throw new Error(`Handler for type ${type} already exists`);
    }
    map.set(type, func);
    if (generatorInfosMap.has(type)) {
      generatorInfosMap.get(type)![2] = func;
    }
  }

  for (const type of Object.keys(obj)) {
    const aliases = FLIPPED_ALIAS_KEYS[type];
    if (aliases) {
      for (const alias of aliases) {
        add(alias, obj[type]!);
      }
    } else {
      add(type, obj[type]!);
    }
  }

  return map;
}

// Rather than using `t.is` on each object property, we pre-expand any type aliases
// into concrete types so that the 'find' call below can be as fast as possible.
export const expandedParens = expandAliases(parens);

function isOrHasCallExpression(node: t.Node): boolean {
  switch (node.type) {
    case "CallExpression":
      return true;
    case "MemberExpression":
      return isOrHasCallExpression(node.object);
  }
  return false;
}

export function parentNeedsParens(
  node: t.Node,
  parent: any,
  parentId: number,
): boolean {
  switch (parentId) {
    case NewExpressionId:
      if (parent.callee === node) {
        if (isOrHasCallExpression(node)) return true;
      }
      break;
    case DecoratorId:
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
