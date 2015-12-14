import type Position from "./position";
import type Fragment from "./fragments/fragment";
import { RawFragment } from "./fragments/fragment";
import FragmentReducer from "./fragments/reducer";
import * as actions from "./fragments/actions";
import repeating from "repeating";
import trimRight from "trim-right";

/**
 * Buffer for collecting generated output.
 */

export default class Buffer {
  constructor(position: Position, format: Object) {
    this.printedCommentStarts = {};
    this.parenPushNewlineState = null;
    this.position = position;
    this._indent = format.indent.base;
    this.format = format;

    this.fragments = [];
    this.got       = false;
  }

  fragments: Array<Fragment>;
  position: Position;
  _indent: number;
  format: Object;

  /**
   * Get the current trimmed buffer.
   */

  get() {
    if (this.got) {
      throw new Error("Already generated.");
    } else {
      return new FragmentReducer(this.fragments, this.format).reduce().trim();
    }
  }

  indent() {
    this.fragments.push(new actions.IndentAction);
  }

  dedent() {
    this.fragments.push(new actions.DedentAction);
  }

  space(force?: boolean) {
    if (!force && this.format.compact) return;

    if (force || this.buf && !this.isLast(" ") && !this.isLast("\n")) {
      this.push(" ");
    }
  }

  newline(i?: number) {
    if (this.format.retainLines || this.format.compact) return;

    if (this.format.concise) {
      this.space();
      return;
    }

    if (typeof i === "number") {
      i = Math.min(2, i);
      if (i <= 0) return;

      while (i > 0) {
        this._newline();
        i--;
      }
      return;
    }

    this._newline();
  }

  _newline() {
    this.push(new actions.NewlineAction);
  }

  /**
   * Push a string to the buffer, maintaining indentation and newlines.
   */

  push(fragment) {
    if (typeof fragment === "string") {
      fragment = new RawFragment(fragment);
    }

    this.fragments.push(fragment);
  }
}
