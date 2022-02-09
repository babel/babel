// @flow

import type { Options } from "../options";
import * as N from "../types";
import type { CommentWhitespace } from "../parser/comments";
import { Position } from "../util/location";

import { types as ct, type TokContext } from "./context";
import { tt, type TokenType } from "./types";
import type { ParseError } from "../parse-error";
import StrictErrors from "../parse-error/strict-mode";

export type DeferredStrictErrorClass =
    | typeof StrictErrors.StrictNumericEscape
    | typeof StrictErrors.StrictOctalLiteral;

type TopicContextState = {
  // When a topic binding has been currently established,
  // then this is 1. Otherwise, it is 0. This is forwards compatible
  // with a future plugin for multiple lexical topics.
  maxNumOfResolvableTopics: number,

  // When a topic binding has been currently established, and if that binding
  // has been used as a topic reference `#`, then this is 0. Otherwise, it is
  // `null`. This is forwards compatible with a future plugin for multiple
  // lexical topics.
  maxTopicIndex: null | 0,
};

export default class State {
  strict: boolean;
  curLine: number;
  lineStart: number;

  // And, if locations are used, the {line, column} object
  // corresponding to those offsets
  startLoc: Position;
  endLoc: Position;

  init({ strictMode, sourceType, startLine, startColumn }: Options): void {
    this.strict =
      strictMode === false
        ? false
        : strictMode === true
        ? true
        : sourceType === "module";

    this.curLine = startLine;
    this.lineStart = -startColumn;
    this.startLoc = this.endLoc = new Position(startLine, startColumn, 0);
  }

  errors: ParseError<any>[] = [];

  // Used to signify the start of a potential arrow function
  potentialArrowAt: number = -1;

  // Used to signify the start of an expression which looks like a
  // typed arrow function, but it isn't
  // e.g. a ? (b) : c => d
  //          ^
  noArrowAt: number[] = [];

  // Used to signify the start of an expression whose params, if it looks like
  // an arrow function, shouldn't be converted to assignable nodes.
  // This is used to defer the validation of typed arrow functions inside
  // conditional expressions.
  // e.g. a ? (b) : c => d
  //          ^
  noArrowParamsConversionAt: number[] = [];

  // Flags to track
  maybeInArrowParameters: boolean = false;
  inType: boolean = false;
  noAnonFunctionType: boolean = false;
  hasFlowComment: boolean = false;
  isAmbientContext: boolean = false;
  inAbstractClass: boolean = false;

  // For the Hack-style pipelines plugin
  topicContext: TopicContextState = {
    maxNumOfResolvableTopics: 0,
    maxTopicIndex: null,
  };

  // For the F#-style pipelines plugin
  soloAwait: boolean = false;
  inFSharpPipelineDirectBody: boolean = false;

  // Labels in scope.
  labels: Array<{
    kind: ?("loop" | "switch"),
    name?: ?string,
    statementStart?: number,
  }> = [];

  // Leading decorators. Last element of the stack represents the decorators in current context.
  // Supports nesting of decorators, e.g. @foo(@bar class inner {}) class outer {}
  // where @foo belongs to the outer class and @bar to the inner
  decoratorStack: Array<Array<N.Decorator>> = [[]];

  // Comment store for Program.comments
  comments: Array<N.Comment> = [];

  // Comment attachment store
  commentStack: Array<CommentWhitespace> = [];

  // The current position of the tokenizer in the input.
  pos: number = 0;

  // Properties of the current token:
  // Its type
  type: TokenType = tt.eof;

  // For tokens that include more information than their type, the value
  value: any = null;

  // Its start and end offset
  start: number = 0;
  end: number = 0;

  // Position information for the previous token
  // $FlowIgnore this is initialized when generating the second token.
  lastTokEndLoc: Position = null;
  // $FlowIgnore this is initialized when generating the second token.
  lastTokStartLoc: Position = null;
  lastTokStart: number = 0;

  // The context stack is used to track whether the apostrophe "`" starts
  // or ends a string template
  context: Array<TokContext> = [ct.brace];
  // Used to track whether a JSX element is allowed to form
  canStartJSXElement: boolean = true;

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.
  containsEsc: boolean = false;

  // This property is used to track the following errors
  // - StrictNumericEscape
  // - StrictOctalLiteral
  //
  // in a literal that occurs prior to/immediately after a "use strict" directive.

  // todo(JLHwung): set strictErrors to null and avoid recording string errors
  // after a non-directive is parsed
  strictErrors: Map<DeferredStrictErrorClass, Position> = new Map();

  // Tokens length in token store
  tokensLength: number = 0;

  curPosition(): Position {
    return new Position(this.curLine, this.pos - this.lineStart, this.pos);
  }

  clone(skipArrays?: boolean): State {
    const state = new State();
    const keys = Object.keys(this);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      // $FlowIgnore
      let val = this[key];

      if (!skipArrays && Array.isArray(val)) {
        val = val.slice();
      }

      // $FlowIgnore
      state[key] = val;
    }

    return state;
  }
}

export type LookaheadState = {
  pos: number,
  value: any,
  type: TokenType,
  start: number,
  end: number,
  /* Used only in readToken_mult_modulo */
  inType: boolean,
};
