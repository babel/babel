/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var types = require("recast").types;
var n = types.namedTypes;
var b = types.builders;
var inherits = require("util").inherits;
var hasOwn = Object.prototype.hasOwnProperty;

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

function TryEntry(firstLoc, catchEntry, finallyEntry) {
  Entry.call(this);

  n.Literal.assert(firstLoc);

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

  Object.defineProperties(this, {
    firstLoc: { value: firstLoc },
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

function FinallyEntry(firstLoc) {
  Entry.call(this);

  n.Literal.assert(firstLoc);

  Object.defineProperties(this, {
    firstLoc: { value: firstLoc }
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

LMp._findLeapLocation = function(property, label) {
  for (var i = this.entryStack.length - 1; i >= 0; --i) {
    var entry = this.entryStack[i];
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
  }

  return null;
};

LMp.getBreakLoc = function(label) {
  return this._findLeapLocation("breakLoc", label);
};

LMp.getContinueLoc = function(label) {
  return this._findLeapLocation("continueLoc", label);
};
