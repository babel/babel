// @flow

import * as charCodes from "charcodes";
import * as N from "../types";
import { types as tt } from "../util/token-types";

import { original } from "::build-tool::";
import { finishOp, next, match, eat } from "::build-tool::bindings/tokenizer";
import {
  input,
  state,
  startNode,
  startNodeAtNode,
  finishNode,
  assertNoSpace,
  unexpected,
  expect,
  expectPlugin,
  expectContextual,
  isContextual,
  parseStatement,
  parseClassId,
  parseClassSuper,
  parseClassBody,
  takeDecorators,
  semicolon,
  maybeParseStarImportSpecifier,
  parseNamedImportSpecifiers,
} from "::build-tool::bindings/parser";

export type PlaceholderTypes =
  | "Identifier"
  | "StringLiteral"
  | "Expression"
  | "Statement"
  | "Declaration"
  | "BlockStatement"
  | "ClassBody"
  | "Pattern";

// $PropertyType doesn't support enums. Use a fake "switch" (GetPlaceholderNode)
//type MaybePlaceholder<T: PlaceholderTypes> = $PropertyType<N, T> | N.Placeholder<T>;

type _Switch<Value, Cases, Index> = $Call<
  (
    $ElementType<$ElementType<Cases, Index>, 0>,
  ) => $ElementType<$ElementType<Cases, Index>, 1>,
  Value,
>;
type $Switch<Value, Cases> = _Switch<Value, Cases, *>;

type NodeOf<T: PlaceholderTypes> = $Switch<
  T,
  [
    ["Identifier", N.Identifier],
    ["StringLiteral", N.StringLiteral],
    ["Expression", N.Expression],
    ["Statement", N.Statement],
    ["Declaration", N.Declaration],
    ["BlockStatement", N.BlockStatement],
    ["ClassBody", N.ClassBody],
    ["Pattern", N.Pattern],
  ],
>;

// Placeholder<T> breaks everything, because its type is incompatible with
// the substituted nodes.
type MaybePlaceholder<T: PlaceholderTypes> = NodeOf<T>; // | Placeholder<T>

function parsePlaceholder<T: PlaceholderTypes>(
  expectedNode: T,
): /*?N.Placeholder<T>*/ ?MaybePlaceholder<T> {
  if (match(tt.placeholder)) {
    const node = startNode();
    next();
    assertNoSpace("Unexpected space in placeholder.");

    // We can't use parseIdentifier because
    // we don't want nested placeholders.
    node.name = original(parseIdentifier)(/* liberal */ true);

    assertNoSpace("Unexpected space in placeholder.");
    expect(tt.placeholder);
    return finishPlaceholder(node, expectedNode);
  }
}

function finishPlaceholder<T: PlaceholderTypes>(
  node: N.Node,
  expectedNode: T,
): /*N.Placeholder<T>*/ MaybePlaceholder<T> {
  node.expectedNode = expectedNode;
  return finishNode(node, "Placeholder");
}

/* ============================================================ *
 * tokenizer/index.js                                           *
 * ============================================================ */

export function getTokenFromCode(code: number) {
  if (
    code === charCodes.percentSign &&
    input.charCodeAt(state.pos + 1) === charCodes.percentSign
  ) {
    return finishOp(tt.placeholder, 2);
  }

  return original(getTokenFromCode)(...arguments);
}

/* ============================================================ *
 * parser/expression.js                                         *
 * ============================================================ */

export function parseExprAtom(): MaybePlaceholder<"Expression"> {
  return (
    parsePlaceholder("Expression") || original(parseExprAtom)(...arguments)
  );
}

export function parseIdentifier(
  // eslint-disable-next-line no-unused-vars
  liberal?: boolean,
): MaybePlaceholder<"Identifier"> {
  // NOTE: This function only handles identifiers outside of
  // expressions and binding patterns, since they are already
  // handled by the parseExprAtom and parseBindingAtom functions.
  // This is needed, for example, to parse "class %%NAME%% {}".
  return (
    parsePlaceholder("Identifier") || original(parseIdentifier)(...arguments)
  );
}

export function checkReservedWord(word: string): void {
  // Sometimes we call #checkReservedWord(node.name), expecting
  // that node is an Identifier. If it is a Placeholder, name
  // will be undefined.
  if (word !== undefined) original(checkReservedWord)(...arguments);
}

/* ============================================================ *
 * parser/lval.js                                               *
 * ============================================================ */

export function parseBindingAtom(): MaybePlaceholder<"Pattern"> {
  return (
    parsePlaceholder("Pattern") || original(parseBindingAtom)(...arguments)
  );
}

export function checkLVal(expr: N.Expression): void {
  if (expr.type !== "Placeholder") original(checkLVal)(...arguments);
}

export function toAssignable(node: N.Node): N.Node {
  if (
    node &&
    node.type === "Placeholder" &&
    node.expectedNode === "Expression"
  ) {
    node.expectedNode = "Pattern";
    return node;
  }
  return original(toAssignable)(...arguments);
}

/* ============================================================ *
 * parser/statement.js                                          *
 * ============================================================ */

export function verifyBreakContinue(
  node: N.BreakStatement | N.ContinueStatement,
) {
  if (node.label && node.label.type === "Placeholder") return;
  original(verifyBreakContinue)(...arguments);
}

export function parseExpressionStatement(
  node: MaybePlaceholder<"Statement">,
  expr: N.Expression,
): MaybePlaceholder<"Statement"> {
  if (expr.type !== "Placeholder" || (expr.extra && expr.extra.parenthesized)) {
    return original(parseExpressionStatement)(...arguments);
  }

  if (match(tt.colon)) {
    const stmt: N.LabeledStatement = node;
    stmt.label = finishPlaceholder(expr, "Identifier");
    next();
    stmt.body = parseStatement("label");
    return finishNode(stmt, "LabeledStatement");
  }

  semicolon();

  node.name = expr.name;
  return finishPlaceholder(node, "Statement");
}

export function parseBlock(): MaybePlaceholder<"BlockStatement"> {
  return (
    parsePlaceholder("BlockStatement") || original(parseBlock)(...arguments)
  );
}

export function parseFunctionId(): ?MaybePlaceholder<"Identifier"> {
  return (
    parsePlaceholder("Identifier") || original(parseFunctionId)(...arguments)
  );
}

export function parseClass<T: N.Class>(
  node: T,
  isStatement: /* T === ClassDeclaration */ boolean,
  optionalId?: boolean,
): T {
  const type = isStatement ? "ClassDeclaration" : "ClassExpression";

  next();
  takeDecorators(node);

  const placeholder = parsePlaceholder("Identifier");
  if (placeholder) {
    if (match(tt._extends) || match(tt.placeholder) || match(tt.braceL)) {
      node.id = placeholder;
    } else if (optionalId || !isStatement) {
      node.id = null;
      node.body = finishPlaceholder(placeholder, "ClassBody");
      return finishNode(node, type);
    } else {
      unexpected(null, "A class name is required");
    }
  } else {
    parseClassId(node, isStatement, optionalId);
  }

  parseClassSuper(node);
  node.body =
    parsePlaceholder("ClassBody") || parseClassBody(!!node.superClass);
  return finishNode(node, type);
}

export function parseExport(node: N.Node): N.Node {
  const placeholder = parsePlaceholder("Identifier");
  if (!placeholder) return original(parseExport)(...arguments);

  if (!isContextual("from") && !match(tt.comma)) {
    // export %%DECL%%;
    node.specifiers = [];
    node.source = null;
    node.declaration = finishPlaceholder(placeholder, "Declaration");
    return finishNode(node, "ExportNamedDeclaration");
  }

  // export %%NAME%% from "foo";
  expectPlugin("exportDefaultFrom");
  const specifier = startNode();
  specifier.exported = placeholder;
  node.specifiers = [finishNode(specifier, "ExportDefaultSpecifier")];

  return original(parseExport)(node);
}

export function maybeParseExportDefaultSpecifier(node: N.Node): boolean {
  if (node.specifiers && node.specifiers.length > 0) {
    // "export %%NAME%%" has already been parsed by #parseExport.
    return true;
  }
  return original(maybeParseExportDefaultSpecifier)(...arguments);
}

export function checkExport(node: N.ExportNamedDeclaration): void {
  const { specifiers } = node;
  if (specifiers && specifiers.length) {
    node.specifiers = specifiers.filter(
      node => node.exported.type === "Placeholder",
    );
  }
  original(checkExport)(node);
  node.specifiers = specifiers;
}

export function parseImport(
  node: N.Node,
): N.ImportDeclaration | N.TsImportEqualsDeclaration {
  const placeholder = parsePlaceholder("Identifier");
  if (!placeholder) return original(parseImport)(...arguments);

  node.specifiers = [];

  if (!isContextual("from") && !match(tt.comma)) {
    // import %%STRING%%;
    node.source = finishPlaceholder(placeholder, "StringLiteral");
    semicolon();
    return finishNode(node, "ImportDeclaration");
  }

  // import %%DEFAULT%% ...
  const specifier = startNodeAtNode(placeholder);
  specifier.local = placeholder;
  finishNode(specifier, "ImportDefaultSpecifier");
  node.specifiers.push(specifier);

  if (eat(tt.comma)) {
    // import %%DEFAULT%%, * as ...
    const hasStarImport = maybeParseStarImportSpecifier(node);

    // import %%DEFAULT%%, { ...
    if (!hasStarImport) parseNamedImportSpecifiers(node);
  }

  expectContextual("from");
  node.source = parseImportSource();
  semicolon();
  return finishNode(node, "ImportDeclaration");
}

export function parseImportSource(): MaybePlaceholder<"StringLiteral"> {
  // import ... from %%STRING%%;

  return (
    parsePlaceholder("StringLiteral") ||
    original(parseImportSource)(...arguments)
  );
}
