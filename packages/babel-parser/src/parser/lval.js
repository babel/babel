// @flow

import type {
  TSParameterProperty,
  Decorator,
  Expression,
  Node,
  Pattern,
  RestElement,
  SpreadElement,
} from "../types";
import type { Pos, Position } from "../util/location";
import { isStrictBindReservedWord } from "../util/identifier";
import { type BindingTypes, BIND_NONE, BIND_OUTSIDE } from "../util/scopeflags";
import { types as tt, type TokenType } from "../util/token-types";

import { next, match, eat } from "::build-tool::bindings/tokenizer";
import { state, scope, inModule } from "./index";
import { raise } from "./location";
import { unexpected, expect } from "./util";
import { startNode, startNodeAt, finishNode } from "./node";
import { hasPlugin } from "./base";
import { parseMaybeAssign, parseIdentifier, parseObj } from "./expression";
import { parseDecorator } from "./statement";

// Convert existing expression atom to assignable pattern
// if possible.

export function toAssignable(
  node: Node,
  isBinding: ?boolean,
  contextDescription: string,
): Node {
  if (node) {
    switch (node.type) {
      case "Identifier":
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
        break;

      case "ObjectExpression":
        node.type = "ObjectPattern";
        for (
          let i = 0, length = node.properties.length, last = length - 1;
          i < length;
          i++
        ) {
          const prop = node.properties[i];
          const isLast = i === last;
          toAssignableObjectExpressionProp(prop, isBinding, isLast);
        }
        break;

      case "ObjectProperty":
        toAssignable(node.value, isBinding, contextDescription);
        break;

      case "SpreadElement": {
        checkToRestConversion(node);

        node.type = "RestElement";
        const arg = node.argument;
        toAssignable(arg, isBinding, contextDescription);
        break;
      }

      case "ArrayExpression":
        node.type = "ArrayPattern";
        toAssignableList(node.elements, isBinding, contextDescription);
        break;

      case "AssignmentExpression":
        if (node.operator === "=") {
          node.type = "AssignmentPattern";
          delete node.operator;
        } else {
          raise(
            node.left.end,
            "Only '=' operator can be used for specifying default value.",
          );
        }
        break;

      case "ParenthesizedExpression":
        node.expression = toAssignable(
          node.expression,
          isBinding,
          contextDescription,
        );
        break;

      case "MemberExpression":
        if (!isBinding) break;

      default: {
        const message =
          "Invalid left-hand side" +
          (contextDescription
            ? " in " + contextDescription
            : /* istanbul ignore next */ "expression");
        raise(node.start, message);
      }
    }
  }
  return node;
}

export function toAssignableObjectExpressionProp(
  prop: Node,
  isBinding: ?boolean,
  isLast: boolean,
) {
  if (prop.type === "ObjectMethod") {
    const error =
      prop.kind === "get" || prop.kind === "set"
        ? "Object pattern can't contain getter or setter"
        : "Object pattern can't contain methods";

    raise(prop.key.start, error);
  } else if (prop.type === "SpreadElement" && !isLast) {
    raiseRestNotLast(prop.start);
  } else {
    toAssignable(prop, isBinding, "object destructuring pattern");
  }
}

// Convert list of expression atoms to binding list.

export function toAssignableList(
  exprList: Expression[],
  isBinding: ?boolean,
  contextDescription: string,
): $ReadOnlyArray<Pattern> {
  let end = exprList.length;
  if (end) {
    const last = exprList[end - 1];
    if (last && last.type === "RestElement") {
      --end;
    } else if (last && last.type === "SpreadElement") {
      last.type = "RestElement";
      const arg = last.argument;
      toAssignable(arg, isBinding, contextDescription);
      if (
        arg.type !== "Identifier" &&
        arg.type !== "MemberExpression" &&
        arg.type !== "ArrayPattern" &&
        arg.type !== "ObjectPattern"
      ) {
        unexpected(arg.start);
      }
      --end;
    }
  }
  for (let i = 0; i < end; i++) {
    const elt = exprList[i];
    if (elt) {
      toAssignable(elt, isBinding, contextDescription);
      if (elt.type === "RestElement") {
        raiseRestNotLast(elt.start);
      }
    }
  }
  return exprList;
}

// Convert list of expression atoms to a list of

export function toReferencedList(
  exprList: $ReadOnlyArray<?Expression>,
  isParenthesizedExpr?: boolean, // eslint-disable-line no-unused-vars
): $ReadOnlyArray<?Expression> {
  return exprList;
}

export function toReferencedListDeep(
  exprList: $ReadOnlyArray<?Expression>,
  isParenthesizedExpr?: boolean,
): $ReadOnlyArray<?Expression> {
  toReferencedList(exprList, isParenthesizedExpr);

  for (const expr of exprList) {
    if (expr && expr.type === "ArrayExpression") {
      toReferencedListDeep(expr.elements);
    }
  }

  return exprList;
}

// Parses spread element.

export function parseSpread(
  refShorthandDefaultPos: ?Pos,
  refNeedsArrowPos?: ?Pos,
): SpreadElement {
  const node = startNode();
  next();
  node.argument = parseMaybeAssign(
    false,
    refShorthandDefaultPos,
    undefined,
    refNeedsArrowPos,
  );

  if (state.commaAfterSpreadAt === -1 && match(tt.comma)) {
    state.commaAfterSpreadAt = state.start;
  }

  return finishNode(node, "SpreadElement");
}

export function parseRestBinding(): RestElement {
  const node = startNode();
  next();
  node.argument = parseBindingAtom();
  return finishNode(node, "RestElement");
}

// Parses lvalue (assignable) atom.
export function parseBindingAtom(): Pattern {
  switch (state.type) {
    case tt.bracketL: {
      const node = startNode();
      next();
      node.elements = parseBindingList(tt.bracketR, true);
      return finishNode(node, "ArrayPattern");
    }

    case tt.braceL:
      return parseObj(true);
  }

  return parseIdentifier();
}

export function parseBindingList(
  close: TokenType,
  allowEmpty?: boolean,
  allowModifiers?: boolean,
): $ReadOnlyArray<Pattern | TSParameterProperty> {
  const elts: Array<Pattern | TSParameterProperty> = [];
  let first = true;
  while (!eat(close)) {
    if (first) {
      first = false;
    } else {
      expect(tt.comma);
    }
    if (allowEmpty && match(tt.comma)) {
      // $FlowFixMe This method returns `$ReadOnlyArray<?Pattern>` if `allowEmpty` is set.
      elts.push(null);
    } else if (eat(close)) {
      break;
    } else if (match(tt.ellipsis)) {
      elts.push(parseAssignableListItemTypes(parseRestBinding()));
      checkCommaAfterRest();
      expect(close);
      break;
    } else {
      const decorators = [];
      if (match(tt.at) && hasPlugin("decorators")) {
        raise(
          state.start,
          "Stage 2 decorators cannot be used to decorate parameters",
        );
      }
      while (match(tt.at)) {
        decorators.push(parseDecorator());
      }
      elts.push(parseAssignableListItem(allowModifiers, decorators));
    }
  }
  return elts;
}

export function parseAssignableListItem(
  allowModifiers: ?boolean,
  decorators: Decorator[],
): Pattern | TSParameterProperty {
  const left = parseMaybeDefault();
  parseAssignableListItemTypes(left);
  const elt = parseMaybeDefault(left.start, left.loc.start, left);
  if (decorators.length) {
    left.decorators = decorators;
  }
  return elt;
}

export function parseAssignableListItemTypes(param: Pattern): Pattern {
  return param;
}

// Parses assignment pattern around given atom if possible.

export function parseMaybeDefault(
  startPos?: ?number,
  startLoc?: ?Position,
  left?: ?Pattern,
): Pattern {
  startLoc = startLoc || state.startLoc;
  startPos = startPos || state.start;
  left = left || parseBindingAtom();
  if (!eat(tt.eq)) return left;

  const node = startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = parseMaybeAssign();
  return finishNode(node, "AssignmentPattern");
}

// Verify that a node is an lval — something that can be assigned
// to.

export function checkLVal(
  expr: Expression,
  bindingType: ?BindingTypes = BIND_NONE,
  checkClashes: ?{ [key: string]: boolean },
  contextDescription: string,
): void {
  switch (expr.type) {
    case "Identifier":
      if (state.strict && isStrictBindReservedWord(expr.name, inModule)) {
        raise(
          expr.start,
          `${bindingType === BIND_NONE ? "Assigning to" : "Binding"} '${
            expr.name
          }' in strict mode`,
        );
      }

      if (checkClashes) {
        // we need to prefix this with an underscore for the cases where we have a key of
        // `__proto__`. there's a bug in old V8 where the following wouldn't work:
        //
        //   > var obj = Object.create(null);
        //   undefined
        //   > obj.__proto__
        //   null
        //   > obj.__proto__ = true;
        //   true
        //   > obj.__proto__
        //   null
        const key = `_${expr.name}`;

        if (checkClashes[key]) {
          raise(expr.start, "Argument name clash");
        } else {
          checkClashes[key] = true;
        }
      }
      if (bindingType !== BIND_NONE && bindingType !== BIND_OUTSIDE) {
        scope.declareName(expr.name, bindingType, expr.start);
      }
      break;

    case "MemberExpression":
      if (bindingType !== BIND_NONE) {
        raise(expr.start, "Binding member expression");
      }
      break;

    case "ObjectPattern":
      for (let prop of expr.properties) {
        if (prop.type === "ObjectProperty") prop = prop.value;
        checkLVal(
          prop,
          bindingType,
          checkClashes,
          "object destructuring pattern",
        );
      }
      break;

    case "ArrayPattern":
      for (const elem of expr.elements) {
        if (elem) {
          checkLVal(
            elem,
            bindingType,
            checkClashes,
            "array destructuring pattern",
          );
        }
      }
      break;

    case "AssignmentPattern":
      checkLVal(expr.left, bindingType, checkClashes, "assignment pattern");
      break;

    case "RestElement":
      checkLVal(expr.argument, bindingType, checkClashes, "rest element");
      break;

    case "ParenthesizedExpression":
      checkLVal(
        expr.expression,
        bindingType,
        checkClashes,
        "parenthesized expression",
      );
      break;

    default: {
      const message =
        (bindingType === BIND_NONE
          ? "Invalid"
          : /* istanbul ignore next */ "Binding invalid") +
        " left-hand side" +
        (contextDescription
          ? " in " + contextDescription
          : /* istanbul ignore next */ "expression");
      raise(expr.start, message);
    }
  }
}

function checkToRestConversion(node: SpreadElement): void {
  if (
    node.argument.type !== "Identifier" &&
    node.argument.type !== "MemberExpression"
  ) {
    raise(node.argument.start, "Invalid rest operator's argument");
  }
}

export function checkCommaAfterRest(): void {
  if (match(tt.comma)) {
    raiseRestNotLast(state.start);
  }
}

export function checkCommaAfterRestFromSpread(): void {
  if (state.commaAfterSpreadAt > -1) {
    raiseRestNotLast(state.commaAfterSpreadAt);
  }
}

function raiseRestNotLast(pos: number) {
  raise(pos, `Rest element must be last element`);
}
