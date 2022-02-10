// @flow

import { Position } from "./util/location";
import type { NodeBase } from "./types";

const { assign: ObjectAssign } = Object;

export enum ParseErrorCode {
  SyntaxError = "BABEL_PARSER_SYNTAX_ERROR",
  SourceTypeModuleError = "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
}

type ToMessage<ErrorProperties> = (self: ErrorProperties) => string;

export class ParseError<ErrorProperties> extends SyntaxError {
  static reasonCode: string;
  static toMessage: ToMessage<ErrorProperties>;

  name: string = "SyntaxError";

  code: ParseErrorCode = ParseErrorCode.SyntaxError;
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

declare function toReasonCodelessParseErrorClass<T: string>(
  T
): Class<ParseError<{||}>>;
declare function toReasonCodelessParseErrorClass<T>(
  (T) => string
): Class<ParseError<T>>;

function toReasonCodelessParseErrorClass(toMessageOrMessage) {
  return fromToMessage(
    typeof toMessageOrMessage === "string"
      ? () => toMessageOrMessage
      : toMessageOrMessage
  );
}

function fromToMessage<T>(toMessage: ToMessage<T>): Class<ParseError<T>> {
  return class extends ParseError<T> {
    static toMessage = toMessage;
  };
}

export function toParseErrorClasses<T: Object>(
  toClasses: (typeof toReasonCodelessParseErrorClass) => T,
  { syntaxPlugin, code } : Object = {}
): T {
  // $FlowIgnore
  return Object.fromEntries(
    Object.entries(toClasses(toReasonCodelessParseErrorClass)).map(
      ([reasonCode, ParseErrorClass]) =>
        // $FlowIgnore
        Object.assign(ParseErrorClass,
            { reasonCode },
            !!syntaxPlugin && { syntaxPlugin },
            !!code && { code })
    )
  );
}


export type RaiseProperties<ErrorProperties> = {|
  ...ErrorProperties,
  at: Position | NodeBase,
|};

export { default as ModuleErrors } from "./parse-error/module";

import StandardErrors from "./parse-error/standard";
import StrictErrors from "./parse-error/strict-mode";

export const Errors = { ...StandardErrors, ...StrictErrors };
