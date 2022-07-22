import * as charCodes from "charcodes";

import { tokenLabelName, tt } from "../tokenizer/types";
import type Parser from "../parser";
import * as N from "../types";
import { ParseErrorEnum, toParseErrorCredentials } from "../parse-error";
import type { Undone } from "../parser/node";
import type { Position } from "../util/location";

type $Call1<F extends (...args: any) => any, A> = F extends (
  a: A,
  ...args: any
) => infer R
  ? R
  : never;

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

type _Switch<Value, Cases, Index> = $Call1<
  // @ts-expect-error Fixme broken fake switch
  (a: Cases[Index][0]) => Cases[Index][1],
  Value
>;

type $Switch<Value, Cases> = _Switch<Value, Cases, any>;
type NodeOf<T extends PlaceholderTypes> = $Switch<
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
  ]
>;

// Placeholder<T> breaks everything, because its type is incompatible with
// the substituted nodes.
type MaybePlaceholder<T extends PlaceholderTypes> = NodeOf<T>; // | Placeholder<T>

/* eslint sort-keys: "error" */
const PlaceholderErrors = ParseErrorEnum`placeholders`(
  (_: typeof toParseErrorCredentials) => ({
    ClassNameIsRequired: _("A class name is required."),
    UnexpectedSpace: _("Unexpected space in placeholder."),
  }),
);
/* eslint-disable sort-keys */

export default (superClass: {
  new (...args: any): Parser;
}): {
  new (...args: any): Parser;
} =>
  // @ts-expect-error Plugin will override parser interface
  class extends superClass {
    parsePlaceholder<T extends PlaceholderTypes>(
      expectedNode: T,
    ): /*?N.Placeholder<T>*/ MaybePlaceholder<T> | undefined | null {
      if (this.match(tt.placeholder)) {
        const node = this.startNode();
        this.next();
        this.assertNoSpace();

        // We can't use this.parseIdentifier because
        // we don't want nested placeholders.
        node.name = super.parseIdentifier(/* liberal */ true);

        this.assertNoSpace();
        this.expect(tt.placeholder);
        // @ts-expect-error placeholder typings
        return this.finishPlaceholder(node, expectedNode);
      }
    }

    finishPlaceholder<T extends PlaceholderTypes>(
      node: N.Node,
      expectedNode: T,
    ): /*N.Placeholder<T>*/ MaybePlaceholder<T> {
      const isFinished = !!(node.expectedNode && node.type === "Placeholder");
      node.expectedNode = expectedNode;

      return isFinished ? node : this.finishNode(node, "Placeholder");
    }

    /* ============================================================ *
     * tokenizer/index.js                                           *
     * ============================================================ */

    getTokenFromCode(code: number) {
      if (
        code === charCodes.percentSign &&
        this.input.charCodeAt(this.state.pos + 1) === charCodes.percentSign
      ) {
        return this.finishOp(tt.placeholder, 2);
      }
      // @ts-expect-error placeholder typings
      return super.getTokenFromCode(...arguments);
    }

    /* ============================================================ *
     * parser/expression.js                                         *
     * ============================================================ */

    parseExprAtom(): MaybePlaceholder<"Expression"> {
      return (
        this.parsePlaceholder("Expression") || super.parseExprAtom(...arguments)
      );
    }

    // @ts-expect-error Plugin will override parser interface
    parseIdentifier(): MaybePlaceholder<"Identifier"> {
      // NOTE: This function only handles identifiers outside of
      // expressions and binding patterns, since they are already
      // handled by the parseExprAtom and parseBindingAtom functions.
      // This is needed, for example, to parse "class %%NAME%% {}".
      return (
        this.parsePlaceholder("Identifier") ||
        super.parseIdentifier(...arguments)
      );
    }

    checkReservedWord(
      word: string,
      startLoc: Position,
      checkKeywords: boolean,
      isBinding: boolean,
    ): void {
      // Sometimes we call #checkReservedWord(node.name), expecting
      // that node is an Identifier. If it is a Placeholder, name
      // will be undefined.
      if (word !== undefined) {
        super.checkReservedWord(word, startLoc, checkKeywords, isBinding);
      }
    }

    /* ============================================================ *
     * parser/lval.js                                               *
     * ============================================================ */

    // @ts-expect-error Plugin will override parser interface
    parseBindingAtom(): MaybePlaceholder<"Pattern"> {
      return this.parsePlaceholder("Pattern") || super.parseBindingAtom();
    }

    // @ts-expect-error Plugin will override parser interface
    isValidLVal(type: string, ...rest: [boolean, BindingTypes]) {
      return type === "Placeholder" || super.isValidLVal(type, ...rest);
    }

    toAssignable(node: N.Node, isLHS: boolean): void {
      if (
        node &&
        node.type === "Placeholder" &&
        node.expectedNode === "Expression"
      ) {
        node.expectedNode = "Pattern";
      } else {
        super.toAssignable(node, isLHS);
      }
    }

    /* ============================================================ *
     * parser/statement.js                                          *
     * ============================================================ */

    isLet(context?: string | null): boolean {
      if (super.isLet(context)) {
        return true;
      }

      // Replicate the original checks that lead to looking ahead for an
      // identifier.
      if (!this.isContextual(tt._let)) {
        return false;
      }
      if (context) return false;

      // Accept "let %%" as the start of "let %%placeholder%%", as though the
      // placeholder were an identifier.
      const nextToken = this.lookahead();
      if (nextToken.type === tt.placeholder) {
        return true;
      }

      return false;
    }

    verifyBreakContinue(
      node: N.BreakStatement | N.ContinueStatement,
      isBreak: boolean,
    ) {
      // @ts-expect-error: node.label could be Placeholder
      if (node.label && node.label.type === "Placeholder") return;
      super.verifyBreakContinue(node, isBreak);
    }

    // @ts-expect-error Plugin will override parser interface
    parseExpressionStatement(
      node: MaybePlaceholder<"Statement">,
      expr: N.Expression,
    ): MaybePlaceholder<"Statement"> {
      if (
        expr.type !== "Placeholder" ||
        (expr.extra && expr.extra.parenthesized)
      ) {
        // @ts-expect-error placeholder typings
        return super.parseExpressionStatement(node, expr);
      }

      if (this.match(tt.colon)) {
        // @ts-expect-error
        const stmt: N.LabeledStatement = node;
        // @ts-expect-error: Fixme: placeholder typings
        stmt.label = this.finishPlaceholder(expr, "Identifier");
        this.next();
        stmt.body = super.parseStatement("label");
        return this.finishNode(stmt, "LabeledStatement");
      }

      this.semicolon();
      // @ts-expect-error: Fixme: placeholder typings
      node.name = expr.name;
      return this.finishPlaceholder(node, "Statement");
    }
    // @ts-expect-error Plugin will override parser interface
    parseBlock(): MaybePlaceholder<"BlockStatement"> {
      return (
        this.parsePlaceholder("BlockStatement") ||
        super.parseBlock(...arguments)
      );
    }
    // @ts-expect-error Plugin will override parser interface
    parseFunctionId(): MaybePlaceholder<"Identifier"> | undefined | null {
      return (
        this.parsePlaceholder("Identifier") ||
        super.parseFunctionId(...arguments)
      );
    }
    // @ts-expect-error Plugin will override parser interface
    parseClass<T extends N.Class>(
      node: T,
      isStatement: /* T === ClassDeclaration */ boolean,
      optionalId?: boolean,
    ): T {
      const type = isStatement ? "ClassDeclaration" : "ClassExpression";

      this.next();
      this.takeDecorators(node);
      const oldStrict = this.state.strict;

      const placeholder = this.parsePlaceholder("Identifier");
      if (placeholder) {
        if (
          this.match(tt._extends) ||
          this.match(tt.placeholder) ||
          this.match(tt.braceL)
        ) {
          // @ts-expect-error: placeholder typings
          node.id = placeholder;
        } else if (optionalId || !isStatement) {
          node.id = null;
          // @ts-expect-error: placeholder typings
          node.body = this.finishPlaceholder(placeholder, "ClassBody");
          return this.finishNode(node, type);
        } else {
          throw this.raise(PlaceholderErrors.ClassNameIsRequired, {
            at: this.state.startLoc,
          });
        }
      } else {
        this.parseClassId(node, isStatement, optionalId);
      }

      super.parseClassSuper(node);
      // @ts-expect-error placeholder typings
      node.body =
        this.parsePlaceholder("ClassBody") ||
        super.parseClassBody(!!node.superClass, oldStrict);
      return this.finishNode(node, type);
    }
    // @ts-expect-error Plugin will override parser interface
    parseExport(node: N.Node): N.Node {
      const placeholder = this.parsePlaceholder("Identifier");
      // @ts-expect-error placeholder typings
      if (!placeholder) return super.parseExport(...arguments);

      if (!this.isContextual(tt._from) && !this.match(tt.comma)) {
        // export %%DECL%%;
        node.specifiers = [];
        node.source = null;
        node.declaration = this.finishPlaceholder(placeholder, "Declaration");
        return this.finishNode(node, "ExportNamedDeclaration");
      }

      // export %%NAME%% from "foo";
      this.expectPlugin("exportDefaultFrom");
      const specifier = this.startNode();
      specifier.exported = placeholder;
      node.specifiers = [this.finishNode(specifier, "ExportDefaultSpecifier")];

      return super.parseExport(node);
    }

    isExportDefaultSpecifier(): boolean {
      if (this.match(tt._default)) {
        const next = this.nextTokenStart();
        if (this.isUnparsedContextual(next, "from")) {
          if (
            this.input.startsWith(
              tokenLabelName(tt.placeholder),
              this.nextTokenStartSince(next + 4),
            )
          ) {
            return true;
          }
        }
      }
      return super.isExportDefaultSpecifier();
    }

    maybeParseExportDefaultSpecifier(node: N.Node): boolean {
      if (node.specifiers && node.specifiers.length > 0) {
        // "export %%NAME%%" has already been parsed by #parseExport.
        return true;
      }
      return super.maybeParseExportDefaultSpecifier(node);
    }

    checkExport(node: N.ExportNamedDeclaration): void {
      const { specifiers } = node;
      if (specifiers?.length) {
        node.specifiers = specifiers.filter(
          // @ts-expect-error placeholder typings
          node => node.exported.type === "Placeholder",
        );
      }
      super.checkExport(node);
      node.specifiers = specifiers;
    }

    parseImport(
      node: Undone<N.ImportDeclaration>,
    ): N.ImportDeclaration | N.TsImportEqualsDeclaration {
      const placeholder = this.parsePlaceholder("Identifier");
      // @ts-expect-error placeholder typings
      if (!placeholder) return super.parseImport(...arguments);

      node.specifiers = [];

      if (!this.isContextual(tt._from) && !this.match(tt.comma)) {
        // import %%STRING%%;
        // @ts-expect-error placeholder typings
        node.source = this.finishPlaceholder(placeholder, "StringLiteral");
        this.semicolon();
        return this.finishNode(node, "ImportDeclaration");
      }

      // import %%DEFAULT%% ...
      const specifier =
        this.startNodeAtNode<N.ImportDefaultSpecifier>(placeholder);
      // @ts-expect-error placeholder typings
      specifier.local = placeholder;
      node.specifiers.push(
        this.finishNode(specifier, "ImportDefaultSpecifier"),
      );

      if (this.eat(tt.comma)) {
        // import %%DEFAULT%%, * as ...
        const hasStarImport = this.maybeParseStarImportSpecifier(node);

        // import %%DEFAULT%%, { ...
        if (!hasStarImport) this.parseNamedImportSpecifiers(node);
      }

      this.expectContextual(tt._from);
      // @ts-expect-error placeholder typings
      node.source = this.parseImportSource();
      this.semicolon();
      return this.finishNode(node, "ImportDeclaration");
    }

    // @ts-expect-error placeholder typings
    parseImportSource(): MaybePlaceholder<"StringLiteral"> {
      // import ... from %%STRING%%;

      return (
        this.parsePlaceholder("StringLiteral") ||
        // @ts-expect-error placeholder typings
        super.parseImportSource(...arguments)
      );
    }

    // Throws if the current token and the prev one are separated by a space.
    assertNoSpace(): void {
      if (this.state.start > this.state.lastTokEndLoc.index) {
        this.raise(PlaceholderErrors.UnexpectedSpace, {
          at: this.state.lastTokEndLoc,
        });
      }
    }
  };
