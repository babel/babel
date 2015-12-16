import Fragment from "./fragment";
import { ParenLPunctuator, SemicolonPunctuator, ColonPunctuator } from "./punctuators";

export class Keyword extends Fragment {
  constructor(name) {
    super();
    this._name = name;
  }

  toString(reducer) {
    let ret = this._name;

    let next = reducer.nextFragment();
    if (!(next instanceof SemicolonPunctuator) && !(next instanceof ColonPunctuator)) {
      ret += " ";
    }

    return ret;
  }
}

function buildKeyword(name) {
  return class extends Keyword {
    constructor() {
      super(name);
    }
  };
}

export let FunctionKeyword = buildKeyword("function");
export let DefaultKeyword  = buildKeyword("default");
export let FinallyKeyword  = buildKeyword("finally");
export let ClassKeyword    = buildKeyword("class");
export let ConstKeyword    = buildKeyword("const");
export let ImportKeyword   = buildKeyword("import");
export let ExportKeyword   = buildKeyword("export");
export let SwitchKeyword   = buildKeyword("switch");
export let AwaitKeyword    = buildKeyword("await");
export let YieldKeyword    = buildKeyword("yield");
export let WhileKeyword    = buildKeyword("while");
export let CatchKeyword    = buildKeyword("catch");
export let WithKeyword     = buildKeyword("with");
export let ElseKeyword     = buildKeyword("else");
export let CaseKeyword     = buildKeyword("case");
export let ForKeyword      = buildKeyword("for");
export let VarKeyword      = buildKeyword("var");
export let LetKeyword      = buildKeyword("let");
export let TryKeyword      = buildKeyword("try");
export let NewKeyword      = buildKeyword("new");
export let DoKeyword       = buildKeyword("do");
export let IfKeyword       = buildKeyword("if");

export let ContinueKeyword = buildKeyword("continue");
export let ReturnKeyword   = buildKeyword("return");
export let BreakKeyword    = buildKeyword("break");
export let ThrowKeyword    = buildKeyword("throw");
