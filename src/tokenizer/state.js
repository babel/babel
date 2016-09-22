import type { TokContext } from "./context";
import type { Token } from "./index";
import { Position } from "../util/location";
import { types as ct } from "./context";
import { types as tt } from "./types";

export default class State {
  init(options: Object, input: string) {
    this.strict = options.strictMode === false ? false : options.sourceType === "module";

    this.input = input;

    this.potentialArrowAt = -1;

    this.inMethod = this.inFunction = this.inGenerator = this.inAsync = false;

    this.labels = [];

    this.decorators = [];

    this.tokens = [];

    this.comments = [];

    this.trailingComments = [];
    this.leadingComments  = [];
    this.commentStack     = [];

    this.pos = this.lineStart = 0;
    this.curLine = 1;

    this.type = tt.eof;
    this.value = null;
    this.start = this.end = this.pos;
    this.startLoc = this.endLoc = this.curPosition();

    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;

    this.context = [ct.braceStatement];
    this.exprAllowed = true;

    this.containsEsc = this.containsOctal = false;
    this.octalPosition = null;

    this.exportedIdentifiers = {};

    return this;
  }

  // TODO
  strict: boolean;

  // TODO
  input: string;

  // Used to signify the start of a potential arrow function
  potentialArrowAt: number;

  // Flags to track whether we are in a function, a generator.
  inFunction: boolean;
  inGenerator: boolean;
  inMethod: boolean;

  // Labels in scope.
  labels: Array<Object>;

  // Leading decorators.
  decorators: Array<Object>;

  // Token store.
  tokens: Array<Object>;

  // Comment store.
  comments: Array<Object>;

  // Comment attachment store
  trailingComments: Array<Object>;
  leadingComments: Array<Object>;
  commentStack: Array<Object>;

  // The current position of the tokenizer in the input.
  pos: number;
  lineStart: number;
  curLine: number;

  // Properties of the current token:
  // Its type
  type: Token;

  // For tokens that include more information than their type, the value
  value: any;

  // Its start and end offset
  start: number;
  end: number;

  // And, if locations are used, the {line, column} object
  // corresponding to those offsets
  startLoc: Position;
  endLoc: Position;

  // Position information for the previous token
  lastTokEndLoc: ?Position;
  lastTokStartLoc: ?Position;
  lastTokStart: number;
  lastTokEnd: number;

  // The context stack is used to superficially track syntactic
  // context to predict whether a regular expression is allowed in a
  // given position.
  context: Array<TokContext>;
  exprAllowed: boolean;

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.
  containsEsc: boolean;

  // TODO
  containsOctal: boolean;
  octalPosition: ?number;

  // Names of exports store. `default` is stored as a name for both
  // `export default foo;` and `export { foo as default };`.
  exportedIdentifiers: {[id:string]: boolean};

  curPosition() {
    return new Position(this.curLine, this.pos - this.lineStart);
  }

  clone(skipArrays?) {
    let state = new State;
    for (let key in this) {
      let val = this[key];

      if ((!skipArrays || key === "context") && Array.isArray(val)) {
        val = val.slice();
      }

      state[key] = val;
    }
    return state;
  }
}
