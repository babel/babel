// @flow

import { Position } from "./util/location";
import type { NodeBase } from "./types";

const { assign: ObjectAssign } = Object;

const ManuallyAssignedErrorMessages = new WeakMap();

export const ParseErrorCodes = Object.freeze({
  SyntaxError: "BABEL_PARSER_SYNTAX_ERROR",
  SourceTypeModuleError: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
});

export type ParseErrorCode = $Values<typeof ParseErrorCodes>;

var instantiated = false;

type ToMessage<ErrorProperties> = (self: ErrorProperties) => string;

export class ParseError<ErrorProperties> extends SyntaxError {
  static reasonCode: string;
  static toMessage: ToMessage<ErrorProperties>;

//  static name: string = "SyntaxError";

  code: ParseErrorCode = ParseErrorCodes.SyntaxError;
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
    get message() {
      return ManuallyAssignedErrorMessages.has(this)
        ? ManuallyAssignedErrorMessages.get(this)
        : `${toMessage(this)} (${this.loc.line}:${this.loc.column})`;
    }
    set message(message) {
      ManuallyAssignedErrorMessages.set(this, message);
    }
  };
}

export function toParseErrorClasses<T: Object>(
  toClasses: (typeof toReasonCodelessParseErrorClass) => T,
  { syntaxPlugin, code } : Object = {}
): T {
  // $FlowIgnore
  if (!instantiated) {
    const classes = {
      _instantiate() {
        delete classes._instantiate,
        Object.assign(classes, toParseErrorClasses(toClasses, { syntaxPlugin, code }));
        return classes;
      }
    };

    return classes;
  }

  return Object.fromEntries(
    Object.entries(toClasses(toReasonCodelessParseErrorClass)).map(
      ([reasonCode, ParseErrorClass]) => [
        reasonCode,
        // $FlowIgnore
        Object.assign(ParseErrorClass,
            { reasonCode },
            !!syntaxPlugin && { syntaxPlugin },
            !!code && { code })
    ])
  );
}

export type RaiseProperties<ErrorProperties> = {|
  ...ErrorProperties,
  at: Position | NodeBase,
|};

import { default as ModuleErrorsUninstantiated } from "./parse-error/module";

import StandardErrors from "./parse-error/standard";
import StrictErrors from "./parse-error/strict-mode";

instantiated = true;

export const ModuleErrors = ModuleErrorsUninstantiated._instantiate();

export const Errors = { ...StandardErrors._instantiate(), ...StrictErrors._instantiate() };
