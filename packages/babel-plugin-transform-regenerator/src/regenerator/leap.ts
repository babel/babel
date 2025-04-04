import assert from "node:assert";
import type { Emitter } from "./emit.ts";
import type { types as t } from "@babel/core";

export class Entry {}

export class FunctionEntry extends Entry {
  returnLoc: t.NumericLiteral;

  constructor(returnLoc: t.NumericLiteral) {
    super();
    this.returnLoc = returnLoc;
  }
}

export class LoopEntry extends Entry {
  breakLoc: t.NumericLiteral;
  continueLoc: t.NumericLiteral;
  label: t.Identifier;

  constructor(
    breakLoc: t.NumericLiteral,
    continueLoc: t.NumericLiteral,
    label: t.Identifier = null,
  ) {
    super();
    this.breakLoc = breakLoc;
    this.continueLoc = continueLoc;
    this.label = label;
  }
}

export class SwitchEntry extends Entry {
  breakLoc: t.NumericLiteral;

  constructor(breakLoc: t.NumericLiteral) {
    super();
    this.breakLoc = breakLoc;
  }
}

export class TryEntry extends Entry {
  firstLoc: t.NumericLiteral;
  catchEntry: CatchEntry;
  finallyEntry: FinallyEntry;

  constructor(
    firstLoc: t.NumericLiteral,
    catchEntry: CatchEntry | null = null,
    finallyEntry: FinallyEntry | null = null,
  ) {
    super();
    assert.ok(catchEntry || finallyEntry);
    this.firstLoc = firstLoc;
    this.catchEntry = catchEntry;
    this.finallyEntry = finallyEntry;
  }
}

export class CatchEntry extends Entry {
  firstLoc: t.NumericLiteral;
  paramId: t.Identifier;

  constructor(firstLoc: t.NumericLiteral, paramId: t.Identifier) {
    super();
    this.firstLoc = firstLoc;
    this.paramId = paramId;
  }
}

export class FinallyEntry extends Entry {
  firstLoc: t.NumericLiteral;
  afterLoc: t.NumericLiteral;

  constructor(firstLoc: t.NumericLiteral, afterLoc: t.NumericLiteral) {
    super();
    this.firstLoc = firstLoc;
    this.afterLoc = afterLoc;
  }
}

export class LabeledEntry extends Entry {
  breakLoc: t.NumericLiteral;
  label: t.Identifier;

  constructor(breakLoc: t.NumericLiteral, label: t.Identifier) {
    super();
    this.breakLoc = breakLoc;
    this.label = label;
  }
}

export class LeapManager {
  emitter: Emitter;
  entryStack: Entry[];

  constructor(emitter: Emitter) {
    this.emitter = emitter;
    this.entryStack = [new FunctionEntry(emitter.finalLoc)];
  }

  withEntry(entry: Entry, callback: any) {
    this.entryStack.push(entry);
    try {
      callback.call(this.emitter);
    } finally {
      const popped = this.entryStack.pop();
      assert.strictEqual(popped, entry);
    }
  }

  _findLeapLocation(property: "breakLoc" | "continueLoc", label: t.Identifier) {
    for (let i = this.entryStack.length - 1; i >= 0; --i) {
      const entry = this.entryStack[i];
      // @ts-expect-error Element implicitly has an 'any' type
      const loc = entry[property] as t.NumericLiteral;
      if (loc) {
        if (label) {
          // @ts-expect-error entry.label may not exist
          if (entry.label && entry.label.name === label.name) {
            return loc;
          }
        } else if (entry instanceof LabeledEntry) {
          // Ignore LabeledEntry entries unless we are actually breaking to
          // a label.
        } else {
          return loc;
        }
      }
    }
    return null;
  }

  getBreakLoc(label: t.Identifier) {
    return this._findLeapLocation("breakLoc", label);
  }

  getContinueLoc(label: t.Identifier) {
    return this._findLeapLocation("continueLoc", label);
  }
}
