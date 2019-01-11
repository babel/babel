// @flow

import type { Options } from "../options";
import * as N from "../types";
import { Position } from "../util/location";

import { types as ct, type TokContext } from "./context";
import type { Token } from "./index";
import { types as tt, type TokenType } from "./types";

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
  input: string;

  curLine: number;

  // And, if locations are used, the {line, column} object
  // corresponding to those offsets
  startLoc: Position;
  endLoc: Position;

  init(options: Options, input: string): void {
    this.strict =
      options.strictMode === false ? false : options.sourceType === "module";

    this.input = input;

    this.curLine = options.startLine;
    this.startLoc = this.endLoc = this.curPosition();
  }

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

  // A comma after "...a" is only allowed in spread, but not in rest.
  // Since we parse destructuring patterns as array/object literals
  // and then convert them, we need to track it.
  commaAfterSpreadAt: number = -1;

  // Flags to track whether we are in a function, a generator.
  inFunction: boolean = false;
  inParameters: boolean = false;
  maybeInArrowParameters: boolean = false;
  inGenerator: boolean = false;
  inMethod: boolean | N.MethodKind = false;
  inAsync: boolean = false;
  inPipeline: boolean = false;
  inType: boolean = false;
  noAnonFunctionType: boolean = false;
  inPropertyName: boolean = false;
  inClassProperty: boolean = false;
  hasFlowComment: boolean = false;
  isIterator: boolean = false;

  // For the smartPipelines plugin:
  topicContext: TopicContextState = {
    maxNumOfResolvableTopics: 0,
    maxTopicIndex: null,
  };

  // Check whether we are in a (nested) class or not.
  classLevel: number = 0;

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

  // The first yield or await expression inside parenthesized expressions
  // and arrow function parameters. It is used to disallow yield and await in
  // arrow function parameters.
  yieldOrAwaitInPossibleArrowParameters:
    | N.YieldExpression
    | N.AwaitExpression
    | null = null;

  // Token store.
  tokens: Array<Token | N.Comment> = [];

  // Comment store.
  comments: Array<N.Comment> = [];

  // Comment attachment store
  trailingComments: Array<N.Comment> = [];
  leadingComments: Array<N.Comment> = [];
  commentStack: Array<{
    start: number,
    leadingComments: ?Array<N.Comment>,
    trailingComments: ?Array<N.Comment>,
    type: string,
  }> = [];
  // $FlowIgnore this is initialized when the parser starts.
  commentPreviousNode: N.Node = null;

  // The current position of the tokenizer in the input.
  pos: number = 0;
  lineStart: number = 0;

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
  lastTokEnd: number = 0;

  // The context stack is used to superficially track syntactic
  // context to predict whether a regular expression is allowed in a
  // given position.
  context: Array<TokContext> = [ct.braceStatement];
  exprAllowed: boolean = true;

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.
  containsEsc: boolean = false;

  // TODO
  containsOctal: boolean = false;
  octalPosition: ?number = null;

  // Names of exports store. `default` is stored as a name for both
  // `export default foo;` and `export { foo as default };`.
  exportedIdentifiers: Array<string> = [];

  invalidTemplateEscapePosition: ?number = null;

  curPosition(): Position {
    return new Position(this.curLine, this.pos - this.lineStart);
  }

  clone(skipArrays?: boolean): State {
    const state = new State();
    Object.keys(this).forEach(key => {
      // $FlowIgnore
      let val = this[key];

      if ((!skipArrays || key === "context") && Array.isArray(val)) {
        val = val.slice();
      }

      // $FlowIgnore
      state[key] = val;
    });
    return state;
  }
}
