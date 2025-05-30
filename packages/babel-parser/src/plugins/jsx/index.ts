import * as charCodes from "charcodes";

import XHTMLEntities from "./xhtml.ts";
import type Parser from "../../parser/index.ts";
import type { ExpressionErrors } from "../../parser/util.ts";
import {
  tokenComesBeforeExpression,
  tokenIsKeyword,
  tokenLabelName,
  type TokenType,
  tt,
} from "../../tokenizer/types.ts";
import type { TokContext } from "../../tokenizer/context.ts";
import { types as tc } from "../../tokenizer/context.ts";
import type * as N from "../../types.ts";
import { isIdentifierChar, isIdentifierStart } from "../../util/identifier.ts";
import type { Position } from "../../util/location.ts";
import { isNewLine } from "../../util/whitespace.ts";
import { Errors, ParseErrorEnum } from "../../parse-error.ts";
import type { Undone } from "../../parser/node.ts";

/* eslint sort-keys: "error" */
const JsxErrors = ParseErrorEnum`jsx`({
  AttributeIsEmpty:
    "JSX attributes must only be assigned a non-empty expression.",
  MissingClosingTagElement: ({ openingTagName }: { openingTagName: string }) =>
    `Expected corresponding JSX closing tag for <${openingTagName}>.`,
  MissingClosingTagFragment: "Expected corresponding JSX closing tag for <>.",
  UnexpectedSequenceExpression:
    "Sequence expressions cannot be directly nested inside JSX. Did you mean to wrap it in parentheses (...)?",
  // FIXME: Unify with Errors.UnexpectedToken
  UnexpectedToken: ({
    unexpected,
    HTMLEntity,
  }: {
    unexpected: string;
    HTMLEntity: string;
  }) =>
    `Unexpected token \`${unexpected}\`. Did you mean \`${HTMLEntity}\` or \`{'${unexpected}'}\`?`,
  UnsupportedJsxValue:
    "JSX value should be either an expression or a quoted JSX text.",
  UnterminatedJsxContent: "Unterminated JSX contents.",
  UnwrappedAdjacentJSXElements:
    "Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?",
});

/* eslint-disable sort-keys */

function isFragment(object?: N.JSXTag | null): object is N.JSXFragmentTag {
  return object
    ? object.type === "JSXOpeningFragment" ||
        object.type === "JSXClosingFragment"
    : false;
}

// Transforms JSX element name to string.

function getQualifiedJSXName(
  object: N.JSXIdentifier | N.JSXNamespacedName | N.JSXMemberExpression,
): string {
  if (object.type === "JSXIdentifier") {
    return object.name;
  }

  if (object.type === "JSXNamespacedName") {
    return object.namespace.name + ":" + object.name.name;
  }

  if (object.type === "JSXMemberExpression") {
    return (
      getQualifiedJSXName(object.object) +
      "." +
      getQualifiedJSXName(object.property)
    );
  }

  // istanbul ignore next
  // @ts-expect-error - object is 'never'
  throw new Error("Node had unexpected type: " + object.type);
}

export interface IJSXParserMixin {
  jsxParseOpeningElementAfterName(
    node: N.JSXOpeningElement,
  ): N.JSXOpeningElement;
}

export type ClassWithMixin<
  T extends new (...args: any) => any,
  M extends object,
> = T extends new (...args: infer P) => infer I
  ? new (...args: P) => I & M
  : never;

export default (superClass: typeof Parser) =>
  class JSXParserMixin extends superClass implements Parser, IJSXParserMixin {
    // Reads inline JSX contents token.

    jsxReadToken(): void {
      let out = "";
      let chunkStart = this.state.pos;
      for (;;) {
        if (this.state.pos >= this.length) {
          throw this.raise(
            JsxErrors.UnterminatedJsxContent,
            this.state.startLoc,
          );
        }

        const ch = this.input.charCodeAt(this.state.pos);

        switch (ch) {
          case charCodes.lessThan:
          case charCodes.leftCurlyBrace:
            if (this.state.pos === this.state.start) {
              if (ch === charCodes.lessThan && this.state.canStartJSXElement) {
                ++this.state.pos;
                this.finishToken(tt.jsxTagStart);
              } else {
                super.getTokenFromCode(ch);
              }
              return;
            }
            out += this.input.slice(chunkStart, this.state.pos);
            this.finishToken(tt.jsxText, out);
            return;

          case charCodes.ampersand:
            out += this.input.slice(chunkStart, this.state.pos);
            out += this.jsxReadEntity();
            chunkStart = this.state.pos;
            break;

          case charCodes.greaterThan:
          case charCodes.rightCurlyBrace:
            if (process.env.BABEL_8_BREAKING) {
              this.raise(JsxErrors.UnexpectedToken, this.state.curPosition(), {
                unexpected: this.input[this.state.pos],
                HTMLEntity:
                  ch === charCodes.rightCurlyBrace ? "&rbrace;" : "&gt;",
              });
            }
          /* falls through */

          default:
            if (isNewLine(ch)) {
              out += this.input.slice(chunkStart, this.state.pos);
              out += this.jsxReadNewLine(true);
              chunkStart = this.state.pos;
            } else {
              ++this.state.pos;
            }
        }
      }
    }

    jsxReadNewLine(normalizeCRLF: boolean): string {
      const ch = this.input.charCodeAt(this.state.pos);
      let out;
      ++this.state.pos;
      if (
        ch === charCodes.carriageReturn &&
        this.input.charCodeAt(this.state.pos) === charCodes.lineFeed
      ) {
        ++this.state.pos;
        out = normalizeCRLF ? "\n" : "\r\n";
      } else {
        out = String.fromCharCode(ch);
      }
      ++this.state.curLine;
      this.state.lineStart = this.state.pos;

      return out;
    }

    jsxReadString(quote: number): void {
      let out = "";
      let chunkStart = ++this.state.pos;
      for (;;) {
        if (this.state.pos >= this.length) {
          throw this.raise(Errors.UnterminatedString, this.state.startLoc);
        }

        const ch = this.input.charCodeAt(this.state.pos);
        if (ch === quote) break;
        if (ch === charCodes.ampersand) {
          out += this.input.slice(chunkStart, this.state.pos);
          out += this.jsxReadEntity();
          chunkStart = this.state.pos;
        } else if (isNewLine(ch)) {
          out += this.input.slice(chunkStart, this.state.pos);
          out += this.jsxReadNewLine(false);
          chunkStart = this.state.pos;
        } else {
          ++this.state.pos;
        }
      }
      out += this.input.slice(chunkStart, this.state.pos++);
      this.finishToken(tt.string, out);
    }

    jsxReadEntity(): string {
      const startPos = ++this.state.pos;
      if (this.codePointAtPos(this.state.pos) === charCodes.numberSign) {
        ++this.state.pos;

        let radix = 10;
        if (this.codePointAtPos(this.state.pos) === charCodes.lowercaseX) {
          radix = 16;
          ++this.state.pos;
        }

        const codePoint = this.readInt(
          radix,
          /* len */ undefined,
          /* forceLen */ false,
          /* allowNumSeparator */ "bail",
        );
        if (
          codePoint !== null &&
          this.codePointAtPos(this.state.pos) === charCodes.semicolon
        ) {
          ++this.state.pos;
          return String.fromCodePoint(codePoint);
        }
      } else {
        let count = 0;
        let semi = false;
        while (
          count++ < 10 &&
          this.state.pos < this.length &&
          !(semi = this.codePointAtPos(this.state.pos) === charCodes.semicolon)
        ) {
          ++this.state.pos;
        }

        if (semi) {
          const desc = this.input.slice(startPos, this.state.pos);
          const entity = XHTMLEntities[desc];
          ++this.state.pos;

          if (entity) {
            return entity;
          }
        }
      }

      // Not a valid entity
      this.state.pos = startPos;
      return "&";
    }

    // Read a JSX identifier (valid tag or attribute name).
    //
    // Optimized version since JSX identifiers can"t contain
    // escape characters and so can be read as single slice.
    // Also assumes that first character was already checked
    // by isIdentifierStart in readToken.

    jsxReadWord(): void {
      let ch;
      const start = this.state.pos;
      do {
        ch = this.input.charCodeAt(++this.state.pos);
      } while (isIdentifierChar(ch) || ch === charCodes.dash);
      this.finishToken(tt.jsxName, this.input.slice(start, this.state.pos));
    }

    // Parse next token as JSX identifier

    jsxParseIdentifier(): N.JSXIdentifier {
      const node = this.startNode<N.JSXIdentifier>("JSXIdentifier");
      if (this.match(tt.jsxName)) {
        node.name = this.state.value;
      } else if (tokenIsKeyword(this.state.type)) {
        node.name = tokenLabelName(this.state.type);
      } else {
        this.unexpected();
      }
      this.next();
      return this.finishNode(node);
    }

    // Parse namespaced identifier.

    jsxParseNamespacedName(): N.JSXNamespacedName | N.JSXIdentifier {
      const startLoc = this.state.startLoc;
      const name = this.jsxParseIdentifier();
      if (!this.eat(tt.colon)) return name;

      const node = this.startNodeAt<N.JSXNamespacedName>(
        startLoc,
        "JSXNamespacedName",
      );
      node.namespace = name;
      node.name = this.jsxParseIdentifier();
      return this.finishNode(node);
    }

    // Parses element name in any form - namespaced, member
    // or single identifier.

    jsxParseElementName():
      | N.JSXIdentifier
      | N.JSXNamespacedName
      | N.JSXMemberExpression {
      const startLoc = this.state.startLoc;
      let node: N.JSXIdentifier | N.JSXNamespacedName | N.JSXMemberExpression =
        this.jsxParseNamespacedName();
      if (node.type === "JSXNamespacedName") {
        return node;
      }
      while (this.eat(tt.dot)) {
        const newNode = this.startNodeAt<N.JSXMemberExpression>(
          startLoc,
          "JSXMemberExpression",
        );
        newNode.object = node;
        newNode.property = this.jsxParseIdentifier();
        node = this.finishNode(newNode);
      }
      return node;
    }

    // Parses any type of JSX attribute value.

    jsxParseAttributeValue():
      | N.JSXExpressionContainer
      | N.JSXElement
      | N.StringLiteral {
      let node;
      switch (this.state.type) {
        case tt.braceL:
          node = this.startNode();
          this.setContext(tc.brace);
          this.next();
          node = this.jsxParseExpressionContainer(node, tc.j_oTag);
          if (node.expression.type === "JSXEmptyExpression") {
            this.raise(JsxErrors.AttributeIsEmpty, node);
          }
          return node;

        case tt.jsxTagStart:
        case tt.string:
          return this.parseExprAtom() as N.JSXElement | N.StringLiteral;

        default:
          throw this.raise(JsxErrors.UnsupportedJsxValue, this.state.startLoc);
      }
    }

    // JSXEmptyExpression is unique type since it doesn't actually parse anything,
    // and so it should start at the end of last read token (left brace) and finish
    // at the beginning of the next one (right brace).

    jsxParseEmptyExpression(): N.JSXEmptyExpression {
      const node = this.startNodeAt<N.JSXEmptyExpression>(
        this.state.lastTokEndLoc,
        "JSXEmptyExpression",
      );
      return this.finishNodeAt(node, this.state.startLoc);
    }

    // Parse JSX spread child

    jsxParseSpreadChild(node: Undone<N.JSXSpreadChild>): N.JSXSpreadChild {
      this.next(); // ellipsis
      node.expression = this.parseExpression();
      this.setContext(tc.j_expr);
      this.state.canStartJSXElement = true;
      this.expect(tt.braceR);

      return this.finishNode(node, "JSXSpreadChild");
    }

    // Parses JSX expression enclosed into curly brackets.

    jsxParseExpressionContainer(
      node: Undone<N.JSXExpressionContainer>,
      previousContext: TokContext,
    ): N.JSXExpressionContainer {
      if (this.match(tt.braceR)) {
        node.expression = this.jsxParseEmptyExpression();
      } else {
        const expression = this.parseExpression();

        if (process.env.BABEL_8_BREAKING) {
          if (
            expression.type === "SequenceExpression" &&
            !expression.extra?.parenthesized
          ) {
            this.raise(
              JsxErrors.UnexpectedSequenceExpression,
              expression.expressions[1],
            );
          }
        }

        node.expression = expression;
      }
      this.setContext(previousContext);
      this.state.canStartJSXElement = true;
      this.expect(tt.braceR);

      return this.finishNode(node, "JSXExpressionContainer");
    }

    // Parses following JSX attribute name-value pair.

    jsxParseAttribute(): N.JSXAttribute | N.JSXSpreadAttribute {
      if (this.match(tt.braceL)) {
        const node = this.startNode("JSXSpreadAttribute");
        this.setContext(tc.brace);
        this.next();
        this.expect(tt.ellipsis);
        node.argument = this.parseMaybeAssignAllowIn();
        this.setContext(tc.j_oTag);
        this.state.canStartJSXElement = true;
        this.expect(tt.braceR);
        return this.finishNode(node);
      }
      const node = this.startNode("JSXAttribute");
      node.name = this.jsxParseNamespacedName();
      node.value = this.eat(tt.eq) ? this.jsxParseAttributeValue() : null;
      return this.finishNode(node);
    }

    // Parses JSX opening tag starting after "<".

    jsxParseOpeningElementAt(
      startLoc: Position,
    ): N.JSXOpeningElement | N.JSXOpeningFragment {
      if (this.eat(tt.jsxTagEnd)) {
        const node = this.startNodeAt<N.JSXOpeningFragment>(
          startLoc,
          "JSXOpeningFragment",
        );
        return this.finishNode(node);
      }
      const node = this.startNodeAt<N.JSXOpeningElement>(
        startLoc,
        "JSXOpeningElement",
      );
      node.name = this.jsxParseElementName();
      return this.jsxParseOpeningElementAfterName(node);
    }

    jsxParseOpeningElementAfterName(
      node: Undone<N.JSXOpeningElement>,
    ): N.JSXOpeningElement {
      const attributes: (N.JSXAttribute | N.JSXSpreadAttribute)[] = [];
      while (!this.match(tt.slash) && !this.match(tt.jsxTagEnd)) {
        attributes.push(this.jsxParseAttribute());
      }
      node.attributes = attributes;
      node.selfClosing = this.eat(tt.slash);
      this.expect(tt.jsxTagEnd);
      return this.finishNode(node);
    }

    // Parses JSX closing tag starting after "</".

    jsxParseClosingElementAt(
      startLoc: Position,
    ): N.JSXClosingElement | N.JSXClosingFragment {
      if (this.eat(tt.jsxTagEnd)) {
        return this.finishNode(
          this.startNodeAt<N.JSXClosingFragment>(
            startLoc,
            "JSXClosingFragment",
          ),
        );
      }
      const node = this.startNodeAt<N.JSXClosingElement>(
        startLoc,
        "JSXClosingElement",
      );
      node.name = this.jsxParseElementName();
      this.expect(tt.jsxTagEnd);
      return this.finishNode(node, "JSXClosingElement");
    }

    // Parses entire JSX element, including it"s opening tag
    // (starting after "<"), attributes, contents and closing tag.

    jsxParseElementAt(startLoc: Position): N.JSXElement | N.JSXFragment {
      const children = [];
      const openingElement = this.jsxParseOpeningElementAt(startLoc);
      let closingElement = null;

      const isFragmentForOpeningElement = isFragment(openingElement);

      const node = this.startNodeAt<N.JSXElement | N.JSXFragment>(
        startLoc,
        isFragmentForOpeningElement ? "JSXFragment" : "JSXElement",
      );

      if (!openingElement.selfClosing) {
        contents: for (;;) {
          switch (this.state.type) {
            case tt.jsxTagStart:
              startLoc = this.state.startLoc;
              this.next();
              if (this.eat(tt.slash)) {
                closingElement = this.jsxParseClosingElementAt(startLoc);
                break contents;
              }
              children.push(this.jsxParseElementAt(startLoc));
              break;

            case tt.jsxText:
              children.push(
                this.parseLiteral(this.state.value, this.startNode("JSXText")),
              );
              break;

            case tt.braceL: {
              const node = this.startNode<
                N.JSXSpreadChild | N.JSXExpressionContainer
              >();
              this.setContext(tc.brace);
              this.next();
              if (this.match(tt.ellipsis)) {
                children.push(this.jsxParseSpreadChild(node));
              } else {
                children.push(
                  this.jsxParseExpressionContainer(node, tc.j_expr),
                );
              }

              break;
            }
            // istanbul ignore next - should never happen
            default:
              this.unexpected();
          }
        }

        if (
          isFragmentForOpeningElement &&
          !isFragment(closingElement) &&
          closingElement !== null
        ) {
          this.raise(JsxErrors.MissingClosingTagFragment, closingElement);
        } else if (!isFragmentForOpeningElement && isFragment(closingElement)) {
          this.raise(JsxErrors.MissingClosingTagElement, closingElement, {
            openingTagName: getQualifiedJSXName(openingElement.name),
          });
        } else if (
          !isFragmentForOpeningElement &&
          !isFragment(closingElement)
        ) {
          if (
            getQualifiedJSXName(closingElement.name) !==
            getQualifiedJSXName(openingElement.name)
          ) {
            this.raise(JsxErrors.MissingClosingTagElement, closingElement, {
              openingTagName: getQualifiedJSXName(openingElement.name),
            });
          }
        }
      }

      if (isFragmentForOpeningElement) {
        node.openingFragment = openingElement;
        node.closingFragment = closingElement;
      } else {
        node.openingElement = openingElement;
        node.closingElement = closingElement;
      }
      node.children = children;
      if (this.match(tt.lt)) {
        throw this.raise(
          JsxErrors.UnwrappedAdjacentJSXElements,
          this.state.startLoc,
        );
      }

      return this.finishNode(node);
    }

    // Parses entire JSX element from current position.

    jsxParseElement(): N.JSXElement | N.JSXFragment {
      const startLoc = this.state.startLoc;
      this.next();
      return this.jsxParseElementAt(startLoc);
    }

    setContext(newContext: TokContext) {
      const { context } = this.state;
      context[context.length - 1] = newContext;
    }

    // ==================================
    // Overrides
    // ==================================

    parseExprAtom(refExpressionErrors?: ExpressionErrors | null): N.Expression {
      if (this.match(tt.jsxTagStart)) {
        return this.jsxParseElement();
      } else if (
        this.match(tt.lt) &&
        this.input.charCodeAt(this.state.pos) !== charCodes.exclamationMark
      ) {
        // In case we encounter an lt token here it will always be the start of
        // jsx as the lt sign is not allowed in places that expect an expression
        this.replaceToken(tt.jsxTagStart);
        return this.jsxParseElement();
      } else {
        return super.parseExprAtom(refExpressionErrors);
      }
    }

    skipSpace() {
      const curContext = this.curContext();
      if (!curContext.preserveSpace) super.skipSpace();
    }

    getTokenFromCode(code: number): void {
      const context = this.curContext();

      if (context === tc.j_expr) {
        this.jsxReadToken();
        return;
      }

      if (context === tc.j_oTag || context === tc.j_cTag) {
        if (isIdentifierStart(code)) {
          this.jsxReadWord();
          return;
        }

        if (code === charCodes.greaterThan) {
          ++this.state.pos;
          this.finishToken(tt.jsxTagEnd);
          return;
        }

        if (
          (code === charCodes.quotationMark || code === charCodes.apostrophe) &&
          context === tc.j_oTag
        ) {
          this.jsxReadString(code);
          return;
        }
      }

      if (
        code === charCodes.lessThan &&
        this.state.canStartJSXElement &&
        this.input.charCodeAt(this.state.pos + 1) !== charCodes.exclamationMark
      ) {
        ++this.state.pos;
        this.finishToken(tt.jsxTagStart);
        return;
      }

      super.getTokenFromCode(code);
    }

    updateContext(prevType: TokenType): void {
      const { context, type } = this.state;
      if (type === tt.slash && prevType === tt.jsxTagStart) {
        // do not consider JSX expr -> JSX open tag -> ... anymore
        // reconsider as closing tag context
        context.splice(-2, 2, tc.j_cTag);
        this.state.canStartJSXElement = false;
      } else if (type === tt.jsxTagStart) {
        // start opening tag context
        context.push(tc.j_oTag);
      } else if (type === tt.jsxTagEnd) {
        const out = context[context.length - 1];
        if ((out === tc.j_oTag && prevType === tt.slash) || out === tc.j_cTag) {
          context.pop();
          this.state.canStartJSXElement =
            context[context.length - 1] === tc.j_expr;
        } else {
          this.setContext(tc.j_expr);
          this.state.canStartJSXElement = true;
        }
      } else {
        this.state.canStartJSXElement = tokenComesBeforeExpression(type);
      }
    }
  };
