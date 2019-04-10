// @flow

import * as charCodes from "charcodes";

import * as N from "../../types";
import { isIdentifierChar, isIdentifierStart } from "../../util/identifier";
import type { Pos, Position } from "../../util/location";
import { isNewLine } from "../../util/whitespace";
import { types as tt, TokenType } from "../../util/token-types";

import { original } from "::build-tool::";

import {
  ct as tc,
  curContext,
  finishToken,
  match,
  next,
  eat,
  lookahead,
} from "::build-tool::bindings/tokenizer";

import {
  state,
  input,
  length,
  raise,
  expect,
  unexpected,
  isRelational,
  startNode,
  startNodeAt,
  finishNode,
  finishNodeAt,
  parseExpression,
  parseMaybeAssign,
  parseLiteral,
} from "::build-tool::bindings/parser";

import XHTMLEntities from "./xhtml";

const HEX_NUMBER = /^[\da-fA-F]+$/;
const DECIMAL_NUMBER = /^\d+$/;

function isFragment(object: ?N.JSXElement): boolean {
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
  throw new Error("Node had unexpected type: " + object.type);
}

// Reads inline JSX contents token.

function jsxReadToken(): void {
  let out = "";
  let chunkStart = state.pos;
  for (;;) {
    if (state.pos >= length) {
      raise(state.start, "Unterminated JSX contents");
    }

    const ch = input.charCodeAt(state.pos);

    switch (ch) {
      case charCodes.lessThan:
      case charCodes.leftCurlyBrace:
        if (state.pos === state.start) {
          if (ch === charCodes.lessThan && state.exprAllowed) {
            ++state.pos;
            return finishToken(tt.jsxTagStart);
          }
          return original(getTokenFromCode)(ch);
        }
        out += input.slice(chunkStart, state.pos);
        return finishToken(tt.jsxText, out);

      case charCodes.ampersand:
        out += input.slice(chunkStart, state.pos);
        out += jsxReadEntity();
        chunkStart = state.pos;
        break;

      default:
        if (isNewLine(ch)) {
          out += input.slice(chunkStart, state.pos);
          out += jsxReadNewLine(true);
          chunkStart = state.pos;
        } else {
          ++state.pos;
        }
    }
  }
}

function jsxReadNewLine(normalizeCRLF: boolean): string {
  const ch = input.charCodeAt(state.pos);
  let out;
  ++state.pos;
  if (
    ch === charCodes.carriageReturn &&
    input.charCodeAt(state.pos) === charCodes.lineFeed
  ) {
    ++state.pos;
    out = normalizeCRLF ? "\n" : "\r\n";
  } else {
    out = String.fromCharCode(ch);
  }
  ++state.curLine;
  state.lineStart = state.pos;

  return out;
}

function jsxReadString(quote: number): void {
  let out = "";
  let chunkStart = ++state.pos;
  for (;;) {
    if (state.pos >= length) {
      raise(state.start, "Unterminated string constant");
    }

    const ch = input.charCodeAt(state.pos);
    if (ch === quote) break;
    if (ch === charCodes.ampersand) {
      out += input.slice(chunkStart, state.pos);
      out += jsxReadEntity();
      chunkStart = state.pos;
    } else if (isNewLine(ch)) {
      out += input.slice(chunkStart, state.pos);
      out += jsxReadNewLine(false);
      chunkStart = state.pos;
    } else {
      ++state.pos;
    }
  }
  out += input.slice(chunkStart, state.pos++);
  return finishToken(tt.string, out);
}

function jsxReadEntity(): string {
  let str = "";
  let count = 0;
  let entity;
  let ch = input[state.pos];

  const startPos = ++state.pos;
  while (state.pos < length && count++ < 10) {
    ch = input[state.pos++];
    if (ch === ";") {
      if (str[0] === "#") {
        if (str[1] === "x") {
          str = str.substr(2);
          if (HEX_NUMBER.test(str)) {
            entity = String.fromCodePoint(parseInt(str, 16));
          }
        } else {
          str = str.substr(1);
          if (DECIMAL_NUMBER.test(str)) {
            entity = String.fromCodePoint(parseInt(str, 10));
          }
        }
      } else {
        entity = XHTMLEntities[str];
      }
      break;
    }
    str += ch;
  }
  if (!entity) {
    state.pos = startPos;
    return "&";
  }
  return entity;
}

// Read a JSX identifier (valid tag or attribute name).
//
// Optimized version since JSX identifiers can"t contain
// escape characters and so can be read as single slice.
// Also assumes that first character was already checked
// by isIdentifierStart in readToken.

function jsxReadWord(): void {
  let ch;
  const start = state.pos;
  do {
    ch = input.charCodeAt(++state.pos);
  } while (isIdentifierChar(ch) || ch === charCodes.dash);
  return finishToken(tt.jsxName, input.slice(start, state.pos));
}

// Parse next token as JSX identifier

function jsxParseIdentifier(): N.JSXIdentifier {
  const node = startNode();
  if (match(tt.jsxName)) {
    node.name = state.value;
  } else if (state.type.keyword) {
    node.name = state.type.keyword;
  } else {
    unexpected();
  }
  next();
  return finishNode(node, "JSXIdentifier");
}

// Parse namespaced identifier.

function jsxParseNamespacedName(): N.JSXNamespacedName {
  const startPos = state.start;
  const startLoc = state.startLoc;
  const name = jsxParseIdentifier();
  if (!eat(tt.colon)) return name;

  const node = startNodeAt(startPos, startLoc);
  node.namespace = name;
  node.name = jsxParseIdentifier();
  return finishNode(node, "JSXNamespacedName");
}

// Parses element name in any form - namespaced, member
// or single identifier.

function jsxParseElementName(): N.JSXNamespacedName | N.JSXMemberExpression {
  const startPos = state.start;
  const startLoc = state.startLoc;
  let node = jsxParseNamespacedName();
  while (eat(tt.dot)) {
    const newNode = startNodeAt(startPos, startLoc);
    newNode.object = node;
    newNode.property = jsxParseIdentifier();
    node = finishNode(newNode, "JSXMemberExpression");
  }
  return node;
}

// Parses any type of JSX attribute value.

function jsxParseAttributeValue(): N.Expression {
  let node;
  switch (state.type) {
    case tt.braceL:
      node = jsxParseExpressionContainer();
      if (node.expression.type === "JSXEmptyExpression") {
        throw raise(
          node.start,
          "JSX attributes must only be assigned a non-empty expression",
        );
      } else {
        return node;
      }

    case tt.jsxTagStart:
    case tt.string:
      return parseExprAtom();

    default:
      throw raise(
        state.start,
        "JSX value should be either an expression or a quoted JSX text",
      );
  }
}

// JSXEmptyExpression is unique type since it doesn't actually parse anything,
// and so it should start at the end of last read token (left brace) and finish
// at the beginning of the next one (right brace).

function jsxParseEmptyExpression(): N.JSXEmptyExpression {
  const node = startNodeAt(state.lastTokEnd, state.lastTokEndLoc);
  return finishNodeAt(node, "JSXEmptyExpression", state.start, state.startLoc);
}

// Parse JSX spread child

function jsxParseSpreadChild(): N.JSXSpreadChild {
  const node = startNode();
  expect(tt.braceL);
  expect(tt.ellipsis);
  node.expression = parseExpression();
  expect(tt.braceR);

  return finishNode(node, "JSXSpreadChild");
}

// Parses JSX expression enclosed into curly brackets.

function jsxParseExpressionContainer(): N.JSXExpressionContainer {
  const node = startNode();
  next();
  if (match(tt.braceR)) {
    node.expression = jsxParseEmptyExpression();
  } else {
    node.expression = parseExpression();
  }
  expect(tt.braceR);
  return finishNode(node, "JSXExpressionContainer");
}

// Parses following JSX attribute name-value pair.

function jsxParseAttribute(): N.JSXAttribute {
  const node = startNode();
  if (eat(tt.braceL)) {
    expect(tt.ellipsis);
    node.argument = parseMaybeAssign();
    expect(tt.braceR);
    return finishNode(node, "JSXSpreadAttribute");
  }
  node.name = jsxParseNamespacedName();
  node.value = eat(tt.eq) ? jsxParseAttributeValue() : null;
  return finishNode(node, "JSXAttribute");
}

// Parses JSX opening tag starting after "<".

function jsxParseOpeningElementAt(
  startPos: number,
  startLoc: Position,
): N.JSXOpeningElement {
  const node = startNodeAt(startPos, startLoc);
  if (match(tt.jsxTagEnd)) {
    expect(tt.jsxTagEnd);
    return finishNode(node, "JSXOpeningFragment");
  }
  node.name = jsxParseElementName();
  return jsxParseOpeningElementAfterName(node);
}

export function jsxParseOpeningElementAfterName(
  node: N.JSXOpeningElement,
): N.JSXOpeningElement {
  const attributes: N.JSXAttribute[] = [];
  while (!match(tt.slash) && !match(tt.jsxTagEnd)) {
    attributes.push(jsxParseAttribute());
  }
  node.attributes = attributes;
  node.selfClosing = eat(tt.slash);
  expect(tt.jsxTagEnd);
  return finishNode(node, "JSXOpeningElement");
}

// Parses JSX closing tag starting after "</".

function jsxParseClosingElementAt(
  startPos: number,
  startLoc: Position,
): N.JSXClosingElement {
  const node = startNodeAt(startPos, startLoc);
  if (match(tt.jsxTagEnd)) {
    expect(tt.jsxTagEnd);
    return finishNode(node, "JSXClosingFragment");
  }
  node.name = jsxParseElementName();
  expect(tt.jsxTagEnd);
  return finishNode(node, "JSXClosingElement");
}

// Parses entire JSX element, including it"s opening tag
// (starting after "<"), attributes, contents and closing tag.

function jsxParseElementAt(startPos: number, startLoc: Position): N.JSXElement {
  const node = startNodeAt(startPos, startLoc);
  const children = [];
  const openingElement = jsxParseOpeningElementAt(startPos, startLoc);
  let closingElement = null;

  if (!openingElement.selfClosing) {
    contents: for (;;) {
      switch (state.type) {
        case tt.jsxTagStart:
          startPos = state.start;
          startLoc = state.startLoc;
          next();
          if (eat(tt.slash)) {
            closingElement = jsxParseClosingElementAt(startPos, startLoc);
            break contents;
          }
          children.push(jsxParseElementAt(startPos, startLoc));
          break;

        case tt.jsxText:
          children.push(parseExprAtom());
          break;

        case tt.braceL:
          if (lookahead().type === tt.ellipsis) {
            children.push(jsxParseSpreadChild());
          } else {
            children.push(jsxParseExpressionContainer());
          }

          break;

        // istanbul ignore next - should never happen
        default:
          throw unexpected();
      }
    }

    if (isFragment(openingElement) && !isFragment(closingElement)) {
      raise(
        // $FlowIgnore
        closingElement.start,
        "Expected corresponding JSX closing tag for <>",
      );
    } else if (!isFragment(openingElement) && isFragment(closingElement)) {
      raise(
        // $FlowIgnore
        closingElement.start,
        "Expected corresponding JSX closing tag for <" +
          getQualifiedJSXName(openingElement.name) +
          ">",
      );
    } else if (!isFragment(openingElement) && !isFragment(closingElement)) {
      if (
        // $FlowIgnore
        getQualifiedJSXName(closingElement.name) !==
        getQualifiedJSXName(openingElement.name)
      ) {
        raise(
          // $FlowIgnore
          closingElement.start,
          "Expected corresponding JSX closing tag for <" +
            getQualifiedJSXName(openingElement.name) +
            ">",
        );
      }
    }
  }

  if (isFragment(openingElement)) {
    node.openingFragment = openingElement;
    node.closingFragment = closingElement;
  } else {
    node.openingElement = openingElement;
    node.closingElement = closingElement;
  }
  node.children = children;
  if (match(tt.relational) && state.value === "<") {
    raise(
      state.start,
      "Adjacent JSX elements must be wrapped in an enclosing tag. " +
        "Did you want a JSX fragment <>...</>?",
    );
  }

  return isFragment(openingElement)
    ? finishNode(node, "JSXFragment")
    : finishNode(node, "JSXElement");
}

// Parses entire JSX element from current position.

function jsxParseElement(): N.JSXElement {
  const startPos = state.start;
  const startLoc = state.startLoc;
  next();
  return jsxParseElementAt(startPos, startLoc);
}

// ==================================
// Overrides
// ==================================

export function parseExprAtom(refShortHandDefaultPos: ?Pos): N.Expression {
  if (match(tt.jsxText)) {
    return parseLiteral(state.value, "JSXText");
  } else if (match(tt.jsxTagStart)) {
    return jsxParseElement();
  } else if (
    isRelational("<") &&
    input.charCodeAt(state.pos) !== charCodes.exclamationMark
  ) {
    // In case we encounter an lt token here it will always be the start of
    // jsx as the lt sign is not allowed in places that expect an expression
    finishToken(tt.jsxTagStart);
    return jsxParseElement();
  } else {
    return original(parseExprAtom)(refShortHandDefaultPos);
  }
}

export function getTokenFromCode(code: number): void {
  if (state.inPropertyName) return original(getTokenFromCode)(code);

  const context = curContext();

  if (context === tc.j_expr) {
    return jsxReadToken();
  }

  if (context === tc.j_oTag || context === tc.j_cTag) {
    if (isIdentifierStart(code)) {
      return jsxReadWord();
    }

    if (code === charCodes.greaterThan) {
      ++state.pos;
      return finishToken(tt.jsxTagEnd);
    }

    if (
      (code === charCodes.quotationMark || code === charCodes.apostrophe) &&
      context === tc.j_oTag
    ) {
      return jsxReadString(code);
    }
  }

  if (
    code === charCodes.lessThan &&
    state.exprAllowed &&
    input.charCodeAt(state.pos + 1) !== charCodes.exclamationMark
  ) {
    ++state.pos;
    return finishToken(tt.jsxTagStart);
  }

  return original(getTokenFromCode)(code);
}

export function updateContext(prevType: TokenType): void {
  if (match(tt.braceL)) {
    const ctx = curContext();
    if (ctx === tc.j_oTag) {
      state.context.push(tc.braceExpression);
    } else if (ctx === tc.j_expr) {
      state.context.push(tc.templateQuasi);
    } else {
      original(updateContext)(prevType);
    }
    state.exprAllowed = true;
  } else if (match(tt.slash) && prevType === tt.jsxTagStart) {
    state.context.length -= 2; // do not consider JSX expr -> JSX open tag -> ... anymore
    state.context.push(tc.j_cTag); // reconsider as closing tag context
    state.exprAllowed = false;
  } else {
    return original(updateContext)(prevType);
  }
}
