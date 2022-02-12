// @flow

import { Position } from "./util/location";
import type { NodeBase } from "./types";

const { assign: ObjectAssign } = Object;

const ManuallyAssignedErrorMessages = new WeakMap<ParseError<any>, string>();

export const ParseErrorCodes = Object.freeze({
  SyntaxError: "BABEL_PARSER_SYNTAX_ERROR",
  SourceTypeModuleError: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
});

export type ParseErrorCode = $Values<typeof ParseErrorCodes>;

type ToMessage<ErrorProperties> = (self: ErrorProperties) => string;

export class ParseError<ErrorProperties> extends SyntaxError {
  static code: ParseErrorCode;
  static reasonCode: string;
  static toMessage: ToMessage<ErrorProperties>;

//  static name: string = "SyntaxError";

  code: ParseErrorCode = this.constructor.code;
  reasonCode: string = this.constructor.reasonCode;

  loc: Position;
  pos: number;

  constructor(properties: {
    ...ErrorProperties,
    loc: Position,
  }): ParseError<ErrorProperties> {
    super();

    return ObjectAssign(this, {
      ...properties,
      pos: properties.loc.index,
    });
  }
}

Object.defineProperty(ParseError, "name", { value: "SyntaxError" });

declare function toParseErrorClass<T: string>(
  T,
  ?{ code?: ParseErrorCode }
): Class<ParseError<{||}>>;
declare function toParseErrorClass<T>(
  (T) => string,
  ?{ code?: ParseErrorCode }
): Class<ParseError<T>>;

export function toParseErrorClass(toMessageOrMessage, properties) {
  return fromToMessage(
    typeof toMessageOrMessage === "string"
      ? () => toMessageOrMessage
      : toMessageOrMessage,
    properties
  );
}

function fromToMessage<T>(
  toMessage: ToMessage<T>,
  { code = ParseErrorCodes.SyntaxError } = {}
): Class<ParseError<T>> {
  return class extends ParseError<T> {
    code: ParseErrorCode = code;

    get message() {
      return ManuallyAssignedErrorMessages.has(this)
        ? // $FlowIgnore
        ManuallyAssignedErrorMessages.get(this)
        : // $FlowIgnore
        `${toMessage(this)} (${this.loc.line}:${this.loc.column})`;
    }
    set message(message) {
      ManuallyAssignedErrorMessages.set(this, message);
    }
  };
}


export function toParseErrorClasses<T: Object>(
  toClasses: (typeof toParseErrorClass) => T,
  { syntaxPlugin, code } : Object = {}
): T {
  // $FlowIgnore
  return Object.fromEntries(
    Object.entries(toClasses(toParseErrorClass)).map(
      ([reasonCode, ParseErrorClass]) => [
        reasonCode,
        // $FlowIgnore
        Object.assign(ParseErrorClass,
            { reasonCode },
            !!syntaxPlugin && { syntaxPlugin })
    ])
  );
}

export type RaiseProperties<ErrorProperties> = {|
  ...ErrorProperties,
  at: Position | NodeBase,
|};

import ModuleErrors from "./parse-error/module";
import StandardErrors from "./parse-error/standard";
import StrictErrors from "./parse-error/strict-mode";

export const Errors = {
  ...toParseErrorClasses(ModuleErrors),
  ...toParseErrorClasses(StandardErrors),
  ...toParseErrorClasses(StrictErrors)
};
