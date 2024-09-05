/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import * as _validate from "../../validators/validate.ts";
import type * as t from "../../index.ts";
import deprecationWarning from "../../utils/deprecationWarning.ts";
import {
  BUILDER_KEYS,
  NODE_FIELDS,
  type FieldOptions,
} from "../../definitions/utils.ts";

const { validateInternal: validate } = _validate;

const _data: FieldOptions[][] = [];
Object.keys(BUILDER_KEYS).forEach(type => {
  const fields = NODE_FIELDS[type];

  _data.push(
    sortFieldNames(Object.keys(fields), type).map(field => fields[field]),
  );
});

function sortFieldNames(fields: string[], type: string) {
  return fields.sort((fieldA, fieldB) => {
    const indexA = BUILDER_KEYS[type].indexOf(fieldA);
    const indexB = BUILDER_KEYS[type].indexOf(fieldB);
    if (indexA === indexB) return fieldA < fieldB ? -1 : 1;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}

export function arrayExpression(
  elements: Array<null | t.Expression | t.SpreadElement> = [],
): t.ArrayExpression {
  const node: t.ArrayExpression = {
    type: "ArrayExpression",
    elements,
  };
  validate(_data[0][0], node, "elements", elements, true);
  return node;
}
export function assignmentExpression(
  operator: string,
  left: t.LVal | t.OptionalMemberExpression,
  right: t.Expression,
): t.AssignmentExpression {
  const node: t.AssignmentExpression = {
    type: "AssignmentExpression",
    operator,
    left,
    right,
  };
  validate(_data[1][0], node, "operator", operator);
  validate(_data[1][1], node, "left", left, true);
  validate(_data[1][2], node, "right", right, true);
  return node;
}
export function binaryExpression(
  operator:
    | "+"
    | "-"
    | "/"
    | "%"
    | "*"
    | "**"
    | "&"
    | "|"
    | ">>"
    | ">>>"
    | "<<"
    | "^"
    | "=="
    | "==="
    | "!="
    | "!=="
    | "in"
    | "instanceof"
    | ">"
    | "<"
    | ">="
    | "<="
    | "|>",
  left: t.Expression | t.PrivateName,
  right: t.Expression,
): t.BinaryExpression {
  const node: t.BinaryExpression = {
    type: "BinaryExpression",
    operator,
    left,
    right,
  };
  validate(_data[2][0], node, "operator", operator);
  validate(_data[2][1], node, "left", left, true);
  validate(_data[2][2], node, "right", right, true);
  return node;
}
export function interpreterDirective(value: string): t.InterpreterDirective {
  const node: t.InterpreterDirective = {
    type: "InterpreterDirective",
    value,
  };
  validate(_data[3][0], node, "value", value);
  return node;
}
export function directive(value: t.DirectiveLiteral): t.Directive {
  const node: t.Directive = {
    type: "Directive",
    value,
  };
  validate(_data[4][0], node, "value", value, true);
  return node;
}
export function directiveLiteral(value: string): t.DirectiveLiteral {
  const node: t.DirectiveLiteral = {
    type: "DirectiveLiteral",
    value,
  };
  validate(_data[5][0], node, "value", value);
  return node;
}
export function blockStatement(
  body: Array<t.Statement>,
  directives: Array<t.Directive> = [],
): t.BlockStatement {
  const node: t.BlockStatement = {
    type: "BlockStatement",
    body,
    directives,
  };
  validate(_data[6][0], node, "body", body, true);
  validate(_data[6][1], node, "directives", directives, true);
  return node;
}
export function breakStatement(
  label: t.Identifier | null = null,
): t.BreakStatement {
  const node: t.BreakStatement = {
    type: "BreakStatement",
    label,
  };
  validate(_data[7][0], node, "label", label, true);
  return node;
}
export function callExpression(
  callee: t.Expression | t.Super | t.V8IntrinsicIdentifier,
  _arguments: Array<t.Expression | t.SpreadElement | t.ArgumentPlaceholder>,
): t.CallExpression {
  const node: t.CallExpression = {
    type: "CallExpression",
    callee,
    arguments: _arguments,
  };
  validate(_data[8][0], node, "callee", callee, true);
  validate(_data[8][1], node, "arguments", _arguments, true);
  return node;
}
export function catchClause(
  param:
    | t.Identifier
    | t.ArrayPattern
    | t.ObjectPattern
    | null
    | undefined = null,
  body: t.BlockStatement,
): t.CatchClause {
  const node: t.CatchClause = {
    type: "CatchClause",
    param,
    body,
  };
  validate(_data[9][0], node, "param", param, true);
  validate(_data[9][1], node, "body", body, true);
  return node;
}
export function conditionalExpression(
  test: t.Expression,
  consequent: t.Expression,
  alternate: t.Expression,
): t.ConditionalExpression {
  const node: t.ConditionalExpression = {
    type: "ConditionalExpression",
    test,
    consequent,
    alternate,
  };
  validate(_data[10][0], node, "test", test, true);
  validate(_data[10][1], node, "consequent", consequent, true);
  validate(_data[10][2], node, "alternate", alternate, true);
  return node;
}
export function continueStatement(
  label: t.Identifier | null = null,
): t.ContinueStatement {
  const node: t.ContinueStatement = {
    type: "ContinueStatement",
    label,
  };
  validate(_data[11][0], node, "label", label, true);
  return node;
}
export function debuggerStatement(): t.DebuggerStatement {
  return {
    type: "DebuggerStatement",
  };
}
export function doWhileStatement(
  test: t.Expression,
  body: t.Statement,
): t.DoWhileStatement {
  const node: t.DoWhileStatement = {
    type: "DoWhileStatement",
    test,
    body,
  };
  validate(_data[13][0], node, "test", test, true);
  validate(_data[13][1], node, "body", body, true);
  return node;
}
export function emptyStatement(): t.EmptyStatement {
  return {
    type: "EmptyStatement",
  };
}
export function expressionStatement(
  expression: t.Expression,
): t.ExpressionStatement {
  const node: t.ExpressionStatement = {
    type: "ExpressionStatement",
    expression,
  };
  validate(_data[15][0], node, "expression", expression, true);
  return node;
}
export function file(
  program: t.Program,
  comments: Array<t.CommentBlock | t.CommentLine> | null = null,
  tokens: Array<any> | null = null,
): t.File {
  const node: t.File = {
    type: "File",
    program,
    comments,
    tokens,
  };
  validate(_data[16][0], node, "program", program, true);
  validate(_data[16][1], node, "comments", comments, true);
  validate(_data[16][2], node, "tokens", tokens);
  return node;
}
export function forInStatement(
  left: t.VariableDeclaration | t.LVal,
  right: t.Expression,
  body: t.Statement,
): t.ForInStatement {
  const node: t.ForInStatement = {
    type: "ForInStatement",
    left,
    right,
    body,
  };
  validate(_data[17][0], node, "left", left, true);
  validate(_data[17][1], node, "right", right, true);
  validate(_data[17][2], node, "body", body, true);
  return node;
}
export function forStatement(
  init: t.VariableDeclaration | t.Expression | null | undefined = null,
  test: t.Expression | null | undefined = null,
  update: t.Expression | null | undefined = null,
  body: t.Statement,
): t.ForStatement {
  const node: t.ForStatement = {
    type: "ForStatement",
    init,
    test,
    update,
    body,
  };
  validate(_data[18][0], node, "init", init, true);
  validate(_data[18][1], node, "test", test, true);
  validate(_data[18][2], node, "update", update, true);
  validate(_data[18][3], node, "body", body, true);
  return node;
}
export function functionDeclaration(
  id: t.Identifier | null | undefined = null,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement,
  generator: boolean = false,
  async: boolean = false,
): t.FunctionDeclaration {
  const node: t.FunctionDeclaration = {
    type: "FunctionDeclaration",
    id,
    params,
    body,
    generator,
    async,
  };
  validate(_data[19][0], node, "id", id, true);
  validate(_data[19][1], node, "params", params, true);
  validate(_data[19][2], node, "body", body, true);
  validate(_data[19][3], node, "generator", generator);
  validate(_data[19][4], node, "async", async);
  return node;
}
export function functionExpression(
  id: t.Identifier | null | undefined = null,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement,
  generator: boolean = false,
  async: boolean = false,
): t.FunctionExpression {
  const node: t.FunctionExpression = {
    type: "FunctionExpression",
    id,
    params,
    body,
    generator,
    async,
  };
  validate(_data[20][0], node, "id", id, true);
  validate(_data[20][1], node, "params", params, true);
  validate(_data[20][2], node, "body", body, true);
  validate(_data[20][3], node, "generator", generator);
  validate(_data[20][4], node, "async", async);
  return node;
}
export function identifier(name: string): t.Identifier {
  const node: t.Identifier = {
    type: "Identifier",
    name,
  };
  validate(_data[21][0], node, "name", name);
  return node;
}
export function ifStatement(
  test: t.Expression,
  consequent: t.Statement,
  alternate: t.Statement | null = null,
): t.IfStatement {
  const node: t.IfStatement = {
    type: "IfStatement",
    test,
    consequent,
    alternate,
  };
  validate(_data[22][0], node, "test", test, true);
  validate(_data[22][1], node, "consequent", consequent, true);
  validate(_data[22][2], node, "alternate", alternate, true);
  return node;
}
export function labeledStatement(
  label: t.Identifier,
  body: t.Statement,
): t.LabeledStatement {
  const node: t.LabeledStatement = {
    type: "LabeledStatement",
    label,
    body,
  };
  validate(_data[23][0], node, "label", label, true);
  validate(_data[23][1], node, "body", body, true);
  return node;
}
export function stringLiteral(value: string): t.StringLiteral {
  const node: t.StringLiteral = {
    type: "StringLiteral",
    value,
  };
  validate(_data[24][0], node, "value", value);
  return node;
}
export function numericLiteral(value: number): t.NumericLiteral {
  const node: t.NumericLiteral = {
    type: "NumericLiteral",
    value,
  };
  validate(_data[25][0], node, "value", value);
  return node;
}
export function nullLiteral(): t.NullLiteral {
  return {
    type: "NullLiteral",
  };
}
export function booleanLiteral(value: boolean): t.BooleanLiteral {
  const node: t.BooleanLiteral = {
    type: "BooleanLiteral",
    value,
  };
  validate(_data[27][0], node, "value", value);
  return node;
}
export function regExpLiteral(
  pattern: string,
  flags: string = "",
): t.RegExpLiteral {
  const node: t.RegExpLiteral = {
    type: "RegExpLiteral",
    pattern,
    flags,
  };
  validate(_data[28][0], node, "pattern", pattern);
  validate(_data[28][1], node, "flags", flags);
  return node;
}
export function logicalExpression(
  operator: "||" | "&&" | "??",
  left: t.Expression,
  right: t.Expression,
): t.LogicalExpression {
  const node: t.LogicalExpression = {
    type: "LogicalExpression",
    operator,
    left,
    right,
  };
  validate(_data[29][0], node, "operator", operator);
  validate(_data[29][1], node, "left", left, true);
  validate(_data[29][2], node, "right", right, true);
  return node;
}
export function memberExpression(
  object: t.Expression | t.Super,
  property: t.Expression | t.Identifier | t.PrivateName,
  computed: boolean = false,
  optional: boolean | null = null,
): t.MemberExpression {
  const node: t.MemberExpression = {
    type: "MemberExpression",
    object,
    property,
    computed,
    optional,
  };
  validate(_data[30][0], node, "object", object, true);
  validate(_data[30][1], node, "property", property, true);
  validate(_data[30][2], node, "computed", computed);
  validate(_data[30][3], node, "optional", optional);
  return node;
}
export function newExpression(
  callee: t.Expression | t.Super | t.V8IntrinsicIdentifier,
  _arguments: Array<t.Expression | t.SpreadElement | t.ArgumentPlaceholder>,
): t.NewExpression {
  const node: t.NewExpression = {
    type: "NewExpression",
    callee,
    arguments: _arguments,
  };
  validate(_data[31][0], node, "callee", callee, true);
  validate(_data[31][1], node, "arguments", _arguments, true);
  return node;
}
export function program(
  body: Array<t.Statement>,
  directives: Array<t.Directive> = [],
  sourceType: "script" | "module" = "script",
  interpreter: t.InterpreterDirective | null = null,
): t.Program {
  const node: t.Program = {
    type: "Program",
    body,
    directives,
    sourceType,
    interpreter,
  };
  validate(_data[32][0], node, "body", body, true);
  validate(_data[32][1], node, "directives", directives, true);
  validate(_data[32][2], node, "sourceType", sourceType);
  validate(_data[32][3], node, "interpreter", interpreter, true);
  return node;
}
export function objectExpression(
  properties: Array<t.ObjectMethod | t.ObjectProperty | t.SpreadElement>,
): t.ObjectExpression {
  const node: t.ObjectExpression = {
    type: "ObjectExpression",
    properties,
  };
  validate(_data[33][0], node, "properties", properties, true);
  return node;
}
export function objectMethod(
  kind: "method" | "get" | "set" | undefined = "method",
  key:
    | t.Expression
    | t.Identifier
    | t.StringLiteral
    | t.NumericLiteral
    | t.BigIntLiteral,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement,
  computed: boolean = false,
  generator: boolean = false,
  async: boolean = false,
): t.ObjectMethod {
  const node: t.ObjectMethod = {
    type: "ObjectMethod",
    kind,
    key,
    params,
    body,
    computed,
    generator,
    async,
  };
  validate(_data[34][0], node, "kind", kind);
  validate(_data[34][1], node, "key", key, true);
  validate(_data[34][2], node, "params", params, true);
  validate(_data[34][3], node, "body", body, true);
  validate(_data[34][4], node, "computed", computed);
  validate(_data[34][5], node, "generator", generator);
  validate(_data[34][6], node, "async", async);
  return node;
}
export function objectProperty(
  key:
    | t.Expression
    | t.Identifier
    | t.StringLiteral
    | t.NumericLiteral
    | t.BigIntLiteral
    | t.DecimalLiteral
    | t.PrivateName,
  value: t.Expression | t.PatternLike,
  computed: boolean = false,
  shorthand: boolean = false,
  decorators: Array<t.Decorator> | null = null,
): t.ObjectProperty {
  const node: t.ObjectProperty = {
    type: "ObjectProperty",
    key,
    value,
    computed,
    shorthand,
    decorators,
  };
  validate(_data[35][0], node, "key", key, true);
  validate(_data[35][1], node, "value", value, true);
  validate(_data[35][2], node, "computed", computed);
  validate(_data[35][3], node, "shorthand", shorthand);
  validate(_data[35][4], node, "decorators", decorators, true);
  return node;
}
export function restElement(argument: t.LVal): t.RestElement {
  const node: t.RestElement = {
    type: "RestElement",
    argument,
  };
  validate(_data[36][0], node, "argument", argument, true);
  return node;
}
export function returnStatement(
  argument: t.Expression | null = null,
): t.ReturnStatement {
  const node: t.ReturnStatement = {
    type: "ReturnStatement",
    argument,
  };
  validate(_data[37][0], node, "argument", argument, true);
  return node;
}
export function sequenceExpression(
  expressions: Array<t.Expression>,
): t.SequenceExpression {
  const node: t.SequenceExpression = {
    type: "SequenceExpression",
    expressions,
  };
  validate(_data[38][0], node, "expressions", expressions, true);
  return node;
}
export function parenthesizedExpression(
  expression: t.Expression,
): t.ParenthesizedExpression {
  const node: t.ParenthesizedExpression = {
    type: "ParenthesizedExpression",
    expression,
  };
  validate(_data[39][0], node, "expression", expression, true);
  return node;
}
export function switchCase(
  test: t.Expression | null | undefined = null,
  consequent: Array<t.Statement>,
): t.SwitchCase {
  const node: t.SwitchCase = {
    type: "SwitchCase",
    test,
    consequent,
  };
  validate(_data[40][0], node, "test", test, true);
  validate(_data[40][1], node, "consequent", consequent, true);
  return node;
}
export function switchStatement(
  discriminant: t.Expression,
  cases: Array<t.SwitchCase>,
): t.SwitchStatement {
  const node: t.SwitchStatement = {
    type: "SwitchStatement",
    discriminant,
    cases,
  };
  validate(_data[41][0], node, "discriminant", discriminant, true);
  validate(_data[41][1], node, "cases", cases, true);
  return node;
}
export function thisExpression(): t.ThisExpression {
  return {
    type: "ThisExpression",
  };
}
export function throwStatement(argument: t.Expression): t.ThrowStatement {
  const node: t.ThrowStatement = {
    type: "ThrowStatement",
    argument,
  };
  validate(_data[43][0], node, "argument", argument, true);
  return node;
}
export function tryStatement(
  block: t.BlockStatement,
  handler: t.CatchClause | null = null,
  finalizer: t.BlockStatement | null = null,
): t.TryStatement {
  const node: t.TryStatement = {
    type: "TryStatement",
    block,
    handler,
    finalizer,
  };
  validate(_data[44][0], node, "block", block, true);
  validate(_data[44][1], node, "handler", handler, true);
  validate(_data[44][2], node, "finalizer", finalizer, true);
  return node;
}
export function unaryExpression(
  operator: "void" | "throw" | "delete" | "!" | "+" | "-" | "~" | "typeof",
  argument: t.Expression,
  prefix: boolean = true,
): t.UnaryExpression {
  const node: t.UnaryExpression = {
    type: "UnaryExpression",
    operator,
    argument,
    prefix,
  };
  validate(_data[45][0], node, "operator", operator);
  validate(_data[45][1], node, "argument", argument, true);
  validate(_data[45][2], node, "prefix", prefix);
  return node;
}
export function updateExpression(
  operator: "++" | "--",
  argument: t.Expression,
  prefix: boolean = false,
): t.UpdateExpression {
  const node: t.UpdateExpression = {
    type: "UpdateExpression",
    operator,
    argument,
    prefix,
  };
  validate(_data[46][0], node, "operator", operator);
  validate(_data[46][1], node, "argument", argument, true);
  validate(_data[46][2], node, "prefix", prefix);
  return node;
}
export function variableDeclaration(
  kind: "var" | "let" | "const" | "using" | "await using",
  declarations: Array<t.VariableDeclarator>,
): t.VariableDeclaration {
  const node: t.VariableDeclaration = {
    type: "VariableDeclaration",
    kind,
    declarations,
  };
  validate(_data[47][0], node, "kind", kind);
  validate(_data[47][1], node, "declarations", declarations, true);
  return node;
}
export function variableDeclarator(
  id: t.LVal,
  init: t.Expression | null = null,
): t.VariableDeclarator {
  const node: t.VariableDeclarator = {
    type: "VariableDeclarator",
    id,
    init,
  };
  validate(_data[48][0], node, "id", id, true);
  validate(_data[48][1], node, "init", init, true);
  return node;
}
export function whileStatement(
  test: t.Expression,
  body: t.Statement,
): t.WhileStatement {
  const node: t.WhileStatement = {
    type: "WhileStatement",
    test,
    body,
  };
  validate(_data[49][0], node, "test", test, true);
  validate(_data[49][1], node, "body", body, true);
  return node;
}
export function withStatement(
  object: t.Expression,
  body: t.Statement,
): t.WithStatement {
  const node: t.WithStatement = {
    type: "WithStatement",
    object,
    body,
  };
  validate(_data[50][0], node, "object", object, true);
  validate(_data[50][1], node, "body", body, true);
  return node;
}
export function assignmentPattern(
  left:
    | t.Identifier
    | t.ObjectPattern
    | t.ArrayPattern
    | t.MemberExpression
    | t.TSAsExpression
    | t.TSSatisfiesExpression
    | t.TSTypeAssertion
    | t.TSNonNullExpression,
  right: t.Expression,
): t.AssignmentPattern {
  const node: t.AssignmentPattern = {
    type: "AssignmentPattern",
    left,
    right,
  };
  validate(_data[51][0], node, "left", left, true);
  validate(_data[51][1], node, "right", right, true);
  return node;
}
export function arrayPattern(
  elements: Array<null | t.PatternLike | t.LVal>,
): t.ArrayPattern {
  const node: t.ArrayPattern = {
    type: "ArrayPattern",
    elements,
  };
  validate(_data[52][0], node, "elements", elements, true);
  return node;
}
export function arrowFunctionExpression(
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  body: t.BlockStatement | t.Expression,
  async: boolean = false,
): t.ArrowFunctionExpression {
  const node: t.ArrowFunctionExpression = {
    type: "ArrowFunctionExpression",
    params,
    body,
    async,
    expression: null,
  };
  validate(_data[53][0], node, "params", params, true);
  validate(_data[53][1], node, "body", body, true);
  validate(_data[53][2], node, "async", async);
  return node;
}
export function classBody(
  body: Array<
    | t.ClassMethod
    | t.ClassPrivateMethod
    | t.ClassProperty
    | t.ClassPrivateProperty
    | t.ClassAccessorProperty
    | t.TSDeclareMethod
    | t.TSIndexSignature
    | t.StaticBlock
  >,
): t.ClassBody {
  const node: t.ClassBody = {
    type: "ClassBody",
    body,
  };
  validate(_data[54][0], node, "body", body, true);
  return node;
}
export function classExpression(
  id: t.Identifier | null | undefined = null,
  superClass: t.Expression | null | undefined = null,
  body: t.ClassBody,
  decorators: Array<t.Decorator> | null = null,
): t.ClassExpression {
  const node: t.ClassExpression = {
    type: "ClassExpression",
    id,
    superClass,
    body,
    decorators,
  };
  validate(_data[55][0], node, "id", id, true);
  validate(_data[55][1], node, "superClass", superClass, true);
  validate(_data[55][2], node, "body", body, true);
  validate(_data[55][3], node, "decorators", decorators, true);
  return node;
}
export function classDeclaration(
  id: t.Identifier | null | undefined = null,
  superClass: t.Expression | null | undefined = null,
  body: t.ClassBody,
  decorators: Array<t.Decorator> | null = null,
): t.ClassDeclaration {
  const node: t.ClassDeclaration = {
    type: "ClassDeclaration",
    id,
    superClass,
    body,
    decorators,
  };
  validate(_data[56][0], node, "id", id, true);
  validate(_data[56][1], node, "superClass", superClass, true);
  validate(_data[56][2], node, "body", body, true);
  validate(_data[56][3], node, "decorators", decorators, true);
  return node;
}
export function exportAllDeclaration(
  source: t.StringLiteral,
): t.ExportAllDeclaration {
  const node: t.ExportAllDeclaration = {
    type: "ExportAllDeclaration",
    source,
  };
  validate(_data[57][0], node, "source", source, true);
  return node;
}
export function exportDefaultDeclaration(
  declaration:
    | t.TSDeclareFunction
    | t.FunctionDeclaration
    | t.ClassDeclaration
    | t.Expression,
): t.ExportDefaultDeclaration {
  const node: t.ExportDefaultDeclaration = {
    type: "ExportDefaultDeclaration",
    declaration,
  };
  validate(_data[58][0], node, "declaration", declaration, true);
  return node;
}
export function exportNamedDeclaration(
  declaration: t.Declaration | null = null,
  specifiers: Array<
    t.ExportSpecifier | t.ExportDefaultSpecifier | t.ExportNamespaceSpecifier
  > = [],
  source: t.StringLiteral | null = null,
): t.ExportNamedDeclaration {
  const node: t.ExportNamedDeclaration = {
    type: "ExportNamedDeclaration",
    declaration,
    specifiers,
    source,
  };
  validate(_data[59][0], node, "declaration", declaration, true);
  validate(_data[59][1], node, "specifiers", specifiers, true);
  validate(_data[59][2], node, "source", source, true);
  return node;
}
export function exportSpecifier(
  local: t.Identifier,
  exported: t.Identifier | t.StringLiteral,
): t.ExportSpecifier {
  const node: t.ExportSpecifier = {
    type: "ExportSpecifier",
    local,
    exported,
  };
  validate(_data[60][0], node, "local", local, true);
  validate(_data[60][1], node, "exported", exported, true);
  return node;
}
export function forOfStatement(
  left: t.VariableDeclaration | t.LVal,
  right: t.Expression,
  body: t.Statement,
  _await: boolean = false,
): t.ForOfStatement {
  const node: t.ForOfStatement = {
    type: "ForOfStatement",
    left,
    right,
    body,
    await: _await,
  };
  validate(_data[61][0], node, "left", left, true);
  validate(_data[61][1], node, "right", right, true);
  validate(_data[61][2], node, "body", body, true);
  validate(_data[61][3], node, "await", _await);
  return node;
}
export function importDeclaration(
  specifiers: Array<
    t.ImportSpecifier | t.ImportDefaultSpecifier | t.ImportNamespaceSpecifier
  >,
  source: t.StringLiteral,
): t.ImportDeclaration {
  const node: t.ImportDeclaration = {
    type: "ImportDeclaration",
    specifiers,
    source,
  };
  validate(_data[62][0], node, "specifiers", specifiers, true);
  validate(_data[62][1], node, "source", source, true);
  return node;
}
export function importDefaultSpecifier(
  local: t.Identifier,
): t.ImportDefaultSpecifier {
  const node: t.ImportDefaultSpecifier = {
    type: "ImportDefaultSpecifier",
    local,
  };
  validate(_data[63][0], node, "local", local, true);
  return node;
}
export function importNamespaceSpecifier(
  local: t.Identifier,
): t.ImportNamespaceSpecifier {
  const node: t.ImportNamespaceSpecifier = {
    type: "ImportNamespaceSpecifier",
    local,
  };
  validate(_data[64][0], node, "local", local, true);
  return node;
}
export function importSpecifier(
  local: t.Identifier,
  imported: t.Identifier | t.StringLiteral,
): t.ImportSpecifier {
  const node: t.ImportSpecifier = {
    type: "ImportSpecifier",
    local,
    imported,
  };
  validate(_data[65][0], node, "local", local, true);
  validate(_data[65][1], node, "imported", imported, true);
  return node;
}
export function importExpression(
  source: t.Expression,
  options: t.Expression | null = null,
): t.ImportExpression {
  const node: t.ImportExpression = {
    type: "ImportExpression",
    source,
    options,
  };
  validate(_data[66][0], node, "source", source, true);
  validate(_data[66][1], node, "options", options, true);
  return node;
}
export function metaProperty(
  meta: t.Identifier,
  property: t.Identifier,
): t.MetaProperty {
  const node: t.MetaProperty = {
    type: "MetaProperty",
    meta,
    property,
  };
  validate(_data[67][0], node, "meta", meta, true);
  validate(_data[67][1], node, "property", property, true);
  return node;
}
export function classMethod(
  kind: "get" | "set" | "method" | "constructor" | undefined = "method",
  key:
    | t.Identifier
    | t.StringLiteral
    | t.NumericLiteral
    | t.BigIntLiteral
    | t.Expression,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  body: t.BlockStatement,
  computed: boolean = false,
  _static: boolean = false,
  generator: boolean = false,
  async: boolean = false,
): t.ClassMethod {
  const node: t.ClassMethod = {
    type: "ClassMethod",
    kind,
    key,
    params,
    body,
    computed,
    static: _static,
    generator,
    async,
  };
  validate(_data[68][0], node, "kind", kind);
  validate(_data[68][1], node, "key", key, true);
  validate(_data[68][2], node, "params", params, true);
  validate(_data[68][3], node, "body", body, true);
  validate(_data[68][4], node, "computed", computed);
  validate(_data[68][5], node, "static", _static);
  validate(_data[68][6], node, "generator", generator);
  validate(_data[68][7], node, "async", async);
  return node;
}
export function objectPattern(
  properties: Array<t.RestElement | t.ObjectProperty>,
): t.ObjectPattern {
  const node: t.ObjectPattern = {
    type: "ObjectPattern",
    properties,
  };
  validate(_data[69][0], node, "properties", properties, true);
  return node;
}
export function spreadElement(argument: t.Expression): t.SpreadElement {
  const node: t.SpreadElement = {
    type: "SpreadElement",
    argument,
  };
  validate(_data[70][0], node, "argument", argument, true);
  return node;
}
function _super(): t.Super {
  return {
    type: "Super",
  };
}
export { _super as super };
export function taggedTemplateExpression(
  tag: t.Expression,
  quasi: t.TemplateLiteral,
): t.TaggedTemplateExpression {
  const node: t.TaggedTemplateExpression = {
    type: "TaggedTemplateExpression",
    tag,
    quasi,
  };
  validate(_data[72][0], node, "tag", tag, true);
  validate(_data[72][1], node, "quasi", quasi, true);
  return node;
}
export function templateElement(
  value: { raw: string; cooked?: string },
  tail: boolean = false,
): t.TemplateElement {
  const node: t.TemplateElement = {
    type: "TemplateElement",
    value,
    tail,
  };
  validate(_data[73][0], node, "value", value);
  validate(_data[73][1], node, "tail", tail);
  return node;
}
export function templateLiteral(
  quasis: Array<t.TemplateElement>,
  expressions: Array<t.Expression | t.TSType>,
): t.TemplateLiteral {
  const node: t.TemplateLiteral = {
    type: "TemplateLiteral",
    quasis,
    expressions,
  };
  validate(_data[74][0], node, "quasis", quasis, true);
  validate(_data[74][1], node, "expressions", expressions, true);
  return node;
}
export function yieldExpression(
  argument: t.Expression | null = null,
  delegate: boolean = false,
): t.YieldExpression {
  const node: t.YieldExpression = {
    type: "YieldExpression",
    argument,
    delegate,
  };
  validate(_data[75][0], node, "argument", argument, true);
  validate(_data[75][1], node, "delegate", delegate);
  return node;
}
export function awaitExpression(argument: t.Expression): t.AwaitExpression {
  const node: t.AwaitExpression = {
    type: "AwaitExpression",
    argument,
  };
  validate(_data[76][0], node, "argument", argument, true);
  return node;
}
function _import(): t.Import {
  return {
    type: "Import",
  };
}
export { _import as import };
export function bigIntLiteral(value: string): t.BigIntLiteral {
  const node: t.BigIntLiteral = {
    type: "BigIntLiteral",
    value,
  };
  validate(_data[78][0], node, "value", value);
  return node;
}
export function exportNamespaceSpecifier(
  exported: t.Identifier,
): t.ExportNamespaceSpecifier {
  const node: t.ExportNamespaceSpecifier = {
    type: "ExportNamespaceSpecifier",
    exported,
  };
  validate(_data[79][0], node, "exported", exported, true);
  return node;
}
export function optionalMemberExpression(
  object: t.Expression,
  property: t.Expression | t.Identifier,
  computed: boolean | undefined = false,
  optional: boolean,
): t.OptionalMemberExpression {
  const node: t.OptionalMemberExpression = {
    type: "OptionalMemberExpression",
    object,
    property,
    computed,
    optional,
  };
  validate(_data[80][0], node, "object", object, true);
  validate(_data[80][1], node, "property", property, true);
  validate(_data[80][2], node, "computed", computed);
  validate(_data[80][3], node, "optional", optional);
  return node;
}
export function optionalCallExpression(
  callee: t.Expression,
  _arguments: Array<t.Expression | t.SpreadElement | t.ArgumentPlaceholder>,
  optional: boolean,
): t.OptionalCallExpression {
  const node: t.OptionalCallExpression = {
    type: "OptionalCallExpression",
    callee,
    arguments: _arguments,
    optional,
  };
  validate(_data[81][0], node, "callee", callee, true);
  validate(_data[81][1], node, "arguments", _arguments, true);
  validate(_data[81][2], node, "optional", optional);
  return node;
}
export function classProperty(
  key:
    | t.Identifier
    | t.StringLiteral
    | t.NumericLiteral
    | t.BigIntLiteral
    | t.Expression,
  value: t.Expression | null = null,
  typeAnnotation: t.TypeAnnotation | t.TSTypeAnnotation | t.Noop | null = null,
  decorators: Array<t.Decorator> | null = null,
  computed: boolean = false,
  _static: boolean = false,
): t.ClassProperty {
  const node: t.ClassProperty = {
    type: "ClassProperty",
    key,
    value,
    typeAnnotation,
    decorators,
    computed,
    static: _static,
  };
  validate(_data[82][0], node, "key", key, true);
  validate(_data[82][1], node, "value", value, true);
  validate(_data[82][2], node, "typeAnnotation", typeAnnotation, true);
  validate(_data[82][3], node, "decorators", decorators, true);
  validate(_data[82][4], node, "computed", computed);
  validate(_data[82][5], node, "static", _static);
  return node;
}
export function classAccessorProperty(
  key:
    | t.Identifier
    | t.StringLiteral
    | t.NumericLiteral
    | t.BigIntLiteral
    | t.Expression
    | t.PrivateName,
  value: t.Expression | null = null,
  typeAnnotation: t.TypeAnnotation | t.TSTypeAnnotation | t.Noop | null = null,
  decorators: Array<t.Decorator> | null = null,
  computed: boolean = false,
  _static: boolean = false,
): t.ClassAccessorProperty {
  const node: t.ClassAccessorProperty = {
    type: "ClassAccessorProperty",
    key,
    value,
    typeAnnotation,
    decorators,
    computed,
    static: _static,
  };
  validate(_data[83][0], node, "key", key, true);
  validate(_data[83][1], node, "value", value, true);
  validate(_data[83][2], node, "typeAnnotation", typeAnnotation, true);
  validate(_data[83][3], node, "decorators", decorators, true);
  validate(_data[83][4], node, "computed", computed);
  validate(_data[83][5], node, "static", _static);
  return node;
}
export function classPrivateProperty(
  key: t.PrivateName,
  value: t.Expression | null = null,
  decorators: Array<t.Decorator> | null = null,
  _static: boolean = false,
): t.ClassPrivateProperty {
  const node: t.ClassPrivateProperty = {
    type: "ClassPrivateProperty",
    key,
    value,
    decorators,
    static: _static,
  };
  validate(_data[84][0], node, "key", key, true);
  validate(_data[84][1], node, "value", value, true);
  validate(_data[84][2], node, "decorators", decorators, true);
  validate(_data[84][3], node, "static", _static);
  return node;
}
export function classPrivateMethod(
  kind: "get" | "set" | "method" | undefined = "method",
  key: t.PrivateName,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  body: t.BlockStatement,
  _static: boolean = false,
): t.ClassPrivateMethod {
  const node: t.ClassPrivateMethod = {
    type: "ClassPrivateMethod",
    kind,
    key,
    params,
    body,
    static: _static,
  };
  validate(_data[85][0], node, "kind", kind);
  validate(_data[85][1], node, "key", key, true);
  validate(_data[85][2], node, "params", params, true);
  validate(_data[85][3], node, "body", body, true);
  validate(_data[85][4], node, "static", _static);
  return node;
}
export function privateName(id: t.Identifier): t.PrivateName {
  const node: t.PrivateName = {
    type: "PrivateName",
    id,
  };
  validate(_data[86][0], node, "id", id, true);
  return node;
}
export function staticBlock(body: Array<t.Statement>): t.StaticBlock {
  const node: t.StaticBlock = {
    type: "StaticBlock",
    body,
  };
  validate(_data[87][0], node, "body", body, true);
  return node;
}
export function anyTypeAnnotation(): t.AnyTypeAnnotation {
  return {
    type: "AnyTypeAnnotation",
  };
}
export function arrayTypeAnnotation(
  elementType: t.FlowType,
): t.ArrayTypeAnnotation {
  const node: t.ArrayTypeAnnotation = {
    type: "ArrayTypeAnnotation",
    elementType,
  };
  validate(_data[89][0], node, "elementType", elementType, true);
  return node;
}
export function booleanTypeAnnotation(): t.BooleanTypeAnnotation {
  return {
    type: "BooleanTypeAnnotation",
  };
}
export function booleanLiteralTypeAnnotation(
  value: boolean,
): t.BooleanLiteralTypeAnnotation {
  const node: t.BooleanLiteralTypeAnnotation = {
    type: "BooleanLiteralTypeAnnotation",
    value,
  };
  validate(_data[91][0], node, "value", value);
  return node;
}
export function nullLiteralTypeAnnotation(): t.NullLiteralTypeAnnotation {
  return {
    type: "NullLiteralTypeAnnotation",
  };
}
export function classImplements(
  id: t.Identifier,
  typeParameters: t.TypeParameterInstantiation | null = null,
): t.ClassImplements {
  const node: t.ClassImplements = {
    type: "ClassImplements",
    id,
    typeParameters,
  };
  validate(_data[93][0], node, "id", id, true);
  validate(_data[93][1], node, "typeParameters", typeParameters, true);
  return node;
}
export function declareClass(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  _extends: Array<t.InterfaceExtends> | null | undefined = null,
  body: t.ObjectTypeAnnotation,
): t.DeclareClass {
  const node: t.DeclareClass = {
    type: "DeclareClass",
    id,
    typeParameters,
    extends: _extends,
    body,
  };
  validate(_data[94][0], node, "id", id, true);
  validate(_data[94][1], node, "typeParameters", typeParameters, true);
  validate(_data[94][2], node, "extends", _extends, true);
  validate(_data[94][3], node, "body", body, true);
  return node;
}
export function declareFunction(id: t.Identifier): t.DeclareFunction {
  const node: t.DeclareFunction = {
    type: "DeclareFunction",
    id,
  };
  validate(_data[95][0], node, "id", id, true);
  return node;
}
export function declareInterface(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  _extends: Array<t.InterfaceExtends> | null | undefined = null,
  body: t.ObjectTypeAnnotation,
): t.DeclareInterface {
  const node: t.DeclareInterface = {
    type: "DeclareInterface",
    id,
    typeParameters,
    extends: _extends,
    body,
  };
  validate(_data[96][0], node, "id", id, true);
  validate(_data[96][1], node, "typeParameters", typeParameters, true);
  validate(_data[96][2], node, "extends", _extends, true);
  validate(_data[96][3], node, "body", body, true);
  return node;
}
export function declareModule(
  id: t.Identifier | t.StringLiteral,
  body: t.BlockStatement,
  kind: "CommonJS" | "ES" | null = null,
): t.DeclareModule {
  const node: t.DeclareModule = {
    type: "DeclareModule",
    id,
    body,
    kind,
  };
  validate(_data[97][0], node, "id", id, true);
  validate(_data[97][1], node, "body", body, true);
  validate(_data[97][2], node, "kind", kind);
  return node;
}
export function declareModuleExports(
  typeAnnotation: t.TypeAnnotation,
): t.DeclareModuleExports {
  const node: t.DeclareModuleExports = {
    type: "DeclareModuleExports",
    typeAnnotation,
  };
  validate(_data[98][0], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export function declareTypeAlias(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  right: t.FlowType,
): t.DeclareTypeAlias {
  const node: t.DeclareTypeAlias = {
    type: "DeclareTypeAlias",
    id,
    typeParameters,
    right,
  };
  validate(_data[99][0], node, "id", id, true);
  validate(_data[99][1], node, "typeParameters", typeParameters, true);
  validate(_data[99][2], node, "right", right, true);
  return node;
}
export function declareOpaqueType(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null = null,
  supertype: t.FlowType | null = null,
): t.DeclareOpaqueType {
  const node: t.DeclareOpaqueType = {
    type: "DeclareOpaqueType",
    id,
    typeParameters,
    supertype,
  };
  validate(_data[100][0], node, "id", id, true);
  validate(_data[100][1], node, "typeParameters", typeParameters, true);
  validate(_data[100][2], node, "supertype", supertype, true);
  return node;
}
export function declareVariable(id: t.Identifier): t.DeclareVariable {
  const node: t.DeclareVariable = {
    type: "DeclareVariable",
    id,
  };
  validate(_data[101][0], node, "id", id, true);
  return node;
}
export function declareExportDeclaration(
  declaration: t.Flow | null = null,
  specifiers: Array<
    t.ExportSpecifier | t.ExportNamespaceSpecifier
  > | null = null,
  source: t.StringLiteral | null = null,
): t.DeclareExportDeclaration {
  const node: t.DeclareExportDeclaration = {
    type: "DeclareExportDeclaration",
    declaration,
    specifiers,
    source,
  };
  validate(_data[102][0], node, "declaration", declaration, true);
  validate(_data[102][1], node, "specifiers", specifiers, true);
  validate(_data[102][2], node, "source", source, true);
  return node;
}
export function declareExportAllDeclaration(
  source: t.StringLiteral,
): t.DeclareExportAllDeclaration {
  const node: t.DeclareExportAllDeclaration = {
    type: "DeclareExportAllDeclaration",
    source,
  };
  validate(_data[103][0], node, "source", source, true);
  return node;
}
export function declaredPredicate(value: t.Flow): t.DeclaredPredicate {
  const node: t.DeclaredPredicate = {
    type: "DeclaredPredicate",
    value,
  };
  validate(_data[104][0], node, "value", value, true);
  return node;
}
export function existsTypeAnnotation(): t.ExistsTypeAnnotation {
  return {
    type: "ExistsTypeAnnotation",
  };
}
export function functionTypeAnnotation(
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  params: Array<t.FunctionTypeParam>,
  rest: t.FunctionTypeParam | null | undefined = null,
  returnType: t.FlowType,
): t.FunctionTypeAnnotation {
  const node: t.FunctionTypeAnnotation = {
    type: "FunctionTypeAnnotation",
    typeParameters,
    params,
    rest,
    returnType,
  };
  validate(_data[106][0], node, "typeParameters", typeParameters, true);
  validate(_data[106][1], node, "params", params, true);
  validate(_data[106][2], node, "rest", rest, true);
  validate(_data[106][3], node, "returnType", returnType, true);
  return node;
}
export function functionTypeParam(
  name: t.Identifier | null | undefined = null,
  typeAnnotation: t.FlowType,
): t.FunctionTypeParam {
  const node: t.FunctionTypeParam = {
    type: "FunctionTypeParam",
    name,
    typeAnnotation,
  };
  validate(_data[107][0], node, "name", name, true);
  validate(_data[107][1], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export function genericTypeAnnotation(
  id: t.Identifier | t.QualifiedTypeIdentifier,
  typeParameters: t.TypeParameterInstantiation | null = null,
): t.GenericTypeAnnotation {
  const node: t.GenericTypeAnnotation = {
    type: "GenericTypeAnnotation",
    id,
    typeParameters,
  };
  validate(_data[108][0], node, "id", id, true);
  validate(_data[108][1], node, "typeParameters", typeParameters, true);
  return node;
}
export function inferredPredicate(): t.InferredPredicate {
  return {
    type: "InferredPredicate",
  };
}
export function interfaceExtends(
  id: t.Identifier | t.QualifiedTypeIdentifier,
  typeParameters: t.TypeParameterInstantiation | null = null,
): t.InterfaceExtends {
  const node: t.InterfaceExtends = {
    type: "InterfaceExtends",
    id,
    typeParameters,
  };
  validate(_data[110][0], node, "id", id, true);
  validate(_data[110][1], node, "typeParameters", typeParameters, true);
  return node;
}
export function interfaceDeclaration(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  _extends: Array<t.InterfaceExtends> | null | undefined = null,
  body: t.ObjectTypeAnnotation,
): t.InterfaceDeclaration {
  const node: t.InterfaceDeclaration = {
    type: "InterfaceDeclaration",
    id,
    typeParameters,
    extends: _extends,
    body,
  };
  validate(_data[111][0], node, "id", id, true);
  validate(_data[111][1], node, "typeParameters", typeParameters, true);
  validate(_data[111][2], node, "extends", _extends, true);
  validate(_data[111][3], node, "body", body, true);
  return node;
}
export function interfaceTypeAnnotation(
  _extends: Array<t.InterfaceExtends> | null | undefined = null,
  body: t.ObjectTypeAnnotation,
): t.InterfaceTypeAnnotation {
  const node: t.InterfaceTypeAnnotation = {
    type: "InterfaceTypeAnnotation",
    extends: _extends,
    body,
  };
  validate(_data[112][0], node, "extends", _extends, true);
  validate(_data[112][1], node, "body", body, true);
  return node;
}
export function intersectionTypeAnnotation(
  types: Array<t.FlowType>,
): t.IntersectionTypeAnnotation {
  const node: t.IntersectionTypeAnnotation = {
    type: "IntersectionTypeAnnotation",
    types,
  };
  validate(_data[113][0], node, "types", types, true);
  return node;
}
export function mixedTypeAnnotation(): t.MixedTypeAnnotation {
  return {
    type: "MixedTypeAnnotation",
  };
}
export function emptyTypeAnnotation(): t.EmptyTypeAnnotation {
  return {
    type: "EmptyTypeAnnotation",
  };
}
export function nullableTypeAnnotation(
  typeAnnotation: t.FlowType,
): t.NullableTypeAnnotation {
  const node: t.NullableTypeAnnotation = {
    type: "NullableTypeAnnotation",
    typeAnnotation,
  };
  validate(_data[116][0], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export function numberLiteralTypeAnnotation(
  value: number,
): t.NumberLiteralTypeAnnotation {
  const node: t.NumberLiteralTypeAnnotation = {
    type: "NumberLiteralTypeAnnotation",
    value,
  };
  validate(_data[117][0], node, "value", value);
  return node;
}
export function numberTypeAnnotation(): t.NumberTypeAnnotation {
  return {
    type: "NumberTypeAnnotation",
  };
}
export function objectTypeAnnotation(
  properties: Array<t.ObjectTypeProperty | t.ObjectTypeSpreadProperty>,
  indexers: Array<t.ObjectTypeIndexer> = [],
  callProperties: Array<t.ObjectTypeCallProperty> = [],
  internalSlots: Array<t.ObjectTypeInternalSlot> = [],
  exact: boolean = false,
): t.ObjectTypeAnnotation {
  const node: t.ObjectTypeAnnotation = {
    type: "ObjectTypeAnnotation",
    properties,
    indexers,
    callProperties,
    internalSlots,
    exact,
  };
  validate(_data[119][0], node, "properties", properties, true);
  validate(_data[119][1], node, "indexers", indexers, true);
  validate(_data[119][2], node, "callProperties", callProperties, true);
  validate(_data[119][3], node, "internalSlots", internalSlots, true);
  validate(_data[119][4], node, "exact", exact);
  return node;
}
export function objectTypeInternalSlot(
  id: t.Identifier,
  value: t.FlowType,
  optional: boolean,
  _static: boolean,
  method: boolean,
): t.ObjectTypeInternalSlot {
  const node: t.ObjectTypeInternalSlot = {
    type: "ObjectTypeInternalSlot",
    id,
    value,
    optional,
    static: _static,
    method,
  };
  validate(_data[120][0], node, "id", id, true);
  validate(_data[120][1], node, "value", value, true);
  validate(_data[120][2], node, "optional", optional);
  validate(_data[120][3], node, "static", _static);
  validate(_data[120][4], node, "method", method);
  return node;
}
export function objectTypeCallProperty(
  value: t.FlowType,
): t.ObjectTypeCallProperty {
  const node: t.ObjectTypeCallProperty = {
    type: "ObjectTypeCallProperty",
    value,
    static: null,
  };
  validate(_data[121][0], node, "value", value, true);
  return node;
}
export function objectTypeIndexer(
  id: t.Identifier | null | undefined = null,
  key: t.FlowType,
  value: t.FlowType,
  variance: t.Variance | null = null,
): t.ObjectTypeIndexer {
  const node: t.ObjectTypeIndexer = {
    type: "ObjectTypeIndexer",
    id,
    key,
    value,
    variance,
    static: null,
  };
  validate(_data[122][0], node, "id", id, true);
  validate(_data[122][1], node, "key", key, true);
  validate(_data[122][2], node, "value", value, true);
  validate(_data[122][3], node, "variance", variance, true);
  return node;
}
export function objectTypeProperty(
  key: t.Identifier | t.StringLiteral,
  value: t.FlowType,
  variance: t.Variance | null = null,
): t.ObjectTypeProperty {
  const node: t.ObjectTypeProperty = {
    type: "ObjectTypeProperty",
    key,
    value,
    variance,
    kind: null,
    method: null,
    optional: null,
    proto: null,
    static: null,
  };
  validate(_data[123][0], node, "key", key, true);
  validate(_data[123][1], node, "value", value, true);
  validate(_data[123][2], node, "variance", variance, true);
  return node;
}
export function objectTypeSpreadProperty(
  argument: t.FlowType,
): t.ObjectTypeSpreadProperty {
  const node: t.ObjectTypeSpreadProperty = {
    type: "ObjectTypeSpreadProperty",
    argument,
  };
  validate(_data[124][0], node, "argument", argument, true);
  return node;
}
export function opaqueType(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  supertype: t.FlowType | null | undefined = null,
  impltype: t.FlowType,
): t.OpaqueType {
  const node: t.OpaqueType = {
    type: "OpaqueType",
    id,
    typeParameters,
    supertype,
    impltype,
  };
  validate(_data[125][0], node, "id", id, true);
  validate(_data[125][1], node, "typeParameters", typeParameters, true);
  validate(_data[125][2], node, "supertype", supertype, true);
  validate(_data[125][3], node, "impltype", impltype, true);
  return node;
}
export function qualifiedTypeIdentifier(
  id: t.Identifier,
  qualification: t.Identifier | t.QualifiedTypeIdentifier,
): t.QualifiedTypeIdentifier {
  const node: t.QualifiedTypeIdentifier = {
    type: "QualifiedTypeIdentifier",
    id,
    qualification,
  };
  validate(_data[126][0], node, "id", id, true);
  validate(_data[126][1], node, "qualification", qualification, true);
  return node;
}
export function stringLiteralTypeAnnotation(
  value: string,
): t.StringLiteralTypeAnnotation {
  const node: t.StringLiteralTypeAnnotation = {
    type: "StringLiteralTypeAnnotation",
    value,
  };
  validate(_data[127][0], node, "value", value);
  return node;
}
export function stringTypeAnnotation(): t.StringTypeAnnotation {
  return {
    type: "StringTypeAnnotation",
  };
}
export function symbolTypeAnnotation(): t.SymbolTypeAnnotation {
  return {
    type: "SymbolTypeAnnotation",
  };
}
export function thisTypeAnnotation(): t.ThisTypeAnnotation {
  return {
    type: "ThisTypeAnnotation",
  };
}
export function tupleTypeAnnotation(
  types: Array<t.FlowType>,
): t.TupleTypeAnnotation {
  const node: t.TupleTypeAnnotation = {
    type: "TupleTypeAnnotation",
    types,
  };
  validate(_data[131][0], node, "types", types, true);
  return node;
}
export function typeofTypeAnnotation(
  argument: t.FlowType,
): t.TypeofTypeAnnotation {
  const node: t.TypeofTypeAnnotation = {
    type: "TypeofTypeAnnotation",
    argument,
  };
  validate(_data[132][0], node, "argument", argument, true);
  return node;
}
export function typeAlias(
  id: t.Identifier,
  typeParameters: t.TypeParameterDeclaration | null | undefined = null,
  right: t.FlowType,
): t.TypeAlias {
  const node: t.TypeAlias = {
    type: "TypeAlias",
    id,
    typeParameters,
    right,
  };
  validate(_data[133][0], node, "id", id, true);
  validate(_data[133][1], node, "typeParameters", typeParameters, true);
  validate(_data[133][2], node, "right", right, true);
  return node;
}
export function typeAnnotation(typeAnnotation: t.FlowType): t.TypeAnnotation {
  const node: t.TypeAnnotation = {
    type: "TypeAnnotation",
    typeAnnotation,
  };
  validate(_data[134][0], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export function typeCastExpression(
  expression: t.Expression,
  typeAnnotation: t.TypeAnnotation,
): t.TypeCastExpression {
  const node: t.TypeCastExpression = {
    type: "TypeCastExpression",
    expression,
    typeAnnotation,
  };
  validate(_data[135][0], node, "expression", expression, true);
  validate(_data[135][1], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export function typeParameter(
  bound: t.TypeAnnotation | null = null,
  _default: t.FlowType | null = null,
  variance: t.Variance | null = null,
): t.TypeParameter {
  const node: t.TypeParameter = {
    type: "TypeParameter",
    bound,
    default: _default,
    variance,
    name: null,
  };
  validate(_data[136][0], node, "bound", bound, true);
  validate(_data[136][1], node, "default", _default, true);
  validate(_data[136][2], node, "variance", variance, true);
  return node;
}
export function typeParameterDeclaration(
  params: Array<t.TypeParameter>,
): t.TypeParameterDeclaration {
  const node: t.TypeParameterDeclaration = {
    type: "TypeParameterDeclaration",
    params,
  };
  validate(_data[137][0], node, "params", params, true);
  return node;
}
export function typeParameterInstantiation(
  params: Array<t.FlowType>,
): t.TypeParameterInstantiation {
  const node: t.TypeParameterInstantiation = {
    type: "TypeParameterInstantiation",
    params,
  };
  validate(_data[138][0], node, "params", params, true);
  return node;
}
export function unionTypeAnnotation(
  types: Array<t.FlowType>,
): t.UnionTypeAnnotation {
  const node: t.UnionTypeAnnotation = {
    type: "UnionTypeAnnotation",
    types,
  };
  validate(_data[139][0], node, "types", types, true);
  return node;
}
export function variance(kind: "minus" | "plus"): t.Variance {
  const node: t.Variance = {
    type: "Variance",
    kind,
  };
  validate(_data[140][0], node, "kind", kind);
  return node;
}
export function voidTypeAnnotation(): t.VoidTypeAnnotation {
  return {
    type: "VoidTypeAnnotation",
  };
}
export function enumDeclaration(
  id: t.Identifier,
  body:
    | t.EnumBooleanBody
    | t.EnumNumberBody
    | t.EnumStringBody
    | t.EnumSymbolBody,
): t.EnumDeclaration {
  const node: t.EnumDeclaration = {
    type: "EnumDeclaration",
    id,
    body,
  };
  validate(_data[142][0], node, "id", id, true);
  validate(_data[142][1], node, "body", body, true);
  return node;
}
export function enumBooleanBody(
  members: Array<t.EnumBooleanMember>,
): t.EnumBooleanBody {
  const node: t.EnumBooleanBody = {
    type: "EnumBooleanBody",
    members,
    explicitType: null,
    hasUnknownMembers: null,
  };
  validate(_data[143][0], node, "members", members, true);
  return node;
}
export function enumNumberBody(
  members: Array<t.EnumNumberMember>,
): t.EnumNumberBody {
  const node: t.EnumNumberBody = {
    type: "EnumNumberBody",
    members,
    explicitType: null,
    hasUnknownMembers: null,
  };
  validate(_data[144][0], node, "members", members, true);
  return node;
}
export function enumStringBody(
  members: Array<t.EnumStringMember | t.EnumDefaultedMember>,
): t.EnumStringBody {
  const node: t.EnumStringBody = {
    type: "EnumStringBody",
    members,
    explicitType: null,
    hasUnknownMembers: null,
  };
  validate(_data[145][0], node, "members", members, true);
  return node;
}
export function enumSymbolBody(
  members: Array<t.EnumDefaultedMember>,
): t.EnumSymbolBody {
  const node: t.EnumSymbolBody = {
    type: "EnumSymbolBody",
    members,
    hasUnknownMembers: null,
  };
  validate(_data[146][0], node, "members", members, true);
  return node;
}
export function enumBooleanMember(id: t.Identifier): t.EnumBooleanMember {
  const node: t.EnumBooleanMember = {
    type: "EnumBooleanMember",
    id,
    init: null,
  };
  validate(_data[147][0], node, "id", id, true);
  return node;
}
export function enumNumberMember(
  id: t.Identifier,
  init: t.NumericLiteral,
): t.EnumNumberMember {
  const node: t.EnumNumberMember = {
    type: "EnumNumberMember",
    id,
    init,
  };
  validate(_data[148][0], node, "id", id, true);
  validate(_data[148][1], node, "init", init, true);
  return node;
}
export function enumStringMember(
  id: t.Identifier,
  init: t.StringLiteral,
): t.EnumStringMember {
  const node: t.EnumStringMember = {
    type: "EnumStringMember",
    id,
    init,
  };
  validate(_data[149][0], node, "id", id, true);
  validate(_data[149][1], node, "init", init, true);
  return node;
}
export function enumDefaultedMember(id: t.Identifier): t.EnumDefaultedMember {
  const node: t.EnumDefaultedMember = {
    type: "EnumDefaultedMember",
    id,
  };
  validate(_data[150][0], node, "id", id, true);
  return node;
}
export function indexedAccessType(
  objectType: t.FlowType,
  indexType: t.FlowType,
): t.IndexedAccessType {
  const node: t.IndexedAccessType = {
    type: "IndexedAccessType",
    objectType,
    indexType,
  };
  validate(_data[151][0], node, "objectType", objectType, true);
  validate(_data[151][1], node, "indexType", indexType, true);
  return node;
}
export function optionalIndexedAccessType(
  objectType: t.FlowType,
  indexType: t.FlowType,
): t.OptionalIndexedAccessType {
  const node: t.OptionalIndexedAccessType = {
    type: "OptionalIndexedAccessType",
    objectType,
    indexType,
    optional: null,
  };
  validate(_data[152][0], node, "objectType", objectType, true);
  validate(_data[152][1], node, "indexType", indexType, true);
  return node;
}
export function jsxAttribute(
  name: t.JSXIdentifier | t.JSXNamespacedName,
  value:
    | t.JSXElement
    | t.JSXFragment
    | t.StringLiteral
    | t.JSXExpressionContainer
    | null = null,
): t.JSXAttribute {
  const node: t.JSXAttribute = {
    type: "JSXAttribute",
    name,
    value,
  };
  validate(_data[153][0], node, "name", name, true);
  validate(_data[153][1], node, "value", value, true);
  return node;
}
export { jsxAttribute as jSXAttribute };
export function jsxClosingElement(
  name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
): t.JSXClosingElement {
  const node: t.JSXClosingElement = {
    type: "JSXClosingElement",
    name,
  };
  validate(_data[154][0], node, "name", name, true);
  return node;
}
export { jsxClosingElement as jSXClosingElement };
export function jsxElement(
  openingElement: t.JSXOpeningElement,
  closingElement: t.JSXClosingElement | null | undefined = null,
  children: Array<
    | t.JSXText
    | t.JSXExpressionContainer
    | t.JSXSpreadChild
    | t.JSXElement
    | t.JSXFragment
  >,
  selfClosing: boolean | null = null,
): t.JSXElement {
  const node: t.JSXElement = {
    type: "JSXElement",
    openingElement,
    closingElement,
    children,
    selfClosing,
  };
  validate(_data[155][0], node, "openingElement", openingElement, true);
  validate(_data[155][1], node, "closingElement", closingElement, true);
  validate(_data[155][2], node, "children", children, true);
  validate(_data[155][3], node, "selfClosing", selfClosing);
  return node;
}
export { jsxElement as jSXElement };
export function jsxEmptyExpression(): t.JSXEmptyExpression {
  return {
    type: "JSXEmptyExpression",
  };
}
export { jsxEmptyExpression as jSXEmptyExpression };
export function jsxExpressionContainer(
  expression: t.Expression | t.JSXEmptyExpression,
): t.JSXExpressionContainer {
  const node: t.JSXExpressionContainer = {
    type: "JSXExpressionContainer",
    expression,
  };
  validate(_data[157][0], node, "expression", expression, true);
  return node;
}
export { jsxExpressionContainer as jSXExpressionContainer };
export function jsxSpreadChild(expression: t.Expression): t.JSXSpreadChild {
  const node: t.JSXSpreadChild = {
    type: "JSXSpreadChild",
    expression,
  };
  validate(_data[158][0], node, "expression", expression, true);
  return node;
}
export { jsxSpreadChild as jSXSpreadChild };
export function jsxIdentifier(name: string): t.JSXIdentifier {
  const node: t.JSXIdentifier = {
    type: "JSXIdentifier",
    name,
  };
  validate(_data[159][0], node, "name", name);
  return node;
}
export { jsxIdentifier as jSXIdentifier };
export function jsxMemberExpression(
  object: t.JSXMemberExpression | t.JSXIdentifier,
  property: t.JSXIdentifier,
): t.JSXMemberExpression {
  const node: t.JSXMemberExpression = {
    type: "JSXMemberExpression",
    object,
    property,
  };
  validate(_data[160][0], node, "object", object, true);
  validate(_data[160][1], node, "property", property, true);
  return node;
}
export { jsxMemberExpression as jSXMemberExpression };
export function jsxNamespacedName(
  namespace: t.JSXIdentifier,
  name: t.JSXIdentifier,
): t.JSXNamespacedName {
  const node: t.JSXNamespacedName = {
    type: "JSXNamespacedName",
    namespace,
    name,
  };
  validate(_data[161][0], node, "namespace", namespace, true);
  validate(_data[161][1], node, "name", name, true);
  return node;
}
export { jsxNamespacedName as jSXNamespacedName };
export function jsxOpeningElement(
  name: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
  attributes: Array<t.JSXAttribute | t.JSXSpreadAttribute>,
  selfClosing: boolean = false,
): t.JSXOpeningElement {
  const node: t.JSXOpeningElement = {
    type: "JSXOpeningElement",
    name,
    attributes,
    selfClosing,
  };
  validate(_data[162][0], node, "name", name, true);
  validate(_data[162][1], node, "attributes", attributes, true);
  validate(_data[162][2], node, "selfClosing", selfClosing);
  return node;
}
export { jsxOpeningElement as jSXOpeningElement };
export function jsxSpreadAttribute(
  argument: t.Expression,
): t.JSXSpreadAttribute {
  const node: t.JSXSpreadAttribute = {
    type: "JSXSpreadAttribute",
    argument,
  };
  validate(_data[163][0], node, "argument", argument, true);
  return node;
}
export { jsxSpreadAttribute as jSXSpreadAttribute };
export function jsxText(value: string): t.JSXText {
  const node: t.JSXText = {
    type: "JSXText",
    value,
  };
  validate(_data[164][0], node, "value", value);
  return node;
}
export { jsxText as jSXText };
export function jsxFragment(
  openingFragment: t.JSXOpeningFragment,
  closingFragment: t.JSXClosingFragment,
  children: Array<
    | t.JSXText
    | t.JSXExpressionContainer
    | t.JSXSpreadChild
    | t.JSXElement
    | t.JSXFragment
  >,
): t.JSXFragment {
  const node: t.JSXFragment = {
    type: "JSXFragment",
    openingFragment,
    closingFragment,
    children,
  };
  validate(_data[165][0], node, "openingFragment", openingFragment, true);
  validate(_data[165][1], node, "closingFragment", closingFragment, true);
  validate(_data[165][2], node, "children", children, true);
  return node;
}
export { jsxFragment as jSXFragment };
export function jsxOpeningFragment(): t.JSXOpeningFragment {
  return {
    type: "JSXOpeningFragment",
  };
}
export { jsxOpeningFragment as jSXOpeningFragment };
export function jsxClosingFragment(): t.JSXClosingFragment {
  return {
    type: "JSXClosingFragment",
  };
}
export { jsxClosingFragment as jSXClosingFragment };
export function noop(): t.Noop {
  return {
    type: "Noop",
  };
}
export function placeholder(
  expectedNode:
    | "Identifier"
    | "StringLiteral"
    | "Expression"
    | "Statement"
    | "Declaration"
    | "BlockStatement"
    | "ClassBody"
    | "Pattern",
  name: t.Identifier,
): t.Placeholder {
  const node: t.Placeholder = {
    type: "Placeholder",
    expectedNode,
    name,
  };
  validate(_data[169][0], node, "expectedNode", expectedNode);
  validate(_data[169][1], node, "name", name, true);
  return node;
}
export function v8IntrinsicIdentifier(name: string): t.V8IntrinsicIdentifier {
  const node: t.V8IntrinsicIdentifier = {
    type: "V8IntrinsicIdentifier",
    name,
  };
  validate(_data[170][0], node, "name", name);
  return node;
}
export function argumentPlaceholder(): t.ArgumentPlaceholder {
  return {
    type: "ArgumentPlaceholder",
  };
}
export function bindExpression(
  object: t.Expression,
  callee: t.Expression,
): t.BindExpression {
  const node: t.BindExpression = {
    type: "BindExpression",
    object,
    callee,
  };
  validate(_data[172][0], node, "object", object, true);
  validate(_data[172][1], node, "callee", callee, true);
  return node;
}
export function importAttribute(
  key: t.Identifier | t.StringLiteral,
  value: t.StringLiteral,
): t.ImportAttribute {
  const node: t.ImportAttribute = {
    type: "ImportAttribute",
    key,
    value,
  };
  validate(_data[173][0], node, "key", key, true);
  validate(_data[173][1], node, "value", value, true);
  return node;
}
export function decorator(expression: t.Expression): t.Decorator {
  const node: t.Decorator = {
    type: "Decorator",
    expression,
  };
  validate(_data[174][0], node, "expression", expression, true);
  return node;
}
export function doExpression(
  body: t.BlockStatement,
  async: boolean = false,
): t.DoExpression {
  const node: t.DoExpression = {
    type: "DoExpression",
    body,
    async,
  };
  validate(_data[175][0], node, "body", body, true);
  validate(_data[175][1], node, "async", async);
  return node;
}
export function exportDefaultSpecifier(
  exported: t.Identifier,
): t.ExportDefaultSpecifier {
  const node: t.ExportDefaultSpecifier = {
    type: "ExportDefaultSpecifier",
    exported,
  };
  validate(_data[176][0], node, "exported", exported, true);
  return node;
}
export function recordExpression(
  properties: Array<t.ObjectProperty | t.SpreadElement>,
): t.RecordExpression {
  const node: t.RecordExpression = {
    type: "RecordExpression",
    properties,
  };
  validate(_data[177][0], node, "properties", properties, true);
  return node;
}
export function tupleExpression(
  elements: Array<t.Expression | t.SpreadElement> = [],
): t.TupleExpression {
  const node: t.TupleExpression = {
    type: "TupleExpression",
    elements,
  };
  validate(_data[178][0], node, "elements", elements, true);
  return node;
}
export function decimalLiteral(value: string): t.DecimalLiteral {
  const node: t.DecimalLiteral = {
    type: "DecimalLiteral",
    value,
  };
  validate(_data[179][0], node, "value", value);
  return node;
}
export function moduleExpression(body: t.Program): t.ModuleExpression {
  const node: t.ModuleExpression = {
    type: "ModuleExpression",
    body,
  };
  validate(_data[180][0], node, "body", body, true);
  return node;
}
export function topicReference(): t.TopicReference {
  return {
    type: "TopicReference",
  };
}
export function pipelineTopicExpression(
  expression: t.Expression,
): t.PipelineTopicExpression {
  const node: t.PipelineTopicExpression = {
    type: "PipelineTopicExpression",
    expression,
  };
  validate(_data[182][0], node, "expression", expression, true);
  return node;
}
export function pipelineBareFunction(
  callee: t.Expression,
): t.PipelineBareFunction {
  const node: t.PipelineBareFunction = {
    type: "PipelineBareFunction",
    callee,
  };
  validate(_data[183][0], node, "callee", callee, true);
  return node;
}
export function pipelinePrimaryTopicReference(): t.PipelinePrimaryTopicReference {
  return {
    type: "PipelinePrimaryTopicReference",
  };
}
export function tsParameterProperty(
  parameter: t.Identifier | t.AssignmentPattern,
): t.TSParameterProperty {
  const node: t.TSParameterProperty = {
    type: "TSParameterProperty",
    parameter,
  };
  validate(_data[185][0], node, "parameter", parameter, true);
  return node;
}
export { tsParameterProperty as tSParameterProperty };
export function tsDeclareFunction(
  id: t.Identifier | null | undefined = null,
  typeParameters:
    | t.TSTypeParameterDeclaration
    | t.Noop
    | null
    | undefined = null,
  params: Array<t.Identifier | t.Pattern | t.RestElement>,
  returnType: t.TSTypeAnnotation | t.Noop | null = null,
): t.TSDeclareFunction {
  const node: t.TSDeclareFunction = {
    type: "TSDeclareFunction",
    id,
    typeParameters,
    params,
    returnType,
  };
  validate(_data[186][0], node, "id", id, true);
  validate(_data[186][1], node, "typeParameters", typeParameters, true);
  validate(_data[186][2], node, "params", params, true);
  validate(_data[186][3], node, "returnType", returnType, true);
  return node;
}
export { tsDeclareFunction as tSDeclareFunction };
export function tsDeclareMethod(
  decorators: Array<t.Decorator> | null | undefined = null,
  key:
    | t.Identifier
    | t.StringLiteral
    | t.NumericLiteral
    | t.BigIntLiteral
    | t.Expression,
  typeParameters:
    | t.TSTypeParameterDeclaration
    | t.Noop
    | null
    | undefined = null,
  params: Array<
    t.Identifier | t.Pattern | t.RestElement | t.TSParameterProperty
  >,
  returnType: t.TSTypeAnnotation | t.Noop | null = null,
): t.TSDeclareMethod {
  const node: t.TSDeclareMethod = {
    type: "TSDeclareMethod",
    decorators,
    key,
    typeParameters,
    params,
    returnType,
  };
  validate(_data[187][0], node, "decorators", decorators, true);
  validate(_data[187][1], node, "key", key, true);
  validate(_data[187][2], node, "typeParameters", typeParameters, true);
  validate(_data[187][3], node, "params", params, true);
  validate(_data[187][4], node, "returnType", returnType, true);
  return node;
}
export { tsDeclareMethod as tSDeclareMethod };
export function tsQualifiedName(
  left: t.TSEntityName,
  right: t.Identifier,
): t.TSQualifiedName {
  const node: t.TSQualifiedName = {
    type: "TSQualifiedName",
    left,
    right,
  };
  validate(_data[188][0], node, "left", left, true);
  validate(_data[188][1], node, "right", right, true);
  return node;
}
export { tsQualifiedName as tSQualifiedName };
export function tsCallSignatureDeclaration(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  parameters: Array<
    t.ArrayPattern | t.Identifier | t.ObjectPattern | t.RestElement
  >,
  typeAnnotation: t.TSTypeAnnotation | null = null,
): t.TSCallSignatureDeclaration {
  const node: t.TSCallSignatureDeclaration = {
    type: "TSCallSignatureDeclaration",
    typeParameters,
    parameters,
    typeAnnotation,
  };
  validate(_data[189][0], node, "typeParameters", typeParameters, true);
  validate(_data[189][1], node, "parameters", parameters, true);
  validate(_data[189][2], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsCallSignatureDeclaration as tSCallSignatureDeclaration };
export function tsConstructSignatureDeclaration(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  parameters: Array<
    t.ArrayPattern | t.Identifier | t.ObjectPattern | t.RestElement
  >,
  typeAnnotation: t.TSTypeAnnotation | null = null,
): t.TSConstructSignatureDeclaration {
  const node: t.TSConstructSignatureDeclaration = {
    type: "TSConstructSignatureDeclaration",
    typeParameters,
    parameters,
    typeAnnotation,
  };
  validate(_data[190][0], node, "typeParameters", typeParameters, true);
  validate(_data[190][1], node, "parameters", parameters, true);
  validate(_data[190][2], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsConstructSignatureDeclaration as tSConstructSignatureDeclaration };
export function tsPropertySignature(
  key: t.Expression,
  typeAnnotation: t.TSTypeAnnotation | null = null,
): t.TSPropertySignature {
  const node: t.TSPropertySignature = {
    type: "TSPropertySignature",
    key,
    typeAnnotation,
    kind: null,
  };
  validate(_data[191][0], node, "key", key, true);
  validate(_data[191][1], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsPropertySignature as tSPropertySignature };
export function tsMethodSignature(
  key: t.Expression,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  parameters: Array<
    t.ArrayPattern | t.Identifier | t.ObjectPattern | t.RestElement
  >,
  typeAnnotation: t.TSTypeAnnotation | null = null,
): t.TSMethodSignature {
  const node: t.TSMethodSignature = {
    type: "TSMethodSignature",
    key,
    typeParameters,
    parameters,
    typeAnnotation,
    kind: null,
  };
  validate(_data[192][0], node, "key", key, true);
  validate(_data[192][1], node, "typeParameters", typeParameters, true);
  validate(_data[192][2], node, "parameters", parameters, true);
  validate(_data[192][3], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsMethodSignature as tSMethodSignature };
export function tsIndexSignature(
  parameters: Array<t.Identifier>,
  typeAnnotation: t.TSTypeAnnotation | null = null,
): t.TSIndexSignature {
  const node: t.TSIndexSignature = {
    type: "TSIndexSignature",
    parameters,
    typeAnnotation,
  };
  validate(_data[193][0], node, "parameters", parameters, true);
  validate(_data[193][1], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsIndexSignature as tSIndexSignature };
export function tsAnyKeyword(): t.TSAnyKeyword {
  return {
    type: "TSAnyKeyword",
  };
}
export { tsAnyKeyword as tSAnyKeyword };
export function tsBooleanKeyword(): t.TSBooleanKeyword {
  return {
    type: "TSBooleanKeyword",
  };
}
export { tsBooleanKeyword as tSBooleanKeyword };
export function tsBigIntKeyword(): t.TSBigIntKeyword {
  return {
    type: "TSBigIntKeyword",
  };
}
export { tsBigIntKeyword as tSBigIntKeyword };
export function tsIntrinsicKeyword(): t.TSIntrinsicKeyword {
  return {
    type: "TSIntrinsicKeyword",
  };
}
export { tsIntrinsicKeyword as tSIntrinsicKeyword };
export function tsNeverKeyword(): t.TSNeverKeyword {
  return {
    type: "TSNeverKeyword",
  };
}
export { tsNeverKeyword as tSNeverKeyword };
export function tsNullKeyword(): t.TSNullKeyword {
  return {
    type: "TSNullKeyword",
  };
}
export { tsNullKeyword as tSNullKeyword };
export function tsNumberKeyword(): t.TSNumberKeyword {
  return {
    type: "TSNumberKeyword",
  };
}
export { tsNumberKeyword as tSNumberKeyword };
export function tsObjectKeyword(): t.TSObjectKeyword {
  return {
    type: "TSObjectKeyword",
  };
}
export { tsObjectKeyword as tSObjectKeyword };
export function tsStringKeyword(): t.TSStringKeyword {
  return {
    type: "TSStringKeyword",
  };
}
export { tsStringKeyword as tSStringKeyword };
export function tsSymbolKeyword(): t.TSSymbolKeyword {
  return {
    type: "TSSymbolKeyword",
  };
}
export { tsSymbolKeyword as tSSymbolKeyword };
export function tsUndefinedKeyword(): t.TSUndefinedKeyword {
  return {
    type: "TSUndefinedKeyword",
  };
}
export { tsUndefinedKeyword as tSUndefinedKeyword };
export function tsUnknownKeyword(): t.TSUnknownKeyword {
  return {
    type: "TSUnknownKeyword",
  };
}
export { tsUnknownKeyword as tSUnknownKeyword };
export function tsVoidKeyword(): t.TSVoidKeyword {
  return {
    type: "TSVoidKeyword",
  };
}
export { tsVoidKeyword as tSVoidKeyword };
export function tsThisType(): t.TSThisType {
  return {
    type: "TSThisType",
  };
}
export { tsThisType as tSThisType };
export function tsFunctionType(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  parameters: Array<
    t.ArrayPattern | t.Identifier | t.ObjectPattern | t.RestElement
  >,
  typeAnnotation: t.TSTypeAnnotation | null = null,
): t.TSFunctionType {
  const node: t.TSFunctionType = {
    type: "TSFunctionType",
    typeParameters,
    parameters,
    typeAnnotation,
  };
  validate(_data[208][0], node, "typeParameters", typeParameters, true);
  validate(_data[208][1], node, "parameters", parameters, true);
  validate(_data[208][2], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsFunctionType as tSFunctionType };
export function tsConstructorType(
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  parameters: Array<
    t.ArrayPattern | t.Identifier | t.ObjectPattern | t.RestElement
  >,
  typeAnnotation: t.TSTypeAnnotation | null = null,
): t.TSConstructorType {
  const node: t.TSConstructorType = {
    type: "TSConstructorType",
    typeParameters,
    parameters,
    typeAnnotation,
  };
  validate(_data[209][0], node, "typeParameters", typeParameters, true);
  validate(_data[209][1], node, "parameters", parameters, true);
  validate(_data[209][2], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsConstructorType as tSConstructorType };
export function tsTypeReference(
  typeName: t.TSEntityName,
  typeParameters: t.TSTypeParameterInstantiation | null = null,
): t.TSTypeReference {
  const node: t.TSTypeReference = {
    type: "TSTypeReference",
    typeName,
    typeParameters,
  };
  validate(_data[210][0], node, "typeName", typeName, true);
  validate(_data[210][1], node, "typeParameters", typeParameters, true);
  return node;
}
export { tsTypeReference as tSTypeReference };
export function tsTypePredicate(
  parameterName: t.Identifier | t.TSThisType,
  typeAnnotation: t.TSTypeAnnotation | null = null,
  asserts: boolean | null = null,
): t.TSTypePredicate {
  const node: t.TSTypePredicate = {
    type: "TSTypePredicate",
    parameterName,
    typeAnnotation,
    asserts,
  };
  validate(_data[211][0], node, "parameterName", parameterName, true);
  validate(_data[211][1], node, "typeAnnotation", typeAnnotation, true);
  validate(_data[211][2], node, "asserts", asserts);
  return node;
}
export { tsTypePredicate as tSTypePredicate };
export function tsTypeQuery(
  exprName: t.TSEntityName | t.TSImportType,
  typeParameters: t.TSTypeParameterInstantiation | null = null,
): t.TSTypeQuery {
  const node: t.TSTypeQuery = {
    type: "TSTypeQuery",
    exprName,
    typeParameters,
  };
  validate(_data[212][0], node, "exprName", exprName, true);
  validate(_data[212][1], node, "typeParameters", typeParameters, true);
  return node;
}
export { tsTypeQuery as tSTypeQuery };
export function tsTypeLiteral(
  members: Array<t.TSTypeElement>,
): t.TSTypeLiteral {
  const node: t.TSTypeLiteral = {
    type: "TSTypeLiteral",
    members,
  };
  validate(_data[213][0], node, "members", members, true);
  return node;
}
export { tsTypeLiteral as tSTypeLiteral };
export function tsArrayType(elementType: t.TSType): t.TSArrayType {
  const node: t.TSArrayType = {
    type: "TSArrayType",
    elementType,
  };
  validate(_data[214][0], node, "elementType", elementType, true);
  return node;
}
export { tsArrayType as tSArrayType };
export function tsTupleType(
  elementTypes: Array<t.TSType | t.TSNamedTupleMember>,
): t.TSTupleType {
  const node: t.TSTupleType = {
    type: "TSTupleType",
    elementTypes,
  };
  validate(_data[215][0], node, "elementTypes", elementTypes, true);
  return node;
}
export { tsTupleType as tSTupleType };
export function tsOptionalType(typeAnnotation: t.TSType): t.TSOptionalType {
  const node: t.TSOptionalType = {
    type: "TSOptionalType",
    typeAnnotation,
  };
  validate(_data[216][0], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsOptionalType as tSOptionalType };
export function tsRestType(typeAnnotation: t.TSType): t.TSRestType {
  const node: t.TSRestType = {
    type: "TSRestType",
    typeAnnotation,
  };
  validate(_data[217][0], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsRestType as tSRestType };
export function tsNamedTupleMember(
  label: t.Identifier,
  elementType: t.TSType,
  optional: boolean = false,
): t.TSNamedTupleMember {
  const node: t.TSNamedTupleMember = {
    type: "TSNamedTupleMember",
    label,
    elementType,
    optional,
  };
  validate(_data[218][0], node, "label", label, true);
  validate(_data[218][1], node, "elementType", elementType, true);
  validate(_data[218][2], node, "optional", optional);
  return node;
}
export { tsNamedTupleMember as tSNamedTupleMember };
export function tsUnionType(types: Array<t.TSType>): t.TSUnionType {
  const node: t.TSUnionType = {
    type: "TSUnionType",
    types,
  };
  validate(_data[219][0], node, "types", types, true);
  return node;
}
export { tsUnionType as tSUnionType };
export function tsIntersectionType(
  types: Array<t.TSType>,
): t.TSIntersectionType {
  const node: t.TSIntersectionType = {
    type: "TSIntersectionType",
    types,
  };
  validate(_data[220][0], node, "types", types, true);
  return node;
}
export { tsIntersectionType as tSIntersectionType };
export function tsConditionalType(
  checkType: t.TSType,
  extendsType: t.TSType,
  trueType: t.TSType,
  falseType: t.TSType,
): t.TSConditionalType {
  const node: t.TSConditionalType = {
    type: "TSConditionalType",
    checkType,
    extendsType,
    trueType,
    falseType,
  };
  validate(_data[221][0], node, "checkType", checkType, true);
  validate(_data[221][1], node, "extendsType", extendsType, true);
  validate(_data[221][2], node, "trueType", trueType, true);
  validate(_data[221][3], node, "falseType", falseType, true);
  return node;
}
export { tsConditionalType as tSConditionalType };
export function tsInferType(typeParameter: t.TSTypeParameter): t.TSInferType {
  const node: t.TSInferType = {
    type: "TSInferType",
    typeParameter,
  };
  validate(_data[222][0], node, "typeParameter", typeParameter, true);
  return node;
}
export { tsInferType as tSInferType };
export function tsParenthesizedType(
  typeAnnotation: t.TSType,
): t.TSParenthesizedType {
  const node: t.TSParenthesizedType = {
    type: "TSParenthesizedType",
    typeAnnotation,
  };
  validate(_data[223][0], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsParenthesizedType as tSParenthesizedType };
export function tsTypeOperator(typeAnnotation: t.TSType): t.TSTypeOperator {
  const node: t.TSTypeOperator = {
    type: "TSTypeOperator",
    typeAnnotation,
    operator: null,
  };
  validate(_data[224][0], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsTypeOperator as tSTypeOperator };
export function tsIndexedAccessType(
  objectType: t.TSType,
  indexType: t.TSType,
): t.TSIndexedAccessType {
  const node: t.TSIndexedAccessType = {
    type: "TSIndexedAccessType",
    objectType,
    indexType,
  };
  validate(_data[225][0], node, "objectType", objectType, true);
  validate(_data[225][1], node, "indexType", indexType, true);
  return node;
}
export { tsIndexedAccessType as tSIndexedAccessType };
export function tsMappedType(
  typeParameter: t.TSTypeParameter,
  typeAnnotation: t.TSType | null = null,
  nameType: t.TSType | null = null,
): t.TSMappedType {
  const node: t.TSMappedType = {
    type: "TSMappedType",
    typeParameter,
    typeAnnotation,
    nameType,
  };
  validate(_data[226][0], node, "typeParameter", typeParameter, true);
  validate(_data[226][1], node, "typeAnnotation", typeAnnotation, true);
  validate(_data[226][2], node, "nameType", nameType, true);
  return node;
}
export { tsMappedType as tSMappedType };
export function tsLiteralType(
  literal:
    | t.NumericLiteral
    | t.StringLiteral
    | t.BooleanLiteral
    | t.BigIntLiteral
    | t.TemplateLiteral
    | t.UnaryExpression,
): t.TSLiteralType {
  const node: t.TSLiteralType = {
    type: "TSLiteralType",
    literal,
  };
  validate(_data[227][0], node, "literal", literal, true);
  return node;
}
export { tsLiteralType as tSLiteralType };
export function tsExpressionWithTypeArguments(
  expression: t.TSEntityName,
  typeParameters: t.TSTypeParameterInstantiation | null = null,
): t.TSExpressionWithTypeArguments {
  const node: t.TSExpressionWithTypeArguments = {
    type: "TSExpressionWithTypeArguments",
    expression,
    typeParameters,
  };
  validate(_data[228][0], node, "expression", expression, true);
  validate(_data[228][1], node, "typeParameters", typeParameters, true);
  return node;
}
export { tsExpressionWithTypeArguments as tSExpressionWithTypeArguments };
export function tsInterfaceDeclaration(
  id: t.Identifier,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  _extends: Array<t.TSExpressionWithTypeArguments> | null | undefined = null,
  body: t.TSInterfaceBody,
): t.TSInterfaceDeclaration {
  const node: t.TSInterfaceDeclaration = {
    type: "TSInterfaceDeclaration",
    id,
    typeParameters,
    extends: _extends,
    body,
  };
  validate(_data[229][0], node, "id", id, true);
  validate(_data[229][1], node, "typeParameters", typeParameters, true);
  validate(_data[229][2], node, "extends", _extends, true);
  validate(_data[229][3], node, "body", body, true);
  return node;
}
export { tsInterfaceDeclaration as tSInterfaceDeclaration };
export function tsInterfaceBody(
  body: Array<t.TSTypeElement>,
): t.TSInterfaceBody {
  const node: t.TSInterfaceBody = {
    type: "TSInterfaceBody",
    body,
  };
  validate(_data[230][0], node, "body", body, true);
  return node;
}
export { tsInterfaceBody as tSInterfaceBody };
export function tsTypeAliasDeclaration(
  id: t.Identifier,
  typeParameters: t.TSTypeParameterDeclaration | null | undefined = null,
  typeAnnotation: t.TSType,
): t.TSTypeAliasDeclaration {
  const node: t.TSTypeAliasDeclaration = {
    type: "TSTypeAliasDeclaration",
    id,
    typeParameters,
    typeAnnotation,
  };
  validate(_data[231][0], node, "id", id, true);
  validate(_data[231][1], node, "typeParameters", typeParameters, true);
  validate(_data[231][2], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsTypeAliasDeclaration as tSTypeAliasDeclaration };
export function tsInstantiationExpression(
  expression: t.Expression,
  typeParameters: t.TSTypeParameterInstantiation | null = null,
): t.TSInstantiationExpression {
  const node: t.TSInstantiationExpression = {
    type: "TSInstantiationExpression",
    expression,
    typeParameters,
  };
  validate(_data[232][0], node, "expression", expression, true);
  validate(_data[232][1], node, "typeParameters", typeParameters, true);
  return node;
}
export { tsInstantiationExpression as tSInstantiationExpression };
export function tsAsExpression(
  expression: t.Expression,
  typeAnnotation: t.TSType,
): t.TSAsExpression {
  const node: t.TSAsExpression = {
    type: "TSAsExpression",
    expression,
    typeAnnotation,
  };
  validate(_data[233][0], node, "expression", expression, true);
  validate(_data[233][1], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsAsExpression as tSAsExpression };
export function tsSatisfiesExpression(
  expression: t.Expression,
  typeAnnotation: t.TSType,
): t.TSSatisfiesExpression {
  const node: t.TSSatisfiesExpression = {
    type: "TSSatisfiesExpression",
    expression,
    typeAnnotation,
  };
  validate(_data[234][0], node, "expression", expression, true);
  validate(_data[234][1], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsSatisfiesExpression as tSSatisfiesExpression };
export function tsTypeAssertion(
  typeAnnotation: t.TSType,
  expression: t.Expression,
): t.TSTypeAssertion {
  const node: t.TSTypeAssertion = {
    type: "TSTypeAssertion",
    typeAnnotation,
    expression,
  };
  validate(_data[235][0], node, "typeAnnotation", typeAnnotation, true);
  validate(_data[235][1], node, "expression", expression, true);
  return node;
}
export { tsTypeAssertion as tSTypeAssertion };
export function tsEnumDeclaration(
  id: t.Identifier,
  members: Array<t.TSEnumMember>,
): t.TSEnumDeclaration {
  const node: t.TSEnumDeclaration = {
    type: "TSEnumDeclaration",
    id,
    members,
  };
  validate(_data[236][0], node, "id", id, true);
  validate(_data[236][1], node, "members", members, true);
  return node;
}
export { tsEnumDeclaration as tSEnumDeclaration };
export function tsEnumMember(
  id: t.Identifier | t.StringLiteral,
  initializer: t.Expression | null = null,
): t.TSEnumMember {
  const node: t.TSEnumMember = {
    type: "TSEnumMember",
    id,
    initializer,
  };
  validate(_data[237][0], node, "id", id, true);
  validate(_data[237][1], node, "initializer", initializer, true);
  return node;
}
export { tsEnumMember as tSEnumMember };
export function tsModuleDeclaration(
  id: t.Identifier | t.StringLiteral,
  body: t.TSModuleBlock | t.TSModuleDeclaration,
): t.TSModuleDeclaration {
  const node: t.TSModuleDeclaration = {
    type: "TSModuleDeclaration",
    id,
    body,
  };
  validate(_data[238][0], node, "id", id, true);
  validate(_data[238][1], node, "body", body, true);
  return node;
}
export { tsModuleDeclaration as tSModuleDeclaration };
export function tsModuleBlock(body: Array<t.Statement>): t.TSModuleBlock {
  const node: t.TSModuleBlock = {
    type: "TSModuleBlock",
    body,
  };
  validate(_data[239][0], node, "body", body, true);
  return node;
}
export { tsModuleBlock as tSModuleBlock };
export function tsImportType(
  argument: t.StringLiteral,
  qualifier: t.TSEntityName | null = null,
  typeParameters: t.TSTypeParameterInstantiation | null = null,
): t.TSImportType {
  const node: t.TSImportType = {
    type: "TSImportType",
    argument,
    qualifier,
    typeParameters,
  };
  validate(_data[240][0], node, "argument", argument, true);
  validate(_data[240][1], node, "qualifier", qualifier, true);
  validate(_data[240][2], node, "typeParameters", typeParameters, true);
  return node;
}
export { tsImportType as tSImportType };
export function tsImportEqualsDeclaration(
  id: t.Identifier,
  moduleReference: t.TSEntityName | t.TSExternalModuleReference,
): t.TSImportEqualsDeclaration {
  const node: t.TSImportEqualsDeclaration = {
    type: "TSImportEqualsDeclaration",
    id,
    moduleReference,
    isExport: null,
  };
  validate(_data[241][0], node, "id", id, true);
  validate(_data[241][1], node, "moduleReference", moduleReference, true);
  return node;
}
export { tsImportEqualsDeclaration as tSImportEqualsDeclaration };
export function tsExternalModuleReference(
  expression: t.StringLiteral,
): t.TSExternalModuleReference {
  const node: t.TSExternalModuleReference = {
    type: "TSExternalModuleReference",
    expression,
  };
  validate(_data[242][0], node, "expression", expression, true);
  return node;
}
export { tsExternalModuleReference as tSExternalModuleReference };
export function tsNonNullExpression(
  expression: t.Expression,
): t.TSNonNullExpression {
  const node: t.TSNonNullExpression = {
    type: "TSNonNullExpression",
    expression,
  };
  validate(_data[243][0], node, "expression", expression, true);
  return node;
}
export { tsNonNullExpression as tSNonNullExpression };
export function tsExportAssignment(
  expression: t.Expression,
): t.TSExportAssignment {
  const node: t.TSExportAssignment = {
    type: "TSExportAssignment",
    expression,
  };
  validate(_data[244][0], node, "expression", expression, true);
  return node;
}
export { tsExportAssignment as tSExportAssignment };
export function tsNamespaceExportDeclaration(
  id: t.Identifier,
): t.TSNamespaceExportDeclaration {
  const node: t.TSNamespaceExportDeclaration = {
    type: "TSNamespaceExportDeclaration",
    id,
  };
  validate(_data[245][0], node, "id", id, true);
  return node;
}
export { tsNamespaceExportDeclaration as tSNamespaceExportDeclaration };
export function tsTypeAnnotation(typeAnnotation: t.TSType): t.TSTypeAnnotation {
  const node: t.TSTypeAnnotation = {
    type: "TSTypeAnnotation",
    typeAnnotation,
  };
  validate(_data[246][0], node, "typeAnnotation", typeAnnotation, true);
  return node;
}
export { tsTypeAnnotation as tSTypeAnnotation };
export function tsTypeParameterInstantiation(
  params: Array<t.TSType>,
): t.TSTypeParameterInstantiation {
  const node: t.TSTypeParameterInstantiation = {
    type: "TSTypeParameterInstantiation",
    params,
  };
  validate(_data[247][0], node, "params", params, true);
  return node;
}
export { tsTypeParameterInstantiation as tSTypeParameterInstantiation };
export function tsTypeParameterDeclaration(
  params: Array<t.TSTypeParameter>,
): t.TSTypeParameterDeclaration {
  const node: t.TSTypeParameterDeclaration = {
    type: "TSTypeParameterDeclaration",
    params,
  };
  validate(_data[248][0], node, "params", params, true);
  return node;
}
export { tsTypeParameterDeclaration as tSTypeParameterDeclaration };
export function tsTypeParameter(
  constraint: t.TSType | null | undefined = null,
  _default: t.TSType | null | undefined = null,
  name: string,
): t.TSTypeParameter {
  const node: t.TSTypeParameter = {
    type: "TSTypeParameter",
    constraint,
    default: _default,
    name,
  };
  validate(_data[249][0], node, "constraint", constraint, true);
  validate(_data[249][1], node, "default", _default, true);
  validate(_data[249][2], node, "name", name);
  return node;
}
export { tsTypeParameter as tSTypeParameter };
/** @deprecated */
function NumberLiteral(value: number) {
  deprecationWarning("NumberLiteral", "NumericLiteral", "The node type ");
  return numericLiteral(value);
}
export { NumberLiteral as numberLiteral };
/** @deprecated */
function RegexLiteral(pattern: string, flags: string = "") {
  deprecationWarning("RegexLiteral", "RegExpLiteral", "The node type ");
  return regExpLiteral(pattern, flags);
}
export { RegexLiteral as regexLiteral };
/** @deprecated */
function RestProperty(argument: t.LVal) {
  deprecationWarning("RestProperty", "RestElement", "The node type ");
  return restElement(argument);
}
export { RestProperty as restProperty };
/** @deprecated */
function SpreadProperty(argument: t.Expression) {
  deprecationWarning("SpreadProperty", "SpreadElement", "The node type ");
  return spreadElement(argument);
}
export { SpreadProperty as spreadProperty };
