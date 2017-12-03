"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _util = require("util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Entry() {
  _assert2.default.ok(this instanceof Entry);
} /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */

function FunctionEntry(returnLoc) {
  Entry.call(this);
  t.assertLiteral(returnLoc);
  this.returnLoc = returnLoc;
}

(0, _util.inherits)(FunctionEntry, Entry);
exports.FunctionEntry = FunctionEntry;

function LoopEntry(breakLoc, continueLoc, label) {
  Entry.call(this);

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

(0, _util.inherits)(LoopEntry, Entry);
exports.LoopEntry = LoopEntry;

function SwitchEntry(breakLoc) {
  Entry.call(this);
  t.assertLiteral(breakLoc);
  this.breakLoc = breakLoc;
}

(0, _util.inherits)(SwitchEntry, Entry);
exports.SwitchEntry = SwitchEntry;

function TryEntry(firstLoc, catchEntry, finallyEntry) {
  Entry.call(this);

  t.assertLiteral(firstLoc);

  if (catchEntry) {
    _assert2.default.ok(catchEntry instanceof CatchEntry);
  } else {
    catchEntry = null;
  }

  if (finallyEntry) {
    _assert2.default.ok(finallyEntry instanceof FinallyEntry);
  } else {
    finallyEntry = null;
  }

  // Have to have one or the other (or both).
  _assert2.default.ok(catchEntry || finallyEntry);

  this.firstLoc = firstLoc;
  this.catchEntry = catchEntry;
  this.finallyEntry = finallyEntry;
}

(0, _util.inherits)(TryEntry, Entry);
exports.TryEntry = TryEntry;

function CatchEntry(firstLoc, paramId) {
  Entry.call(this);

  t.assertLiteral(firstLoc);
  t.assertIdentifier(paramId);

  this.firstLoc = firstLoc;
  this.paramId = paramId;
}

(0, _util.inherits)(CatchEntry, Entry);
exports.CatchEntry = CatchEntry;

function FinallyEntry(firstLoc, afterLoc) {
  Entry.call(this);
  t.assertLiteral(firstLoc);
  t.assertLiteral(afterLoc);
  this.firstLoc = firstLoc;
  this.afterLoc = afterLoc;
}

(0, _util.inherits)(FinallyEntry, Entry);
exports.FinallyEntry = FinallyEntry;

function LabeledEntry(breakLoc, label) {
  Entry.call(this);

  t.assertLiteral(breakLoc);
  t.assertIdentifier(label);

  this.breakLoc = breakLoc;
  this.label = label;
}

(0, _util.inherits)(LabeledEntry, Entry);
exports.LabeledEntry = LabeledEntry;

function LeapManager(emitter) {
  _assert2.default.ok(this instanceof LeapManager);

  var Emitter = require("./emit").Emitter;
  _assert2.default.ok(emitter instanceof Emitter);

  this.emitter = emitter;
  this.entryStack = [new FunctionEntry(emitter.finalLoc)];
}

var LMp = LeapManager.prototype;
exports.LeapManager = LeapManager;

LMp.withEntry = function (entry, callback) {
  _assert2.default.ok(entry instanceof Entry);
  this.entryStack.push(entry);
  try {
    callback.call(this.emitter);
  } finally {
    var popped = this.entryStack.pop();
    _assert2.default.strictEqual(popped, entry);
  }
};

LMp._findLeapLocation = function (property, label) {
  for (var i = this.entryStack.length - 1; i >= 0; --i) {
    var entry = this.entryStack[i];
    var loc = entry[property];
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

LMp.getBreakLoc = function (label) {
  return this._findLeapLocation("breakLoc", label);
};

LMp.getContinueLoc = function (label) {
  return this._findLeapLocation("continueLoc", label);
};