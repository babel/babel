import Fragment from "./fragment";
import Keyword from "./keywords";

export class Punctuator extends Fragment {
  constructor(val) {
    super();
    this._value = val;
  }

  toString(next) {
    return this._value;
  }
}

function buildPunctuator(val) {
  return class extends Punctuator {
    constructor() {
      super(val);
    }
  };
}

export let SemicolonPunctuator = buildPunctuator(";");
export let QuestionPunctuator  = buildPunctuator("?");
export let BracketLPunctuator  = buildPunctuator("[");
export let BracketRPunctuator  = buildPunctuator("]");

export class CurlyLPunctuator extends Punctuator {
  constructor() {
    super("{");
  }

  toString(reducer) {
    let prev = reducer.previousFragment();
    if (prev instanceof ParenRPunctuator || prev instanceof Keyword) {
      // if the previous token was a right paren or keyword then separate the fragments
      // with a space
      return " {";
    } else {
      return "{";
    }
  }
}

export class ParenRPunctuator extends Punctuator {
  constructor() {
    super(")");
  }

  toString(reducer) {
    if (reducer.nextFragment() instanceof Punctuator) {
      return ")";
    } else {
      return ") ";
    }
  }
}

export let CurlyRPunctuator    = buildPunctuator("}");
export let ParenLPunctuator    = buildPunctuator("(");
export let ColonPunctuator     = buildPunctuator(":");
export let DotPunctuator       = buildPunctuator(".");
