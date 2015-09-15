import { Position } from "../util/location";
import { types as ct } from "./context";
import { types as tt } from "./types";

export default class State {
  init(options, input) {
    // strict
    this.strict = options.strictMode === false ? false : options.sourceType === "module";

    this.input = input;

    // Used to signify the start of a potential arrow function
    this.potentialArrowAt = -1;

    // Flags to track whether we are in a function, a generator.
    this.inFunction = this.inGenerator = false;

    // Labels in scope.
    this.labels = [];

    // Leading decorators.
    this.decorators = [];

    // Token store.
    this.tokens = [];

    // Comment store.
    this.comments = [];

    // Comment attachment store
    this.trailingComments = [];
    this.leadingComments  = [];
    this.commentStack     = [];

    // The current position of the tokenizer in the input.
    this.pos = this.lineStart = 0;
    this.curLine = 1;

    // Properties of the current token:
    // Its type
    this.type = tt.eof;
    // For tokens that include more information than their type, the value
    this.value = null;
    // Its start and end offset
    this.start = this.end = this.pos;
    // And, if locations are used, the {line, column} object
    // corresponding to those offsets
    this.startLoc = this.endLoc = this.curPosition();

    // Position information for the previous token
    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;

    // The context stack is used to superficially track syntactic
    // context to predict whether a regular expression is allowed in a
    // given position.
    this.context = [ct.b_stat];
    this.exprAllowed = true;

    // Used to signal to callers of `readWord1` whether the word
    // contained any escape sequences. This is needed because words with
    // escape sequences must not be interpreted as keywords.
    this.containsEsc = false;

    return this;
  }

  curPosition() {
    return new Position(this.curLine, this.pos - this.lineStart);
  }

  clone(skipArrays?) {
    var state = new State;
    for (var key in this) {
      var val = this[key];

      if (!skipArrays && Array.isArray(val)) {
        val = val.slice();
      }

      state[key] = val;
    }
    return state;
  }
}
