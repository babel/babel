// @flow

import * as charCodes from "charcodes";

import { types as tt, TokenType } from "../tokenizer/types";
import type Parser from "../parser";
import * as N from "../types";

tt.placeholder = new TokenType("%%", { startsExpr: true });

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    parsePlaceholder(expectedNode: string): ?N.Placeholder {
      if (this.match(tt.placeholder)) {
        const node = this.startNode();
        node.expectedNode = expectedNode;
        this.next();
        this.assertNoSpace("Unexpected space in placeholder.");

        // We can't use this.parseIdentifier because
        // we don't want nested placeholders.
        node.key = super.parseIdentifier(/* liberal */ true);

        this.assertNoSpace("Unexpected space in placeholder.");
        this.expect(tt.placeholder);
        return this.finishNode(node, "Placeholder");
      }
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

      return super.getTokenFromCode(...arguments);
    }

    match(type: TokenType): boolean {
      // Let's pretend that placeholders _are_ tt.name, since they are
      // allowed wherever an identifier is allowed.
      if (type == tt.name && super.match(tt.placeholder)) return true;
      return super.match(...arguments);
    }

    /* ============================================================ *
     * parser/expression.js                                         *
     * ============================================================ */

    parseExprAtom(): N.Expression | N.Placeholder {
      return (
        this.parsePlaceholder("Expression") || super.parseExprAtom(...arguments)
      );
    }

    parseIdentifier(): N.Identifier | N.Placeholder {
      // NOTE: This function only handles identifiers outside of
      // expressions and binding patterns, since they are already
      // handled by the parseExprAtom and parseBindingAtom functions.
      // This is needed, for example, to parse "class %%NAME%% {}".
      return (
        this.parsePlaceholder("Identifier") ||
        super.parseIdentifier(...arguments)
      );
    }

    checkReservedWord(word: string): void {
      // Sometimes we call #checkReservedWord(node.name), expecting
      // that node is an Identifier. If it is a Placeholder, name
      // will be undefined.
      if (word !== undefined) super.checkReservedWord(...arguments);
    }

    /* ============================================================ *
     * parser/lval.js                                               *
     * ============================================================ */

    parseBindingAtom(): N.Pattern | N.Placeholder {
      return (
        this.parsePlaceholder("Pattern") || super.parseBindingAtom(...arguments)
      );
    }

    checkLVal(expr: N.Expression): void {
      if (expr.type !== "Placeholder") super.checkLVal(...arguments);
    }

    toAssignable(node: Node): Node {
      if (
        node &&
        node.type === "Placeholder" &&
        node.expectedNode === "Expression"
      ) {
        node.expectedNode = "Pattern";
        return node;
      }
      return super.toAssignable(...arguments);
    }

    /* ============================================================ *
     * parser/statement.js                                          *
     * ============================================================ */

    parseBlock(): N.BlockStatement | N.Placeholder {
      return (
        this.parsePlaceholder("BlockStatement") ||
        super.parseBlock(...arguments)
      );
    }

    parseClass(
      node: N.Class,
      isStatement: /* T === ClassDeclaration */ boolean,
      optionalId?: boolean,
    ): T {
      const type = isStatement ? "ClassDeclaration" : "ClassExpression";

      this.next();
      this.takeDecorators(node);

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
          placeholder.expectedNode = "ClassBody";
          node.body = placeholder;
          return this.finishNode(node, type);
        } else {
          this.unexpected(null, "A class name is required");
        }
      } else {
        this.parseClassId(node, isStatement, optionalId);
      }

      this.parseClassSuper(node);
      node.body = this.parsePlaceholder("ClassBody") || this.parseClassBody();
      return this.finishNode(node, type);
    }

    parseExport(node: N.Node): N.Node {
      const placeholder = this.parsePlaceholder("Identifier");
      if (!placeholder) return super.parseExport(...arguments);

      if (!this.isContextual("from") && !this.match(tt.comma)) {
        // export %%DECL%%;
        placeholder.expectedNode = "Declaration";

        node.specifiers = [];
        node.source = null;
        node.declaration = placeholder;
        return this.finishNode(node, "ExportNamedDeclaration");
      }

      // export %%NAME%% from "foo";
      this.expectPlugin("exportDefaultFrom");
      const specifier = this.startNode();
      specifier.exported = placeholder;
      node.specifiers = [this.finishNode(specifier, "ExportDefaultSpecifier")];

      return super.parseExport(node);
    }

    maybeParseExportDefaultSpecifier(node: N.Node): boolean {
      if (node.specifiers && node.specifiers.length > 0) {
        // "export %%NAME%%" has already been parsed by #parseExport.
        return true;
      }
      return super.maybeParseExportDefaultSpecifier(...arguments);
    }

    checkExport(node: N.ExportNamedDeclaration): void {
      const { specifiers } = node;
      if (specifiers && specifiers.length) {
        node.specifiers = specifiers.filter(
          node => node.exported.type === "Placeholder",
        );
      }
      super.checkExport(node);
      node.specifiers = specifiers;
    }

    parseImport(
      node: N.Node,
    ): N.ImportDeclaration | N.TsImportEqualsDeclaration {
      const placeholder = this.parsePlaceholder("Identifier");
      if (!placeholder) return super.parseImport(...arguments);

      node.specifiers = [];

      if (!this.isContextual("from") && !this.match(tt.comma)) {
        // import %%STRING%%;
        placeholder.expectedNode = "StringLiteral";
        node.source = placeholder;
        this.semicolon();
        return this.finishNode(node, "ImportDeclaration");
      }

      // import %%DEFAULT%% ...
      const specifier = this.startNodeAtNode(placeholder);
      specifier.local = placeholder;
      this.finishNode(specifier, "ImportDefaultSpecifier");
      node.specifiers.push(specifier);

      if (this.eat(tt.comma)) {
        // import %%DEFAULT%%, * as ...
        const hasStarImport = this.maybeParseStarImportSpecifier(node);

        // import %%DEFAULT%%, { ...
        if (!hasStarImport) this.parseNamedImportSpecifiers(node);
      }

      this.expectContextual("from");
      node.source = this.parseImportSource();
      this.semicolon();
      return this.finishNode(node, "ImportDeclaration");
    }

    parseImportSource(): N.StringLiteral | N.Placeholder {
      // import ... from %%STRING%%;

      return (
        this.parsePlaceholder("StringLiteral") ||
        super.parseImportSource(...arguments)
      );
    }
  };
