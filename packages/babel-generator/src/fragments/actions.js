import Fragment from "./fragment";

export class Action extends Fragment {
  toString() {
    return "";
  }
}

export class StartTerminatorlessAction {
  constructor(endAction) {
    this._endAction = endAction;
  }

  toString(reducer) {
    let enabled = false;

    reducer.afterFragment((fragment) => {
      if (fragment === this._endAction) return false;

      // perform checks here
    });

    if (enabled) {
      this._endAction._enabled = true;
      return "(";
    }
  }
}

export class EndTerminatorlessAction {
  constructor() {
    this._enabled = false;
  }
}

export class IndentAction extends Action {
  toString(reducer) {
    let next = reducer.nextFragment();

    if (next instanceof DedentAction) {
      // noop
      return "";
    }

    reducer.indent();

    if (next instanceof NewlineAction) {
      return "";
    }

    return reducer.getIndent();
  }
}

export class DedentAction extends Action {
  toString(reducer) {
    reducer.dedent();

    if (reducer.nextFragment() instanceof NewlineAction) {
      return "";
    }

    return "\n" + reducer.getIndent();
  }
}

export class NewlineAction extends Action {
  toString(reducer) {
    if (reducer.nextFragment() instanceof DedentAction) {
      return "";
    }

    return "\n" + reducer.getIndent();
  }
}
