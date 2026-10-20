import type Printer from "../printer.ts";
import { isAssignmentPattern, isIdentifier } from "@babel/types";
import type * as t from "@babel/types";
import jsesc from "jsesc";
import * as charCodes from "charcodes";
import { _methodHead } from "./methods.ts";
import { TokenContext } from "../node/index.ts";

let lastRawIdentResult: string = "";
export function _getRawIdentifier(this: Printer, node: t.Identifier) {
  const { name } = node;
  const token = this.tokenMap!.find(node, tok => tok.value === name);
  if (token) {
    lastRawIdentResult = this._originalCode!.slice(token.start, token.end);
    return lastRawIdentResult;
  }
  return (lastRawIdentResult = node.name);
}

export function Identifier(this: Printer, node: t.Identifier) {
  if (
    this._buf._map &&
    node.loc?.identifierName &&
    node.loc.identifierName !== node.name
  ) {
    this.sourceIdentifierName(node.loc.identifierName);
  }

  let name = this.tokenMap ? lastRawIdentResult : node.name;
  if (name === "of" && this.tokenContext & TokenContext.usingForOfBinding) {
    name = "o\\u0066";
  }
  this.word(name);
}

export function ArgumentPlaceholder(this: Printer) {
  this.token("?");
}

export function RestElement(this: Printer, node: t.RestElement) {
  this.token("...");
  this.print(node.argument);
}

export { RestElement as SpreadElement };

export function ObjectExpression(this: Printer, node: t.ObjectExpression) {
  const props = node.properties;

  this.token("{");

  if (props.length) {
    const oldNoLineTerminatorAfterNode = this.enterDelimited();
    this.space();
    this.printList(
      props,
      this.shouldPrintTrailingComma("}"),
      true,
      true,
      undefined,
      true,
    );
    this.space();
    this._noLineTerminatorAfterNode = oldNoLineTerminatorAfterNode;
  }

  this.rightBrace(node);
}

export { ObjectExpression as ObjectPattern };

export function ObjectMethod(this: Printer, node: t.ObjectMethod) {
  this.printJoin(node.decorators);
  _methodHead.call(this, node);
  this.space();
  this.print(node.body);
}

export function ObjectProperty(this: Printer, node: t.ObjectProperty) {
  this.printJoin(node.decorators);

  if (node.computed) {
    this.token("[");
    this.print(node.key);
    this.token("]");
  } else {
    // print `({ foo: foo = 5 } = {})` as `({ foo = 5 } = {});`
    if (
      isAssignmentPattern(node.value) &&
      isIdentifier(node.key) &&
      // @ts-expect-error todo(flow->ts) `.name` does not exist on some types in union
      node.key.name === node.value.left.name
    ) {
      this.print(node.value);
      return;
    }

    this.print(node.key);

    // shorthand!
    if (
      node.shorthand &&
      isIdentifier(node.key) &&
      isIdentifier(node.value) &&
      node.key.name === node.value.name
    ) {
      return;
    }
  }

  this.token(":");
  this.space();
  this.print(node.value);
}

export function ArrayExpression(this: Printer, node: t.ArrayExpression) {
  const elems = node.elements;
  const len = elems.length;

  this.token("[");

  const oldNoLineTerminatorAfterNode = this.enterDelimited();

  for (let i = 0; i < elems.length; i++) {
    const elem = elems[i];
    if (elem) {
      if (i > 0) this.space();
      this.print(elem, undefined, true);
      if (i < len - 1 || this.shouldPrintTrailingComma("]")) {
        this.tokenChar(charCodes.comma, i);
      }
    } else {
      // If the array expression ends with a hole, that hole
      // will be ignored by the interpreter, but if it ends with
      // two (or more) holes, we need to write out two (or more)
      // commas so that the resulting code is interpreted with
      // both (all) of the holes.
      this.tokenChar(charCodes.comma, i);
    }
  }

  this._noLineTerminatorAfterNode = oldNoLineTerminatorAfterNode;

  this.token("]");
}

export { ArrayExpression as ArrayPattern };

export function RegExpLiteral(this: Printer, node: t.RegExpLiteral) {
  this.word(`/${node.pattern}/${node.flags}`, false);
}

export function BooleanLiteral(this: Printer, node: t.BooleanLiteral) {
  this.word(node.value ? "true" : "false");
}

export function NullLiteral(this: Printer) {
  this.word("null");
}

export function NumericLiteral(this: Printer, node: t.NumericLiteral) {
  const raw = this.getPossibleRaw(node);
  const opts = this.format.jsescOption;
  const value = node.value;
  // `value + ""` (and jsesc) spell an overflowing value as `Infinity`, which
  // is an identifier that can be shadowed, not a numeric literal. Use a short
  // literal that still evaluates to Infinity so the output re-parses to the
  // same node.
  if (Number.isNaN(value)) {
    // There is no NaN numeric literal and `NaN` is an identifier that can be
    // shadowed: print what `t.valueToNode(NaN)` builds
    this.token("(");
    this.number("0", 0);
    this.space();
    this.token("/");
    this.space();
    this.number("0", 0);
    this.token(")");
    return;
  }
  const str = value === Infinity ? "1e999" : value + "";
  // Only integers can use a non-decimal radix:
  // Workaround for https://github.com/mathiasbynens/jsesc/issues/79
  if (
    opts.numbers &&
    Number.isFinite(value) &&
    (opts.numbers === "decimal" || Number.isInteger(value))
  ) {
    this.number(jsesc(value, opts), value);
  } else if (raw == null) {
    this.number(str, value); // normalize
  } else if (this.format.minified) {
    this.number(raw.length < str.length ? raw : str, value);
  } else {
    this.number(raw, value);
  }
}

const jsxEntityRE = /&(?:#x[\da-f]+|#\d+|[a-z\d]+);/iy;

// Whether `raw` is a JSX attribute string whose value is `value`, i.e. it
// equals `value` after decoding HTML entities
function isJSXAttributeRaw(raw: string, value: string) {
  let j = 0;
  for (let i = 1; i < raw.length - 1;) {
    if (raw.charCodeAt(i) === charCodes.ampersand) {
      jsxEntityRE.lastIndex = i;
      if (jsxEntityRE.test(raw)) {
        // The entity's code point is not checked: a JS string has no
        // entities, so its raw would differ from `value` in length
        if (j >= value.length) return false;
        j += value.codePointAt(j)! > 0xffff ? 2 : 1;
        i = jsxEntityRE.lastIndex;
        continue;
      }
    }
    if (raw.charCodeAt(i) !== value.charCodeAt(j)) return false;
    i++;
    j++;
  }
  return j === value.length;
}

function jsxAttributeString(
  value: string,
  quotes: "single" | "double" | "backtick" | undefined,
) {
  // The parser decodes HTML entities, so an `&` that would start one must be
  // encoded
  value = value.replace(/&(?=#|[a-z\d]+;)/gi, "&amp;");
  const [quote, other] = quotes === "single" ? ["'", '"'] : ['"', "'"];
  if (value.includes(quote)) {
    if (!value.includes(other)) return other + value + other;
    value = value.replaceAll(quote, quote === '"' ? "&quot;" : "&apos;");
  }
  return quote + value + quote;
}

export function StringLiteral(
  this: Printer,
  node: t.StringLiteral,
  parent: t.Node,
) {
  const raw = this.getPossibleRaw(node);

  if (parent?.type === "JSXAttribute") {
    // JSX attribute strings have no escape sequences: a backslash is a
    // literal backslash and a quote can only be written as an HTML entity,
    // so the jsesc output would change the value (or not parse at all).
    // The raw text is reused only if it is JSX: a string parsed as JS and
    // moved into an attribute has a raw with JS escapes.
    if (raw !== undefined && isJSXAttributeRaw(raw, node.value)) {
      this.token(raw, /* maybeNewline */ true);
    } else {
      this.token(
        jsxAttributeString(node.value, this.format.jsescOption.quotes),
        /* maybeNewline */ true,
      );
    }
    return;
  }

  if (!this.format.minified && raw !== undefined) {
    this.token(raw);
    return;
  }

  const val = jsesc(node.value, this.format.jsescOption);

  this.token(val);
}

export function BigIntLiteral(this: Printer, node: t.BigIntLiteral) {
  const raw = this.getPossibleRaw(node);
  if (!this.format.minified && raw !== undefined) {
    this.word(raw);
    return;
  }
  this.word(node.value + "n");
}

// Hack pipe operator
const validTopicTokenSet = new Set<string | undefined>([
  "^^",
  "@@",
  "^",
  "%",
  "#",
]);
export function TopicReference(this: Printer) {
  const { topicToken } = this.format;

  if (validTopicTokenSet.has(topicToken)) {
    this.token(topicToken!);
  } else {
    const givenTopicTokenJSON = JSON.stringify(topicToken);
    const validTopics = Array.from(validTopicTokenSet, v => JSON.stringify(v));
    throw new Error(
      `The "topicToken" generator option must be one of ` +
        `${validTopics.join(", ")} (${givenTopicTokenJSON} received instead).`,
    );
  }
}

// discard binding
export function VoidPattern(this: Printer) {
  this.word("void");
}
