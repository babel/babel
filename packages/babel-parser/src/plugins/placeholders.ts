import * as charCodes from "charcodes";

import { tokenLabelName, tt } from "../tokenizer/types";
import type Parser from "../parser";
import * as N from "../types";
import { ParseErrorEnum } from "../parse-error";
import type { Undone } from "../parser/node";
import type { ExpressionErrors } from "../parser/util";
import type { BindingTypes } from "../util/scopeflags";
import type { Position } from "../util/location";

type PossiblePlaceholedrs = {
  Identifier: N.Identifier;
  StringLiteral: N.StringLiteral;
  Expression: N.Expression;
  Statement: N.Statement;
  Declaration: N.Declaration;
  BlockStatement: N.BlockStatement;
  ClassBody: N.ClassBody;
  Pattern: N.Pattern;
};
export type PlaceholderTypes = keyof PossiblePlaceholedrs;

type NodeOf<T extends keyof PossiblePlaceholedrs> = PossiblePlaceholedrs[T];
// todo: when there  is proper union type for Node
// type NodeOf<T extends PlaceholderTypes> = Extract<N.Node, { type: T }>;

// todo: Placeholder<T> breaks everything, because its type is incompatible with
// the substituted nodes.
type MaybePlaceholder<T extends PlaceholderTypes> = NodeOf<T>; // | Placeholder<T>

/* eslint sort-keys: "error" */
const PlaceholderErrors = ParseErrorEnum`placeholders`({
  ClassNameIsRequired: "A class name is required.",
  UnexpectedSpace: "Unexpected space in placeholder.",
});

/* eslint-disable sort-keys */

export default (superClass: typeof Parser) =>
  class PlaceholdersParserMixin extends superClass implements Parser {
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

      // @ts-expect-error todo(flow->ts)
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

      return super.getTokenFromCode(code);
    }

    /* ============================================================ *
     * parser/expression.js                                         *
     * ============================================================ */

    parseExprAtom(
      refExpressionErrors?: ExpressionErrors | null,
    ): MaybePlaceholder<"Expression"> {
      return (
        this.parsePlaceholder("Expression") ||
        super.parseExprAtom(refExpressionErrors)
      );
    }

    parseIdentifier(liberal?: boolean): MaybePlaceholder<"Identifier"> {
      // NOTE: This function only handles identifiers outside of
      // expressions and binding patterns, since they are already
      // handled by the parseExprAtom and parseBindingAtom functions.
      // This is needed, for example, to parse "class %%NAME%% {}".
      return (
        this.parsePlaceholder("Identifier") || super.parseIdentifier(liberal)
      );
    }

    checkReservedWord(
      word: string,
      startLoc: Position,
      checkKeywords: boolean,
      isBinding: boolean,
    ) {
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

    parseBindingAtom(): MaybePlaceholder<"Pattern"> {
      return this.parsePlaceholder("Pattern") || super.parseBindingAtom();
    }

    isValidLVal(type: string, isParenthesized: boolean, binding: BindingTypes) {
      return (
        type === "Placeholder" ||
        super.isValidLVal(type, isParenthesized, binding)
      );
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
        stmt.label = this.finishPlaceholder(expr, "Identifier");
        this.next();
        stmt.body = super.parseStatement("label");
        return this.finishNode(stmt, "LabeledStatement");
      }

      this.semicolon();
      node.name = expr.name;
      return this.finishPlaceholder(node, "Statement");
    }

    parseBlock(
      allowDirectives?: boolean,
      createNewLexicalScope?: boolean,
      afterBlockParse?: (hasStrictModeDirective: boolean) => void,
    ): MaybePlaceholder<"BlockStatement"> {
      return (
        this.parsePlaceholder("BlockStatement") ||
        super.parseBlock(
          allowDirectives,
          createNewLexicalScope,
          afterBlockParse,
        )
      );
    }

    parseFunctionId(
      requireId?: boolean,
    ): MaybePlaceholder<"Identifier"> | undefined | null {
      return (
        this.parsePlaceholder("Identifier") || super.parseFunctionId(requireId)
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
          node.id = placeholder;
        } else if (optionalId || !isStatement) {
          node.id = null;
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
      node.body =
        this.parsePlaceholder("ClassBody") ||
        super.parseClassBody(!!node.superClass, oldStrict);
      return this.finishNode(node, type);
    }

    parseExport(node: N.Node): N.AnyExport {
      const placeholder = this.parsePlaceholder("Identifier");
      if (!placeholder) return super.parseExport(node);

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
      if (!placeholder) return super.parseImport(node);

      node.specifiers = [];

      if (!this.isContextual(tt._from) && !this.match(tt.comma)) {
        // import %%STRING%%;
        node.source = this.finishPlaceholder(placeholder, "StringLiteral");
        this.semicolon();
        return this.finishNode(node, "ImportDeclaration");
      }

      // import %%DEFAULT%% ...
      const specifier =
        this.startNodeAtNode<N.ImportDefaultSpecifier>(placeholder);
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
      node.source = this.parseImportSource();
      this.semicolon();
      return this.finishNode(node, "ImportDeclaration");
    }

    parseImportSource(): MaybePlaceholder<"StringLiteral"> {
      // import ... from %%STRING%%;

      return (
        this.parsePlaceholder("StringLiteral") || super.parseImportSource()
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
