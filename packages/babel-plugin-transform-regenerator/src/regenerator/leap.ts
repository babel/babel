import assert from "assert";
import { Emitter } from "./emit.ts";
import { inherits } from "util";
import { getTypes } from "./util.ts";

function Entry(this: any) {
  assert.ok(this instanceof Entry);
}

export function FunctionEntry(this: any, returnLoc: any) {
  Entry.call(this);
  getTypes().assertLiteral(returnLoc);
  this.returnLoc = returnLoc;
}

inherits(FunctionEntry, Entry);

export function LoopEntry(
  this: any,
  breakLoc: any,
  continueLoc: any,
  label: any,
) {
  Entry.call(this);

  const t = getTypes();

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

inherits(LoopEntry, Entry);

export function SwitchEntry(this: any, breakLoc: any) {
  Entry.call(this);
  getTypes().assertLiteral(breakLoc);
  this.breakLoc = breakLoc;
}

inherits(SwitchEntry, Entry);

export function TryEntry(
  this: any,
  firstLoc: any,
  catchEntry: any,
  finallyEntry: any,
) {
  Entry.call(this);

  const t = getTypes();
  t.assertLiteral(firstLoc);

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

  // Have to have one or the other (or both).
  assert.ok(catchEntry || finallyEntry);

  this.firstLoc = firstLoc;
  this.catchEntry = catchEntry;
  this.finallyEntry = finallyEntry;
}

inherits(TryEntry, Entry);

export function CatchEntry(this: any, firstLoc: any, paramId: any) {
  Entry.call(this);

  const t = getTypes();

  t.assertLiteral(firstLoc);
  t.assertIdentifier(paramId);

  this.firstLoc = firstLoc;
  this.paramId = paramId;
}

inherits(CatchEntry, Entry);

export function FinallyEntry(this: any, firstLoc: any, afterLoc: any) {
  Entry.call(this);
  const t = getTypes();
  t.assertLiteral(firstLoc);
  t.assertLiteral(afterLoc);
  this.firstLoc = firstLoc;
  this.afterLoc = afterLoc;
}

inherits(FinallyEntry, Entry);

export function LabeledEntry(this: any, breakLoc: any, label: any) {
  Entry.call(this);

  const t = getTypes();

  t.assertLiteral(breakLoc);
  t.assertIdentifier(label);

  this.breakLoc = breakLoc;
  this.label = label;
}

inherits(LabeledEntry, Entry);

export function LeapManager(this: any, emitter: any) {
  assert.ok(this instanceof LeapManager);

  assert.ok(emitter instanceof Emitter);

  (this as any).emitter = emitter;
  (this as any).entryStack = [
    // @ts-expect-error -- TODO (regenerator import)
    new FunctionEntry(emitter.finalLoc),
  ];
}

const LMp = LeapManager.prototype;

LMp.withEntry = function (entry: any, callback: any) {
  assert.ok(entry instanceof Entry);
  this.entryStack.push(entry);
  try {
    callback.call(this.emitter);
  } finally {
    const popped = this.entryStack.pop();
    assert.strictEqual(popped, entry);
  }
};

LMp._findLeapLocation = function (property: any, label: any) {
  for (let i = this.entryStack.length - 1; i >= 0; --i) {
    const entry = this.entryStack[i];
    const loc = entry[property];
    if (loc) {
      if (label) {
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
};

LMp.getBreakLoc = function (label: any) {
  return this._findLeapLocation("breakLoc", label);
};

LMp.getContinueLoc = function (label: any) {
  return this._findLeapLocation("continueLoc", label);
};
