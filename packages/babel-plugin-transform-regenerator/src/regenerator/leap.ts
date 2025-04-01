import assert from "node:assert";
import { Emitter } from "./emit.ts";
import { getTypes } from "./util.ts";
import { types as t } from "@babel/core";

export class Entry {
  constructor() {
    assert.ok(this instanceof Entry);
  }
}

export class FunctionEntry extends Entry {
  declare returnLoc: t.NumericLiteral;
  constructor(returnLoc: t.NumericLiteral) {
    super();
    t.assertLiteral(returnLoc);
    this.returnLoc = returnLoc;
  }
}

export class LoopEntry extends Entry {
  declare breakLoc: t.NumericLiteral;
  declare continueLoc: t.NumericLiteral;
  declare label: t.Identifier;
  constructor(
    breakLoc: t.NumericLiteral,
    continueLoc: t.NumericLiteral,
    label: t.Identifier,
  ) {
    super();
    t.assertLiteral(breakLoc);
    t.assertLiteral(continueLoc);
    if (label) {
      t.assertIdentifier(label);
    } else {
      label = null;
    }
    this.breakLoc = breakLoc;
    this.continueLoc = continueLoc;
    this.label = label;
  }
}

export class SwitchEntry extends Entry {
  declare breakLoc: t.NumericLiteral;
  constructor(breakLoc: t.NumericLiteral) {
    super();
    t.assertLiteral(breakLoc);
    this.breakLoc = breakLoc;
  }
}

export class TryEntry extends Entry {
  declare firstLoc: t.NumericLiteral;
  declare catchEntry: CatchEntry;
  declare finallyEntry: FinallyEntry;
  constructor(firstLoc: any, catchEntry: any, finallyEntry: any) {
    super();
    getTypes().assertLiteral(firstLoc);
    if (catchEntry) {
      assert.ok(catchEntry instanceof CatchEntry);
    } else {
      catchEntry = null;
    }
    if (finallyEntry) {
      assert.ok(finallyEntry instanceof FinallyEntry);
    } else {
      finallyEntry = null;
    }
    assert.ok(catchEntry || finallyEntry);
    this.firstLoc = firstLoc;
    this.catchEntry = catchEntry;
    this.finallyEntry = finallyEntry;
  }
}

export class CatchEntry extends Entry {
  declare firstLoc: t.NumericLiteral;
  declare paramId: t.Identifier;
  constructor(firstLoc: t.NumericLiteral, paramId: t.Identifier) {
    super();
    t.assertLiteral(firstLoc);
    t.assertIdentifier(paramId);
    this.firstLoc = firstLoc;
    this.paramId = paramId;
  }
}

export class FinallyEntry extends Entry {
  declare firstLoc: t.NumericLiteral;
  declare afterLoc: t.NumericLiteral;
  constructor(firstLoc: t.NumericLiteral, afterLoc: t.NumericLiteral) {
    super();
    t.assertLiteral(firstLoc);
    t.assertLiteral(afterLoc);
    this.firstLoc = firstLoc;
    this.afterLoc = afterLoc;
  }
}

export class LabeledEntry extends Entry {
  declare breakLoc: t.NumericLiteral;
  declare label: t.Identifier;
  constructor(breakLoc: t.NumericLiteral, label: t.Identifier) {
    super();
    t.assertLiteral(breakLoc);
    t.assertIdentifier(label);
    this.breakLoc = breakLoc;
    this.label = label;
  }
}

export class LeapManager {
  declare emitter: Emitter;
  declare entryStack: Entry[];
  constructor(emitter: Emitter) {
    assert.ok(this instanceof LeapManager);
    assert.ok(emitter instanceof Emitter);
    this.emitter = emitter;
    this.entryStack = [new FunctionEntry(emitter.finalLoc)];
  }
  withEntry(entry: Entry, callback: any) {
    assert.ok(entry instanceof Entry);
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
