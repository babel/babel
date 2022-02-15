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
  static syntaxPlugin: ?string;
  static toMessage: ToMessage<ErrorProperties>;

  // Unfortunately babel-standalone turns this into a straight assigmnent
  // instead of a defineProperty, so it throws an error. We do it manually
  // below instead.
  //
  // static name: string = "SyntaxError";

  code: ParseErrorCode = this.constructor.code;
  reasonCode: string = this.constructor.reasonCode;
  syntaxPlugin: ?string = this.constructor.syntaxPlugin;

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

// We do this for backwards compatibility so that all errors just have the
// "SyntaxError" name in their messages instead of leaking the private subclass
// name.
Object.defineProperty(ParseError, "name", { value: "SyntaxError" });

declare function toParseErrorClass<T: string>(
  T,
  ?{ code?: ParseErrorCode } | boolean,
): Class<ParseError<{||}>>;

// eslint-disable-next-line no-redeclare
declare function toParseErrorClass<T>(
  (T) => string,
  ?{ code?: ParseErrorCode } | boolean,
): Class<ParseError<T>>;

// eslint-disable-next-line no-redeclare
export function toParseErrorClass(toMessageOrMessage, properties) {
  return fromToMessage(
    typeof toMessageOrMessage === "string"
      ? () => toMessageOrMessage
      : toMessageOrMessage,
    properties,
  );
}

function fromToMessage<T>(
  toMessage: ToMessage<T>,
  { code = ParseErrorCodes.SyntaxError, reasonCode = "" } = {},
): Class<ParseError<T>> {
  return class extends ParseError<T> {
    static code: ParseErrorCode = code;
    static reasonCode: string = reasonCode;

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
  { syntaxPlugin }: Object = {},
): T {
  // $FlowIgnore
  return Object.fromEntries(
    Object.entries(toClasses(toParseErrorClass)).map(
      ([reasonCode, ParseErrorClass: Class<ParseError<any>>]) => [
        reasonCode,
        // $FlowIgnore
        ObjectAssign(
          ParseErrorClass,
          // $FlowIgnore
          !ParseErrorClass.reasonCode && { reasonCode },
          !!syntaxPlugin && { syntaxPlugin },
        ),
      ],
    ),
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
  ...toParseErrorClasses(StrictErrors),
};
