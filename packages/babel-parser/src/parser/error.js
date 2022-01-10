// @flow
/* eslint sort-keys: "error" */
import { type Position } from "../util/location";
import CommentsParser from "./comments";
import { type ErrorCode, ErrorCodes } from "./error-codes";
import { type Node } from "../types";

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

type ErrorContext = {
  pos: number,
  loc: Position,
  missingPlugin?: Array<string>,
  code?: string,
  reasonCode?: String,
};
export type ParsingError = SyntaxError & ErrorContext;

export type ErrorTemplate = {
  code: ErrorCode,
  template: string,
  reasonCode: string,
};
export type ErrorTemplates = {
  [key: string]: ErrorTemplate,
};

type Origin = {| node: Node |} | {| at: Position |};

type SyntaxPlugin =
  | "flow"
  | "typescript"
  | "jsx"
  | "placeholders"
  | typeof undefined;

function keepReasonCodeCompat(reasonCode: string, syntaxPlugin: SyntaxPlugin) {
  if (!process.env.BABEL_8_BREAKING) {
    // For consistency in TypeScript and Flow error codes
    if (syntaxPlugin === "flow" && reasonCode === "PatternIsOptional") {
      return "OptionalBindingPattern";
    }
  }
  return reasonCode;
}

export function makeErrorTemplates(
  messages: {
    [key: string]: string,
  },
  code: ErrorCode,
  syntaxPlugin?: SyntaxPlugin,
): ErrorTemplates {
  const templates: ErrorTemplates = {};
  Object.keys(messages).forEach(reasonCode => {
    templates[reasonCode] = Object.freeze({
      code,
      reasonCode: keepReasonCodeCompat(reasonCode, syntaxPlugin),
      template: messages[reasonCode],
    });
  });
  return Object.freeze(templates);
}

export { ErrorCodes };
export {
  ErrorMessages as Errors,
  SourceTypeModuleErrorMessages as SourceTypeModuleErrors,
} from "./error-message";

export type raiseFunction = (ErrorTemplate, Origin, ...any) => void;
export type ErrorData = {| message: ErrorTemplate, loc: Position |};

export default class ParserError extends CommentsParser {
  // Forward-declaration: defined in tokenizer/index.js
  /*::
  +isLookahead: boolean;
  */

  raise(
    { code, reasonCode, template }: ErrorTemplate,
    origin: Origin,
    ...params: any
  ): Error | empty {
    return this.raiseWithData(
      origin.node ? origin.node.loc.start : origin.at,
      { code, reasonCode },
      template,
      ...params,
    );
  }

  /**
   * Raise a parsing error on given position pos. If errorRecovery is true,
   * it will first search current errors and overwrite the error thrown on the exact
   * position before with the new error message. If errorRecovery is false, it
   * fallbacks to `raise`.
   *
   * @param {number} pos
   * @param {string} errorTemplate
   * @param {...any} params
   * @returns {(Error | empty)}
   * @memberof ParserError
   */
  raiseOverwrite(
    loc: Position,
    { code, template }: ErrorTemplate,
    ...params: any
  ): Error | empty {
    const pos = loc.index;
    const message =
      template.replace(/%(\d+)/g, (_, i: number) => params[i]) +
      ` (${loc.line}:${loc.column})`;
    if (this.options.errorRecovery) {
      const errors = this.state.errors;
      for (let i = errors.length - 1; i >= 0; i--) {
        const error = errors[i];
        if (error.pos === pos) {
          return Object.assign(error, { message });
        } else if (error.pos < pos) {
          break;
        }
      }
    }
    return this._raise({ code, loc, pos }, message);
  }

  raiseWithData(
    loc: Position,
    data?: {
      missingPlugin?: Array<string>,
      code?: string,
    },
    errorTemplate: string,
    ...params: any
  ): Error | empty {
    const pos = loc.index;
    const message =
      errorTemplate.replace(/%(\d+)/g, (_, i: number) => params[i]) +
      ` (${loc.line}:${loc.column})`;
    return this._raise(Object.assign(({ loc, pos }: Object), data), message);
  }

  _raise(errorContext: ErrorContext, message: string): Error | empty {
    // $FlowIgnore
    const err: SyntaxError & ErrorContext = new SyntaxError(message);
    Object.assign(err, errorContext);
    if (this.options.errorRecovery) {
      if (!this.isLookahead) this.state.errors.push(err);
      return err;
    } else {
      throw err;
    }
  }
}
