import type Printer from "../printer.ts";
import { isAssignmentPattern, isIdentifier } from "@babel/types";
import type * as t from "@babel/types";
import jsesc from "jsesc";
// We inline this package
// eslint-disable-next-line import/no-extraneous-dependencies
import * as charCodes from "charcodes";
import { _methodHead } from "./methods.ts";

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
  if (this._buf._map) {
    this.sourceIdentifierName(node.loc?.identifierName || node.name);
  }

  this.word(this.tokenMap ? lastRawIdentResult : node.name);
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
  this.word(`/${node.pattern}/${node.flags}`, false, true);
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
  const str = value + "";
  if (opts.numbers) {
    this.number(jsesc(value, opts), value);
  } else if (raw == null) {
    this.number(str, value); // normalize
  } else if (this.format.minified) {
    this.number(raw.length < str.length ? raw : str, value);
  } else {
    this.number(raw, value);
  }
}

export function StringLiteral(this: Printer, node: t.StringLiteral) {
  const raw = this.getPossibleRaw(node);
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

// Smart-mix pipe operator
export function PipelineTopicExpression(
  this: Printer,
  node: t.PipelineTopicExpression,
) {
  this.print(node.expression);
}

export function PipelineBareFunction(
  this: Printer,
  node: t.PipelineBareFunction,
) {
  this.print(node.callee);
}

export function PipelinePrimaryTopicReference(this: Printer) {
  this.token("#");
}

// discard binding
export function VoidPattern(this: Printer) {
  this.word("void");
}
