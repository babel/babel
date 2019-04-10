// @flow

import * as N from "../types";
import type { Pos, Position } from "../util/location";
import { type BindingTypes, BIND_NONE } from "../util/scopeflags";
import { types as tt, type TokenType } from "../util/token-types";

import { original } from "::build-tool::";

import {
  state,
  raise,
  startNode,
  startNodeAt,
  finishNode,
  finishNodeAt,
} from "::build-tool::bindings/parser";

function isSimpleProperty(node: N.Node): boolean {
  return (
    node != null &&
    node.type === "Property" &&
    node.kind === "init" &&
    node.method === false
  );
}

function estreeParseRegExpLiteral({ pattern, flags }: N.RegExpLiteral): N.Node {
  let regex = null;
  try {
    regex = new RegExp(pattern, flags);
  } catch (e) {
    // In environments that don't support these flags value will
    // be null as the regex can't be represented natively.
  }
  const node = estreeParseLiteral(regex);
  node.regex = { pattern, flags };

  return node;
}

function estreeParseLiteral(value: any): N.Node {
  return parseLiteral(value, "Literal");
}

function directiveToStmt(directive: N.Directive): N.ExpressionStatement {
  const directiveLiteral = directive.value;

  const stmt = startNodeAt(directive.start, directive.loc.start);
  const expression = startNodeAt(
    directiveLiteral.start,
    directiveLiteral.loc.start,
  );

  expression.value = directiveLiteral.value;
  expression.raw = directiveLiteral.extra.raw;

  stmt.expression = finishNodeAt(
    expression,
    "Literal",
    directiveLiteral.end,
    directiveLiteral.loc.end,
  );
  stmt.directive = directiveLiteral.extra.raw.slice(1, -1);

  return finishNodeAt(
    stmt,
    "ExpressionStatement",
    directive.end,
    directive.loc.end,
  );
}

// ==================================
// Overrides
// ==================================

export function initFunction(
  node: N.BodilessFunctionOrMethodBase,
  isAsync: ?boolean,
): void {
  original(initFunction)(node, isAsync);
  node.expression = false;
}

export function checkDeclaration(node: N.Pattern | N.ObjectProperty): void {
  if (isSimpleProperty(node)) {
    checkDeclaration(((node: any): N.EstreeProperty).value);
  } else {
    original(checkDeclaration)(node);
  }
}

export function checkGetterSetterParams(
  method: N.ObjectMethod | N.ClassMethod,
): void {
  const prop = ((method: any): N.EstreeProperty | N.EstreeMethodDefinition);
  const paramCount = prop.kind === "get" ? 0 : 1;
  const start = prop.start;
  if (prop.value.params.length !== paramCount) {
    if (prop.kind === "get") {
      raise(start, "getter must not have any formal parameters");
    } else {
      raise(start, "setter must have exactly one formal parameter");
    }
  }

  if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
    raise(start, "setter function argument must not be a rest parameter");
  }
}

export function checkLVal(
  expr: N.Expression,
  bindingType: ?BindingTypes = BIND_NONE,
  checkClashes: ?{ [key: string]: boolean },
  contextDescription: string,
): void {
  switch (expr.type) {
    case "ObjectPattern":
      expr.properties.forEach(prop => {
        checkLVal(
          prop.type === "Property" ? prop.value : prop,
          bindingType,
          checkClashes,
          "object destructuring pattern",
        );
      });
      break;
    default:
      original(checkLVal)(expr, bindingType, checkClashes, contextDescription);
  }
}

export function checkPropClash(
  prop: N.ObjectMember | N.SpreadElement,
  propHash: { [key: string]: boolean },
): void {
  if (
    prop.type === "SpreadElement" ||
    prop.computed ||
    prop.method ||
    // $FlowIgnore
    prop.shorthand
  ) {
    return;
  }

  const key = prop.key;
  // It is either an Identifier or a String/NumericLiteral
  const name = key.type === "Identifier" ? key.name : String(key.value);

  if (name === "__proto__" && prop.kind === "init") {
    if (propHash.proto) {
      raise(key.start, "Redefinition of __proto__ property");
    }
    propHash.proto = true;
  }
}

export function isStrictBody(node: { body: N.BlockStatement }): boolean {
  const isBlockStatement = node.body.type === "BlockStatement";

  if (isBlockStatement && node.body.body.length > 0) {
    for (const directive of node.body.body) {
      if (
        directive.type === "ExpressionStatement" &&
        directive.expression.type === "Literal"
      ) {
        if (directive.expression.value === "use strict") return true;
      } else {
        // Break for the first non literal expression
        break;
      }
    }
  }

  return false;
}

export function isValidDirective(stmt: N.Statement): boolean {
  return (
    stmt.type === "ExpressionStatement" &&
    stmt.expression.type === "Literal" &&
    typeof stmt.expression.value === "string" &&
    (!stmt.expression.extra || !stmt.expression.extra.parenthesized)
  );
}

export function stmtToDirective(stmt: N.Statement): N.Directive {
  const directive = original(stmtToDirective)(stmt);
  const value = stmt.expression.value;

  // Reset value to the actual value as in estree mode we want
  // the stmt to have the real value and not the raw value
  directive.value.value = value;

  return directive;
}

export function parseBlockBody(
  node: N.BlockStatementLike,
  allowDirectives: ?boolean,
  topLevel: boolean,
  end: TokenType,
): void {
  original(parseBlockBody)(node, allowDirectives, topLevel, end);

  const directiveStatements = node.directives.map(d => directiveToStmt(d));
  node.body = directiveStatements.concat(node.body);
  delete node.directives;
}

export function pushClassMethod(
  classBody: N.ClassBody,
  method: N.ClassMethod,
  isGenerator: boolean,
  isAsync: boolean,
  isConstructor: boolean,
  allowsDirectSuper: boolean,
): void {
  parseMethod(
    method,
    isGenerator,
    isAsync,
    isConstructor,
    allowsDirectSuper,
    "MethodDefinition",
    true,
  );
  if (method.typeParameters) {
    // $FlowIgnore
    method.value.typeParameters = method.typeParameters;
    delete method.typeParameters;
  }
  classBody.body.push(method);
}

export function parseExprAtom(refShorthandDefaultPos?: ?Pos): N.Expression {
  switch (state.type) {
    case tt.regexp:
      return estreeParseRegExpLiteral(state.value);

    case tt.num:
    case tt.string:
      return estreeParseLiteral(state.value);

    case tt._null:
      return estreeParseLiteral(null);

    case tt._true:
      return estreeParseLiteral(true);

    case tt._false:
      return estreeParseLiteral(false);

    default:
      return original(parseExprAtom)(refShorthandDefaultPos);
  }
}

export function parseLiteral<T: N.Literal>(
  value: any,
  type: /*T["kind"]*/ string,
  startPos?: number,
  startLoc?: Position,
): T {
  const node = original(parseLiteral)(value, type, startPos, startLoc);
  node.raw = node.extra.raw;
  delete node.extra;

  return node;
}

export function parseFunctionBody(
  node: N.Function,
  allowExpression: ?boolean,
  isMethod?: boolean = false,
): void {
  original(parseFunctionBody)(node, allowExpression, isMethod);
  node.expression = node.body.type !== "BlockStatement";
}

export function parseMethod<T: N.MethodLike>(
  node: T,
  isGenerator: boolean,
  isAsync: boolean,
  isConstructor: boolean,
  allowDirectSuper: boolean,
  type: string,
  inClassScope: boolean = false,
): T {
  let funcNode = startNode();
  funcNode.kind = node.kind; // provide kind, so super method correctly sets state
  funcNode = original(parseMethod)(
    funcNode,
    isGenerator,
    isAsync,
    isConstructor,
    allowDirectSuper,
    "FunctionExpression",
    inClassScope,
  );
  delete funcNode.kind;
  // $FlowIgnore
  node.value = funcNode;

  return finishNode(node, type);
}

export function parseObjectMethod(
  prop: N.ObjectMethod,
  isGenerator: boolean,
  isAsync: boolean,
  isPattern: boolean,
  containsEsc: boolean,
): ?N.ObjectMethod {
  const node: N.EstreeProperty = (original(parseObjectMethod)(
    prop,
    isGenerator,
    isAsync,
    isPattern,
    containsEsc,
  ): any);

  if (node) {
    node.type = "Property";
    if (((node: any): N.ClassMethod).kind === "method") node.kind = "init";
    node.shorthand = false;
  }

  return (node: any);
}

export function parseObjectProperty(
  prop: N.ObjectProperty,
  startPos: ?number,
  startLoc: ?Position,
  isPattern: boolean,
  refShorthandDefaultPos: ?Pos,
): ?N.ObjectProperty {
  const node: N.EstreeProperty = (original(parseObjectProperty)(
    prop,
    startPos,
    startLoc,
    isPattern,
    refShorthandDefaultPos,
  ): any);

  if (node) {
    node.kind = "init";
    node.type = "Property";
  }

  return (node: any);
}

export function toAssignable(
  node: N.Node,
  isBinding: ?boolean,
  contextDescription: string,
): N.Node {
  if (isSimpleProperty(node)) {
    toAssignable(node.value, isBinding, contextDescription);

    return node;
  }

  return original(toAssignable)(node, isBinding, contextDescription);
}

export function toAssignableObjectExpressionProp(
  prop: N.Node,
  isBinding: ?boolean,
  isLast: boolean,
) {
  if (prop.kind === "get" || prop.kind === "set") {
    raise(prop.key.start, "Object pattern can't contain getter or setter");
  } else if (prop.method) {
    raise(prop.key.start, "Object pattern can't contain methods");
  } else {
    original(toAssignableObjectExpressionProp)(prop, isBinding, isLast);
  }
}
