/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var types = require("ast-types");
var n = types.namedTypes;
var b = types.builders;
var inherits = require("util").inherits;

function Entry() {
  assert.ok(this instanceof Entry);
}

function FunctionEntry(returnLoc) {
  Entry.call(this);

  n.Literal.assert(returnLoc);

  Object.defineProperties(this, {
    returnLoc: { value: returnLoc }
  });
}

inherits(FunctionEntry, Entry);
exports.FunctionEntry = FunctionEntry;

function LoopEntry(breakLoc, continueLoc, label) {
  Entry.call(this);

  n.Literal.assert(breakLoc);
  n.Literal.assert(continueLoc);

  if (label) {
    n.Identifier.assert(label);
  } else {
    label = null;
  }

  Object.defineProperties(this, {
    breakLoc: { value: breakLoc },
    continueLoc: { value: continueLoc },
    label: { value: label }
  });
}

inherits(LoopEntry, Entry);
exports.LoopEntry = LoopEntry;

function SwitchEntry(breakLoc) {
  Entry.call(this);

  n.Literal.assert(breakLoc);

  Object.defineProperties(this, {
    breakLoc: { value: breakLoc }
  });
}

inherits(SwitchEntry, Entry);
exports.SwitchEntry = SwitchEntry;

function TryEntry(catchEntry, finallyEntry) {
  Entry.call(this);

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

  Object.defineProperties(this, {
    catchEntry: { value: catchEntry },
    finallyEntry: { value: finallyEntry }
  });
}

inherits(TryEntry, Entry);
exports.TryEntry = TryEntry;

function CatchEntry(firstLoc, paramId) {
  Entry.call(this);

  n.Literal.assert(firstLoc);
  n.Identifier.assert(paramId);

  Object.defineProperties(this, {
    firstLoc: { value: firstLoc },
    paramId: { value: paramId }
  });
}

inherits(CatchEntry, Entry);
exports.CatchEntry = CatchEntry;

function FinallyEntry(firstLoc, nextLocTempVar) {
  Entry.call(this);

  n.Literal.assert(firstLoc);
  n.MemberExpression.assert(nextLocTempVar);

  Object.defineProperties(this, {
    firstLoc: { value: firstLoc },
    nextLocTempVar: { value: nextLocTempVar }
  });
}

inherits(FinallyEntry, Entry);
exports.FinallyEntry = FinallyEntry;

function LeapManager(emitter) {
  assert.ok(this instanceof LeapManager);

  var Emitter = require("./emit").Emitter;
  assert.ok(emitter instanceof Emitter);

  Object.defineProperties(this, {
    emitter: { value: emitter },
    entryStack: {
      value: [new FunctionEntry(emitter.finalLoc)]
    }
  });
}

var LMp = LeapManager.prototype;
exports.LeapManager = LeapManager;

LMp.withEntry = function(entry, callback) {
  assert.ok(entry instanceof Entry);
  this.entryStack.push(entry);
  try {
    callback.call(this.emitter);
  } finally {
    var popped = this.entryStack.pop();
    assert.strictEqual(popped, entry);
  }
};

LMp._leapToEntry = function(predicate, defaultLoc) {
  var entry, loc;
  var finallyEntries = [];
  var skipNextTryEntry = null;

  for (var i = this.entryStack.length - 1; i >= 0; --i) {
    entry = this.entryStack[i];

    if (entry instanceof CatchEntry ||
        entry instanceof FinallyEntry) {

      // If we are inside of a catch or finally block, then we must
      // have exited the try block already, so we shouldn't consider
      // the next TryStatement as a handler for this throw.
      skipNextTryEntry = entry;

    } else if (entry instanceof TryEntry) {
      if (skipNextTryEntry) {
        // If an exception was thrown from inside a catch block and this
        // try statement has a finally block, make sure we execute that
        // finally block.
        if (skipNextTryEntry instanceof CatchEntry &&
            entry.finallyEntry) {
          finallyEntries.push(entry.finallyEntry);
        }

        skipNextTryEntry = null;

      } else if ((loc = predicate.call(this, entry))) {
        break;

      } else if (entry.finallyEntry) {
        finallyEntries.push(entry.finallyEntry);
      }

    } else if ((loc = predicate.call(this, entry))) {
      break;
    }
  }

  if (loc) {
    // fall through
  } else if (defaultLoc) {
    loc = defaultLoc;
  } else {
    return null;
  }

  n.Literal.assert(loc);

  while ((finallyEntry = finallyEntries.pop())) {
    this.emitter.emitAssign(finallyEntry.nextLocTempVar, loc);
    loc = finallyEntry.firstLoc;
  }

  return loc;
};

function getLeapLocation(entry, property, label) {
  var loc = entry[property];
  if (loc) {
    if (label) {
      if (entry.label &&
          entry.label.name === label.name) {
        return loc;
      }
    } else {
      return loc;
    }
  }
  return null;
}

LMp.emitBreak = function(label) {
  var loc = this._leapToEntry(function(entry) {
    return getLeapLocation(entry, "breakLoc", label);
  });

  if (loc === null) {
    throw new Error("illegal break statement");
  }

  this.emitter.clearPendingException();
  this.emitter.jump(loc);
};

LMp.emitContinue = function(label) {
  var loc = this._leapToEntry(function(entry) {
    return getLeapLocation(entry, "continueLoc", label);
  });

  if (loc === null) {
    throw new Error("illegal continue statement");
  }

  this.emitter.clearPendingException();
  this.emitter.jump(loc);
};

LMp.emitReturn = function(argPath) {
  assert.ok(argPath instanceof types.NodePath);

  var loc = this._leapToEntry(function(entry) {
    return getLeapLocation(entry, "returnLoc");
  });

  if (loc === null) {
    throw new Error("illegal return statement");
  }

  if (argPath.value) {
    this.emitter.setReturnValue(argPath);
  }

  this.emitter.clearPendingException();
  this.emitter.jump(loc);
};
