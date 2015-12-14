import type Fragment from "./fragment";
import { Action } from "./actions";
import repeating from "repeating";

export default class FragmentReducer {
  constructor(fragments, format) {
    this.fragments   = fragments;
    this.format      = format;
  }

  reset() {
    this.currentFragmentIndex = null;
    this.indentLevel = 0;
  }

  currentFragmentIndex: ?number;
  fragments: Array<Fragment>;
  indentLevel: number;

  indent() {
    this.indentLevel++;
  }

  dedent() {
    this.indentLevel--;
  }

  getIndent() {
    return repeating(this.format.indent.style, this.indentLevel);
  }

  nextFragment() {
    return this.getFragment(this.currentFragmentIndex + 1);
  }

  previousFragment() {
    return this.getFragment(this.currentFragmentIndex - 1);
  }

  afterFragment(callback) {
    let i = this.currentFragmentIndex;
    while (i < this.fragments.length && callback(this.getFragment(++i)) !== false) return;
  }

  beforeFragment(callback) {
    let i = this.currentFragmentIndex;
    while (i >= 0 && callback(this.getFragment(--i)) !== false) return;
  }

  currentFragment() {
    return this.getFragment(this.currentFragmentIndex);
  }

  getFragment(i) {
    return this.fragments[i] || false;
  }

  reduce(): string {
    let buf = "";

    this.reset();

    let { fragments } = this;

    for (let i = 0; i < fragments.length; i++) {
      let fragment = fragments[i];
      this.currentFragmentIndex = i;
      buf += fragment.toString(this);
    }

    return buf;
  }
}
