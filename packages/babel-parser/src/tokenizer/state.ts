import type { Options } from "../options.ts";
import type { CommentWhitespace } from "../parser/comments";
import { Position } from "../util/location.ts";

import { types as ct, type TokContext } from "./context.ts";
import { tt, type TokenType } from "./types.ts";
import type { Errors } from "../parse-error.ts";
import type { ParseError } from "../parse-error.ts";

export type DeferredStrictError =
  | typeof Errors.StrictNumericEscape
  | typeof Errors.StrictOctalLiteral;

type TopicContextState = {
  // When a topic binding has been currently established,
  // then this is 1. Otherwise, it is 0. This is forwards compatible
  // with a future plugin for multiple lexical topics.
  maxNumOfResolvableTopics: number;
  // When a topic binding has been currently established, and if that binding
  // has been used as a topic reference `#`, then this is 0. Otherwise, it is
  // `null`. This is forwards compatible with a future plugin for multiple
  // lexical topics.
  maxTopicIndex: null | 0;
};

const enum StateFlags {
  None = 0,
  Strict = 1 << 0,
  maybeInArrowParameters = 1 << 1,
  inType = 1 << 2,
  noAnonFunctionType = 1 << 3,
  hasFlowComment = 1 << 4,
  isAmbientContext = 1 << 5,
  inAbstractClass = 1 << 6,
  inDisallowConditionalTypesContext = 1 << 7,
  soloAwait = 1 << 8,
  inFSharpPipelineDirectBody = 1 << 9,
  canStartJSXElement = 1 << 10,
  containsEsc = 1 << 11,
}

export const enum LoopLabelKind {
  Loop = 1,
  Switch = 2,
}

export default class State {
  flags: number = StateFlags.canStartJSXElement;

  get strict(): boolean {
    return (this.flags & StateFlags.Strict) > 0;
  }
  set strict(value: boolean) {
    if (value) {
      this.flags |= StateFlags.Strict;
    } else {
      this.flags &= ~StateFlags.Strict;
    }
  }
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
  get maybeInArrowParameters(): boolean {
    return (this.flags & StateFlags.maybeInArrowParameters) > 0;
  }
  set maybeInArrowParameters(value: boolean) {
    if (value) {
      this.flags |= StateFlags.maybeInArrowParameters;
    } else {
      this.flags &= ~StateFlags.maybeInArrowParameters;
    }
  }
  get inType(): boolean {
    return (this.flags & StateFlags.inType) > 0;
  }
  set inType(value: boolean) {
    if (value) {
      this.flags |= StateFlags.inType;
    } else {
      this.flags &= ~StateFlags.inType;
    }
  }
  get noAnonFunctionType(): boolean {
    return (this.flags & StateFlags.noAnonFunctionType) > 0;
  }
  set noAnonFunctionType(value: boolean) {
    if (value) {
      this.flags |= StateFlags.noAnonFunctionType;
    } else {
      this.flags &= ~StateFlags.noAnonFunctionType;
    }
  }
  get hasFlowComment(): boolean {
    return (this.flags & StateFlags.hasFlowComment) > 0;
  }
  set hasFlowComment(value: boolean) {
    if (value) {
      this.flags |= StateFlags.hasFlowComment;
    } else {
      this.flags &= ~StateFlags.hasFlowComment;
    }
  }
  get isAmbientContext(): boolean {
    return (this.flags & StateFlags.isAmbientContext) > 0;
  }
  set isAmbientContext(value: boolean) {
    if (value) {
      this.flags |= StateFlags.isAmbientContext;
    } else {
      this.flags &= ~StateFlags.isAmbientContext;
    }
  }
  get inAbstractClass(): boolean {
    return (this.flags & StateFlags.inAbstractClass) > 0;
  }
  set inAbstractClass(value: boolean) {
    if (value) {
      this.flags |= StateFlags.inAbstractClass;
    } else {
      this.flags &= ~StateFlags.inAbstractClass;
    }
  }
  get inDisallowConditionalTypesContext(): boolean {
    return (this.flags & StateFlags.inDisallowConditionalTypesContext) > 0;
  }
  set inDisallowConditionalTypesContext(value: boolean) {
    if (value) {
      this.flags |= StateFlags.inDisallowConditionalTypesContext;
    } else {
      this.flags &= ~StateFlags.inDisallowConditionalTypesContext;
    }
  }

  // For the Hack-style pipelines plugin
  topicContext: TopicContextState = {
    maxNumOfResolvableTopics: 0,
    maxTopicIndex: null,
  };

  // For the F#-style pipelines plugin
  get soloAwait(): boolean {
    return (this.flags & StateFlags.soloAwait) > 0;
  }
  set soloAwait(value: boolean) {
    if (value) {
      this.flags |= StateFlags.soloAwait;
    } else {
      this.flags &= ~StateFlags.soloAwait;
    }
  }
  get inFSharpPipelineDirectBody(): boolean {
    return (this.flags & StateFlags.inFSharpPipelineDirectBody) > 0;
  }
  set inFSharpPipelineDirectBody(value: boolean) {
    if (value) {
      this.flags |= StateFlags.inFSharpPipelineDirectBody;
    } else {
      this.flags &= ~StateFlags.inFSharpPipelineDirectBody;
    }
  }

  // Labels in scope.
  labels: Array<{
    kind: LoopLabelKind;
    name?: string | null;
    statementStart?: number;
  }> = [];

  commentsLen = 0;
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
  // this is initialized when generating the second token.
  lastTokEndLoc: Position = null;
  // this is initialized when generating the second token.
  lastTokStartLoc: Position = null;

  // The context stack is used to track whether the apostrophe "`" starts
  // or ends a string template
  context: Array<TokContext> = [ct.brace];
  // Used to track whether a JSX element is allowed to form
  get canStartJSXElement(): boolean {
    return (this.flags & StateFlags.canStartJSXElement) > 0;
  }
  set canStartJSXElement(value: boolean) {
    if (value) {
      this.flags |= StateFlags.canStartJSXElement;
    } else {
      this.flags &= ~StateFlags.canStartJSXElement;
    }
  }

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.
  get containsEsc(): boolean {
    return (this.flags & StateFlags.containsEsc) > 0;
  }
  set containsEsc(value: boolean) {
    if (value) {
      this.flags |= StateFlags.containsEsc;
    } else {
      this.flags &= ~StateFlags.containsEsc;
    }
  }

  // Used to track invalid escape sequences in template literals,
  // that must be reported if the template is not tagged.
  firstInvalidTemplateEscapePos: null | Position = null;

  // This property is used to track the following errors
  // - StrictNumericEscape
  // - StrictOctalLiteral
  //
  // in a literal that occurs prior to/immediately after a "use strict" directive.

  // todo(JLHwung): set strictErrors to null and avoid recording string errors
  // after a non-directive is parsed
  strictErrors: Map<number, [DeferredStrictError, Position]> = new Map();

  // Tokens length in token store
  tokensLength: number = 0;

  /**
   * When we add a new property, we must manually update the `clone` method
   * @see State#clone
   */

  curPosition(): Position {
    return new Position(this.curLine, this.pos - this.lineStart, this.pos);
  }

  clone(): State {
    const state = new State();
    state.flags = this.flags;
    state.curLine = this.curLine;
    state.lineStart = this.lineStart;
    state.startLoc = this.startLoc;
    state.endLoc = this.endLoc;
    state.errors = this.errors.slice();
    state.potentialArrowAt = this.potentialArrowAt;
    state.noArrowAt = this.noArrowAt.slice();
    state.noArrowParamsConversionAt = this.noArrowParamsConversionAt.slice();
    state.topicContext = this.topicContext;
    state.labels = this.labels.slice();
    state.commentsLen = this.commentsLen;
    state.commentStack = this.commentStack.slice();
    state.pos = this.pos;
    state.type = this.type;
    state.value = this.value;
    state.start = this.start;
    state.end = this.end;
    state.lastTokEndLoc = this.lastTokEndLoc;
    state.lastTokStartLoc = this.lastTokStartLoc;
    state.context = this.context.slice();
    state.firstInvalidTemplateEscapePos = this.firstInvalidTemplateEscapePos;
    state.strictErrors = this.strictErrors;
    state.tokensLength = this.tokensLength;

    return state;
  }
}

export type LookaheadState = {
  pos: number;
  value: any;
  type: TokenType;
  start: number;
  end: number;
  context: TokContext[];
  startLoc: Position;
  lastTokEndLoc: Position;
  curLine: number;
  lineStart: number;
  curPosition: () => Position;
  /* Used only in readToken_mult_modulo */
  inType: boolean;
  // These boolean properties are not initialized in createLookaheadState()
  // instead they will only be set by the tokenizer
  containsEsc?: boolean;
};
