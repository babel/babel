/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

exports.Emitter = Emitter;

var runtimeProperty = require("./util").runtimeProperty;
var assert          = require("assert");
var types           = require("ast-types");
var leap            = require("./leap");
var meta            = require("./meta");
var t               = require("../../../types");
var _               = require("lodash");

var runtimeKeysMethod = runtimeProperty("keys");
var n                 = types.namedTypes;

function Emitter(contextId) {
  assert.ok(this instanceof Emitter);
  t.assertIdentifier(contextId);

  // In order to make sure the context object does not collide with
  // anything in the local scope, we might have to rename it, so we
  // refer to it symbolically instead of just assuming that it will be
  // called "context".
  this.contextId = contextId;

  // An append-only list of Statements that grows each time this.emit is
  // called.
  this.listing = [];

  // A sparse array whose keys correspond to locations in this.listing
  // that have been marked as branch/jump targets.
  this.marked = [true];

  // The last location will be marked when this.getDispatchLoop is
  // called.
  this.finalLoc = loc();

  // A list of all leap.TryEntry statements emitted.
  this.tryEntries = [];

  // Each time we evaluate the body of a loop, we tell this.leapManager
  // to enter a nested loop context that determines the meaning of break
  // and continue statements therein.
  this.leapManager = new leap.LeapManager(this);
}

// Offsets into this.listing that could be used as targets for branches or
// jumps are represented as numeric Literal nodes. This representation has
// the amazingly convenient benefit of allowing the exact value of the
// location to be determined at any time, even after generating code that
// refers to the location.
function loc() {
  return t.literal(-1);
}

// Sets the exact value of the given location to the offset of the next
// Statement emitted.
Emitter.prototype.mark = function (loc) {
  t.assertLiteral(loc);
  var index = this.listing.length;
  if (loc.value === -1) {
    loc.value = index;
  } else {
    // Locations can be marked redundantly, but their values cannot change
    // once set the first time.
    assert.strictEqual(loc.value, index);
  }
  this.marked[index] = true;
  return loc;
};

Emitter.prototype.emit = function (node) {
  if (t.isExpression(node)) node = t.expressionStatement(node);
  t.assertStatement(node);
  this.listing.push(node);
};

// Shorthand for emitting assignment statements. This will come in handy
// for assignments to temporary variables.
Emitter.prototype.emitAssign = function (lhs, rhs) {
  this.emit(this.assign(lhs, rhs));
  return lhs;
};

// Shorthand for an assignment statement.
Emitter.prototype.assign = function (lhs, rhs) {
  return t.expressionStatement(
    t.assignmentExpression("=", lhs, rhs));
};

// Convenience function for generating expressions like context.next,
// context.sent, and context.rval.
Emitter.prototype.contextProperty = function (name, computed) {
  return t.memberExpression(
    this.contextId,
    computed ? t.literal(name) : t.identifier(name),
    !!computed
  );
};

var volatileContextPropertyNames = {
  prev: true,
  next: true,
  sent: true,
  rval: true
};

// A "volatile" context property is a MemberExpression like context.sent
// that should probably be stored in a temporary variable when there's a
// possibility the property will get overwritten.
Emitter.prototype.isVolatileContextProperty = function (expr) {
  if (t.isMemberExpression(expr)) {
    if (expr.computed) {
      // If it's a computed property such as context[couldBeAnything],
      // assume the worst in terms of volatility.
      return true;
    }

    if (t.isIdentifier(expr.object) &&
        t.isIdentifier(expr.property) &&
        expr.object.name === this.contextId.name &&
        _.has(volatileContextPropertyNames, expr.property.name)) {
      return true;
    }
  }

  return false;
};

// Shorthand for setting context.rval and jumping to `context.stop()`.
Emitter.prototype.stop = function (rval) {
  if (rval) {
    this.setReturnValue(rval);
  }

  this.jump(this.finalLoc);
};

Emitter.prototype.setReturnValue = function (valuePath) {
  t.assertExpression(valuePath.value);

  this.emitAssign(
    this.contextProperty("rval"),
    this.explodeExpression(valuePath)
  );
};

Emitter.prototype.clearPendingException = function (tryLoc, assignee) {
  t.assertLiteral(tryLoc);

  var catchCall = t.callExpression(
    this.contextProperty("catch", true),
    [tryLoc]
  );

  if (assignee) {
    this.emitAssign(assignee, catchCall);
  } else {
    this.emit(catchCall);
  }
};

// Emits code for an unconditional jump to the given location, even if the
// exact value of the location is not yet known.
Emitter.prototype.jump = function (toLoc) {
  this.emitAssign(this.contextProperty("next"), toLoc);
  this.emit(t.breakStatement());
};

// Conditional jump.
Emitter.prototype.jumpIf = function (test, toLoc) {
  t.assertExpression(test);
  t.assertLiteral(toLoc);

  this.emit(t.ifStatement(
    test,
    t.blockStatement([
      this.assign(this.contextProperty("next"), toLoc),
      t.breakStatement()
    ])
  ));
};

// Conditional jump, with the condition negated.
Emitter.prototype.jumpIfNot = function (test, toLoc) {
  t.assertExpression(test);
  t.assertLiteral(toLoc);

  var negatedTest;
  if (t.isUnaryExpression(test) && test.operator === "!") {
    // Avoid double negation.
    negatedTest = test.argument;
  } else {
    negatedTest = t.unaryExpression("!", test);
  }

  this.emit(t.ifStatement(
    negatedTest,
    t.blockStatement([
      this.assign(this.contextProperty("next"), toLoc),
      t.breakStatement()
    ])
  ));
};

// Returns a unique MemberExpression that can be used to store and
// retrieve temporary values. Since the object of the member expression is
// the context object, which is presumed to coexist peacefully with all
// other local variables, and since we just increment `nextTempId`
// monotonically, uniqueness is assured.
var nextTempId = 0;
Emitter.prototype.makeTempVar = function () {
  return this.contextProperty("t" + nextTempId++);
};

Emitter.prototype.getContextFunction = function (id) {
  var node = t.functionExpression(
    id || null,
    [this.contextId],
    t.blockStatement([this.getDispatchLoop()]),
    false, // Not a generator anymore!
    false // Nor an expression.
  );
  node._aliasFunction = true;
  return node;
};

// Turns this.listing into a loop of the form
//
//   while (1) switch (context.next) {
//   case 0:
//   ...
//   case n:
//     return context.stop();
//   }
//
// Each marked location in this.listing will correspond to one generated
// case statement.
Emitter.prototype.getDispatchLoop = function () {
  var self = this;
  var cases = [];
  var current;

  // If we encounter a break, continue, or return statement in a switch
  // case, we can skip the rest of the statements until the next case.
  var alreadyEnded = false;

  self.listing.forEach(function (stmt, i) {
    if (self.marked.hasOwnProperty(i)) {
      cases.push(t.switchCase(t.literal(i), current = []));
      alreadyEnded = false;
    }

    if (!alreadyEnded) {
      current.push(stmt);
      if (isSwitchCaseEnder(stmt))
        alreadyEnded = true;
    }
  });

  // Now that we know how many statements there will be in this.listing,
  // we can finally resolve this.finalLoc.value.
  this.finalLoc.value = this.listing.length;

  cases.push(
    t.switchCase(this.finalLoc, [
      // Intentionally fall through to the "end" case...
    ]),

    // So that the runtime can jump to the final location without having
    // to know its offset, we provide the "end" case as a synonym.
    t.switchCase(t.literal("end"), [
      // This will check/clear both context.thrown and context.rval.
      t.returnStatement(
        t.callExpression(this.contextProperty("stop"), [])
      )
    ])
  );

  return t.whileStatement(
    t.literal(true),
    t.switchStatement(
      t.assignmentExpression(
        "=",
        this.contextProperty("prev"),
        this.contextProperty("next")
      ),
      cases
    )
  );
};

// See comment above re: alreadyEnded.
function isSwitchCaseEnder(stmt) {
  return t.isBreakStatement(stmt) ||
         t.isContinueStatement(stmt) ||
         t.isReturnStatement(stmt) ||
         t.isThrowStatement(stmt);
}

Emitter.prototype.getTryEntryList = function () {
  if (this.tryEntries.length === 0) {
    // To avoid adding a needless [] to the majority of runtime.wrap
    // argument lists, force the caller to handle this case specially.
    return null;
  }

  var lastLocValue = 0;

  return t.arrayExpression(
    this.tryEntries.map(function (tryEntry) {
      var thisLocValue = tryEntry.firstLoc.value;
      assert.ok(thisLocValue >= lastLocValue, "try entries out of order");
      lastLocValue = thisLocValue;

      var ce = tryEntry.catchEntry;
      var fe = tryEntry.finallyEntry;

      var triple = [
        tryEntry.firstLoc,
        // The null here makes a hole in the array.
        ce ? ce.firstLoc : null
      ];

      if (fe) {
        triple[2] = fe.firstLoc;
      }

      return t.arrayExpression(triple);
    })
  );
};

// All side effects must be realized in order.

// If any subexpression harbors a leap, all subexpressions must be
// neutered of side effects.

// No destructive modification of AST nodes.

Emitter.prototype.explode = function (path, ignoreResult) {
  assert.ok(path instanceof types.NodePath);

  var node = path.value;
  var self = this;

  n.Node.check(node);

  if (t.isStatement(node))
    return self.explodeStatement(path);

  if (t.isExpression(node))
    return self.explodeExpression(path, ignoreResult);

  if (t.isDeclaration(node))
    throw getDeclError(node);

  switch (node.type) {
  case "Program":
    return path.get("body").map(self.explodeStatement, self);

  case "VariableDeclarator":
    throw getDeclError(node);

  // These node types should be handled by their parent nodes
  // (ObjectExpression, SwitchStatement, and TryStatement, respectively).
  case "Property":
  case "SwitchCase":
  case "CatchClause":
    throw new Error(node.type + " nodes should be handled by their parents");

  default:
    throw new Error("unknown Node of type " + JSON.stringify(node.type));
  }
};

function getDeclError(node) {
  return new Error(
    "all declarations should have been transformed into " +
    "assignments before the Exploder began its work: " +
    JSON.stringify(node));
}

Emitter.prototype.explodeStatement = function (path, labelId) {
  assert.ok(path instanceof types.NodePath);

  var stmt = path.value;
  var self = this;
  var after, head;

  t.assertStatement(stmt);

  if (labelId) {
    t.assertIdentifier(labelId);
  } else {
    labelId = null;
  }

  // Explode BlockStatement nodes even if they do not contain a yield,
  // because we don't want or need the curly braces.
  if (t.isBlockStatement(stmt)) {
    return path.get("body").each(
      self.explodeStatement,
      self
    );
  }

  if (!meta.containsLeap(stmt)) {
    // Technically we should be able to avoid emitting the statement
    // altogether if !meta.hasSideEffects(stmt), but that leads to
    // confusing generated code (for instance, `while (true) {}` just
    // disappears) and is probably a more appropriate job for a dedicated
    // dead code elimination pass.
    self.emit(stmt);
    return;
  }

  switch (stmt.type) {
  case "ExpressionStatement":
    self.explodeExpression(path.get("expression"), true);
    break;

  case "LabeledStatement":
    self.explodeStatement(path.get("body"), stmt.label);
    break;

  case "WhileStatement":
    var before = loc();
    after = loc();

    self.mark(before);
    self.jumpIfNot(self.explodeExpression(path.get("test")), after);
    self.leapManager.withEntry(
      new leap.LoopEntry(after, before, labelId),
      function () { self.explodeStatement(path.get("body")); }
    );
    self.jump(before);
    self.mark(after);

    break;

  case "DoWhileStatement":
    var first = loc();
    var test = loc();
    after = loc();

    self.mark(first);
    self.leapManager.withEntry(
      new leap.LoopEntry(after, test, labelId),
      function () { self.explode(path.get("body")); }
    );
    self.mark(test);
    self.jumpIf(self.explodeExpression(path.get("test")), first);
    self.mark(after);

    break;

  case "ForStatement":
    head = loc();
    var update = loc();
    after = loc();

    if (stmt.init) {
      // We pass true here to indicate that if stmt.init is an expression
      // then we do not care about its result.
      self.explode(path.get("init"), true);
    }

    self.mark(head);

    if (stmt.test) {
      self.jumpIfNot(self.explodeExpression(path.get("test")), after);
    } else {
      // No test means continue unconditionally.
    }

    self.leapManager.withEntry(
      new leap.LoopEntry(after, update, labelId),
      function () { self.explodeStatement(path.get("body")); }
    );

    self.mark(update);

    if (stmt.update) {
      // We pass true here to indicate that if stmt.update is an
      // expression then we do not care about its result.
      self.explode(path.get("update"), true);
    }

    self.jump(head);

    self.mark(after);

    break;

  case "ForInStatement":
    t.assertIdentifier(stmt.left);

    head = loc();
    after = loc();

    var keyIterNextFn = self.makeTempVar();
    self.emitAssign(
      keyIterNextFn,
      t.callExpression(
        runtimeKeysMethod,
        [self.explodeExpression(path.get("right"))]
      )
    );

    self.mark(head);

    var keyInfoTmpVar = self.makeTempVar();
    self.jumpIf(
      t.memberExpression(
        t.assignmentExpression(
          "=",
          keyInfoTmpVar,
          t.callExpression(keyIterNextFn, [])
        ),
        t.identifier("done"),
        false
      ),
      after
    );

    self.emitAssign(
      stmt.left,
      t.memberExpression(
        keyInfoTmpVar,
        t.identifier("value"),
        false
      )
    );

    self.leapManager.withEntry(
      new leap.LoopEntry(after, head, labelId),
      function () { self.explodeStatement(path.get("body")); }
    );

    self.jump(head);

    self.mark(after);

    break;

  case "BreakStatement":
    self.emitAbruptCompletion({
      type: "break",
      target: self.leapManager.getBreakLoc(stmt.label)
    });

    break;

  case "ContinueStatement":
    self.emitAbruptCompletion({
      type: "continue",
      target: self.leapManager.getContinueLoc(stmt.label)
    });

    break;

  case "SwitchStatement":
    // Always save the discriminant into a temporary variable in case the
    // test expressions overwrite values like context.sent.
    var disc = self.emitAssign(
      self.makeTempVar(),
      self.explodeExpression(path.get("discriminant"))
    );

    after = loc();
    var defaultLoc = loc();
    var condition = defaultLoc;
    var caseLocs = [];

    // If there are no cases, .cases might be undefined.
    var cases = stmt.cases || [];

    for (var i = cases.length - 1; i >= 0; --i) {
      var c = cases[i];
      t.assertSwitchCase(c);

      if (c.test) {
        condition = t.conditionalExpression(
          t.binaryExpression("===", disc, c.test),
          caseLocs[i] = loc(),
          condition
        );
      } else {
        caseLocs[i] = defaultLoc;
      }
    }

    self.jump(self.explodeExpression(
      new types.NodePath(condition, path, "discriminant")
    ));

    self.leapManager.withEntry(
      new leap.SwitchEntry(after),
      function () {
        path.get("cases").each(function (casePath) {
          var i = casePath.name;

          self.mark(caseLocs[i]);

          casePath.get("consequent").each(
            self.explodeStatement,
            self
          );
        });
      }
    );

    self.mark(after);
    if (defaultLoc.value === -1) {
      self.mark(defaultLoc);
      assert.strictEqual(after.value, defaultLoc.value);
    }

    break;

  case "IfStatement":
    var elseLoc = stmt.alternate && loc();
    after = loc();

    self.jumpIfNot(
      self.explodeExpression(path.get("test")),
      elseLoc || after
    );

    self.explodeStatement(path.get("consequent"));

    if (elseLoc) {
      self.jump(after);
      self.mark(elseLoc);
      self.explodeStatement(path.get("alternate"));
    }

    self.mark(after);

    break;

  case "ReturnStatement":
    self.emitAbruptCompletion({
      type: "return",
      value: self.explodeExpression(path.get("argument"))
    });

    break;

  case "TryStatement":
    after = loc();

    var handler = stmt.handler;
    if (!handler && stmt.handlers) {
      handler = stmt.handlers[0] || null;
    }

    var catchLoc = handler && loc();
    var catchEntry = catchLoc && new leap.CatchEntry(
      catchLoc,
      handler.param
    );

    var finallyLoc = stmt.finalizer && loc();
    var finallyEntry = finallyLoc && new leap.FinallyEntry(finallyLoc);

    var tryEntry = new leap.TryEntry(
      self.getUnmarkedCurrentLoc(),
      catchEntry,
      finallyEntry
    );

    self.tryEntries.push(tryEntry);
    self.updateContextPrevLoc(tryEntry.firstLoc);

    self.leapManager.withEntry(tryEntry, function () {
      self.explodeStatement(path.get("block"));

      if (catchLoc) {
        if (finallyLoc) {
          // If we have both a catch block and a finally block, then
          // because we emit the catch block first, we need to jump over
          // it to the finally block.
          self.jump(finallyLoc);

        } else {
          // If there is no finally block, then we need to jump over the
          // catch block to the fall-through location.
          self.jump(after);
        }

        self.updateContextPrevLoc(self.mark(catchLoc));

        var bodyPath = path.get("handler", "body");
        var safeParam = self.makeTempVar();
        self.clearPendingException(tryEntry.firstLoc, safeParam);

        var catchScope = bodyPath.scope;
        var catchParamName = handler.param.name;
        t.assertCatchClause(catchScope.node);
        assert.strictEqual(catchScope.lookup(catchParamName), catchScope);

        types.visit(bodyPath, {
          visitIdentifier: function (path) {
            if (path.value.name === catchParamName &&
                path.scope.lookup(catchParamName) === catchScope) {
              return safeParam;
            }
            this.traverse(path);
          }
        });

        self.leapManager.withEntry(catchEntry, function () {
          self.explodeStatement(bodyPath);
        });
      }

      if (finallyLoc) {
        self.updateContextPrevLoc(self.mark(finallyLoc));

        self.leapManager.withEntry(finallyEntry, function () {
          self.explodeStatement(path.get("finalizer"));
        });

        self.emit(t.callExpression(
          self.contextProperty("finish"),
          [finallyEntry.firstLoc]
        ));
      }
    });

    self.mark(after);

    break;

  case "ThrowStatement":
    self.emit(t.throwStatement(
      self.explodeExpression(path.get("argument"))
    ));

    break;

  default:
    throw new Error("unknown Statement of type " + JSON.stringify(stmt.type));
  }
};

Emitter.prototype.emitAbruptCompletion = function (record) {
  if (!isValidCompletion(record)) {
    assert.ok(
      false,
      "invalid completion record: " + JSON.stringify(record)
    );
  }

  assert.notStrictEqual(
    record.type, "normal",
    "normal completions are not abrupt"
  );

  var abruptArgs = [t.literal(record.type)];

  if (record.type === "break" || record.type === "continue") {
    t.assertLiteral(record.target);
    abruptArgs[1] = record.target;
  } else if (record.type === "return" || record.type === "throw") {
    if (record.value) {
      t.assertExpression(record.value);
      abruptArgs[1] = record.value;
    }
  }

  this.emit(
    t.returnStatement(
      t.callExpression(
        this.contextProperty("abrupt"),
        abruptArgs
      )
    )
  );
};

function isValidCompletion(record) {
  var type = record.type;

  if (type === "normal") {
    return !_.has(record, "target");
  }

  if (type === "break" || type === "continue") {
    return !_.has(record, "value") && t.isLiteral(record.target);
  }

  if (type === "return" || type === "throw") {
    return _.has(record, "value") && !_.has(record, "target");
  }

  return false;
}

// Not all offsets into emitter.listing are potential jump targets. For
// example, execution typically falls into the beginning of a try block
// without jumping directly there. This method returns the current offset
// without marking it, so that a switch case will not necessarily be
// generated for this offset (I say "not necessarily" because the same
// location might end up being marked in the process of emitting other
// statements). There's no logical harm in marking such locations as jump
// targets, but minimizing the number of switch cases keeps the generated
// code shorter.
Emitter.prototype.getUnmarkedCurrentLoc = function () {
  return t.literal(this.listing.length);
};

// The context.prev property takes the value of context.next whenever we
// evaluate the switch statement discriminant, which is generally good
// enough for tracking the last location we jumped to, but sometimes
// context.prev needs to be more precise, such as when we fall
// successfully out of a try block and into a finally block without
// jumping. This method exists to update context.prev to the freshest
// available location. If we were implementing a full interpreter, we
// would know the location of the current instruction with complete
// precision at all times, but we don't have that luxury here, as it would
// be costly and verbose to set context.prev before every statement.
Emitter.prototype.updateContextPrevLoc = function (loc) {
  if (loc) {
    t.assertLiteral(loc);

    if (loc.value === -1) {
      // If an uninitialized location literal was passed in, set its value
      // to the current this.listing.length.
      loc.value = this.listing.length;
    } else {
      // Otherwise assert that the location matches the current offset.
      assert.strictEqual(loc.value, this.listing.length);
    }

  } else {
    loc = this.getUnmarkedCurrentLoc();
  }

  // Make sure context.prev is up to date in case we fell into this try
  // statement without jumping to it. TODO Consider avoiding this
  // assignment when we know control must have jumped here.
  this.emitAssign(this.contextProperty("prev"), loc);
};

Emitter.prototype.explodeExpression = function (path, ignoreResult) {
  assert.ok(path instanceof types.NodePath);

  var expr = path.value;
  if (expr) {
    t.assertExpression(expr);
  } else {
    return expr;
  }

  var self = this;
  var result, after; // Used optionally by several cases below.

  function finish(expr) {
    t.assertExpression(expr);
    if (ignoreResult) {
      self.emit(expr);
    } else {
      return expr;
    }
  }

  // If the expression does not contain a leap, then we either emit the
  // expression as a standalone statement or return it whole.
  if (!meta.containsLeap(expr)) {
    return finish(expr);
  }

  // If any child contains a leap (such as a yield or labeled continue or
  // break statement), then any sibling subexpressions will almost
  // certainly have to be exploded in order to maintain the order of their
  // side effects relative to the leaping child(ren).
  var hasLeapingChildren = meta.containsLeap.onlyChildren(expr);

  // In order to save the rest of explodeExpression from a combinatorial
  // trainwreck of special cases, explodeViaTempVar is responsible for
  // deciding when a subexpression needs to be "exploded," which is my
  // very technical term for emitting the subexpression as an assignment
  // to a temporary variable and the substituting the temporary variable
  // for the original subexpression. Think of exploded view diagrams, not
  // Michael Bay movies. The point of exploding subexpressions is to
  // control the precise order in which the generated code realizes the
  // side effects of those subexpressions.
  function explodeViaTempVar(tempVar, childPath, ignoreChildResult) {
    assert.ok(childPath instanceof types.NodePath);

    assert.ok(
      !ignoreChildResult || !tempVar,
      "Ignoring the result of a child expression but forcing it to " +
        "be assigned to a temporary variable?"
    );

    var result = self.explodeExpression(childPath, ignoreChildResult);

    if (ignoreChildResult) {
      // Side effects already emitted above.

    } else if (tempVar || (hasLeapingChildren &&
                           (self.isVolatileContextProperty(result) ||
                            meta.hasSideEffects(result)))) {
      // If tempVar was provided, then the result will always be assigned
      // to it, even if the result does not otherwise need to be assigned
      // to a temporary variable.  When no tempVar is provided, we have
      // the flexibility to decide whether a temporary variable is really
      // necessary.  In general, temporary assignment is required only
      // when some other child contains a leap and the child in question
      // is a context property like $ctx.sent that might get overwritten
      // or an expression with side effects that need to occur in proper
      // sequence relative to the leap.
      result = self.emitAssign(
        tempVar || self.makeTempVar(),
        result
      );
    }
    return result;
  }

  // If ignoreResult is true, then we must take full responsibility for
  // emitting the expression with all its side effects, and we should not
  // return a result.

  switch (expr.type) {
  case "ParenthesizedExpression":
    return finish(self.explodeExpression(path.get("expression")));

  case "MemberExpression":
    return finish(t.memberExpression(
      self.explodeExpression(path.get("object")),
      expr.computed ? explodeViaTempVar(null, path.get("property")) : expr.property,
      expr.computed
    ));

  case "CallExpression":
    var oldCalleePath = path.get("callee");
    var newCallee = self.explodeExpression(oldCalleePath);

    // If the callee was not previously a MemberExpression, then the
    // CallExpression was "unqualified," meaning its `this` object should
    // be the global object. If the exploded expression has become a
    // MemberExpression, then we need to force it to be unqualified by
    // using the (0, object.property)(...) trick; otherwise, it will
    // receive the object of the MemberExpression as its `this` object.
    if (!t.isMemberExpression(oldCalleePath.node) && t.isMemberExpression(newCallee)) {
      newCallee = t.sequenceExpression([
        t.literal(0),
        newCallee
      ]);
    }

    return finish(t.callExpression(
      newCallee,
      path.get("arguments").map(function (argPath) {
        return explodeViaTempVar(null, argPath);
      })
    ));

  case "NewExpression":
    return finish(t.newExpression(
      explodeViaTempVar(null, path.get("callee")),
      path.get("arguments").map(function (argPath) {
        return explodeViaTempVar(null, argPath);
      })
    ));

  case "ObjectExpression":
    return finish(t.objectExpression(
      path.get("properties").map(function (propPath) {
        return t.property(
          propPath.value.kind,
          propPath.value.key,
          explodeViaTempVar(null, propPath.get("value"))
        );
      })
    ));

  case "ArrayExpression":
    return finish(t.arrayExpression(
      path.get("elements").map(function (elemPath) {
        return explodeViaTempVar(null, elemPath);
      })
    ));

  case "SequenceExpression":
    var lastIndex = expr.expressions.length - 1;

    path.get("expressions").each(function (exprPath) {
      if (exprPath.name === lastIndex) {
        result = self.explodeExpression(exprPath, ignoreResult);
      } else {
        self.explodeExpression(exprPath, true);
      }
    });

    return result;

  case "LogicalExpression":
    after = loc();

    if (!ignoreResult) {
      result = self.makeTempVar();
    }

    var left = explodeViaTempVar(result, path.get("left"));

    if (expr.operator === "&&") {
      self.jumpIfNot(left, after);
    } else {
      assert.strictEqual(expr.operator, "||");
      self.jumpIf(left, after);
    }

    explodeViaTempVar(result, path.get("right"), ignoreResult);

    self.mark(after);

    return result;

  case "ConditionalExpression":
    var elseLoc = loc();
    after = loc();
    var test = self.explodeExpression(path.get("test"));

    self.jumpIfNot(test, elseLoc);

    if (!ignoreResult) {
      result = self.makeTempVar();
    }

    explodeViaTempVar(result, path.get("consequent"), ignoreResult);
    self.jump(after);

    self.mark(elseLoc);
    explodeViaTempVar(result, path.get("alternate"), ignoreResult);

    self.mark(after);

    return result;

  case "UnaryExpression":
    return finish(t.unaryExpression(
      expr.operator,
      // Can't (and don't need to) break up the syntax of the argument.
      // Think about delete a[b].
      self.explodeExpression(path.get("argument")),
      !!expr.prefix
    ));

  case "BinaryExpression":
    return finish(t.binaryExpression(
      expr.operator,
      explodeViaTempVar(null, path.get("left")),
      explodeViaTempVar(null, path.get("right"))
    ));

  case "AssignmentExpression":
    return finish(t.assignmentExpression(
      expr.operator,
      self.explodeExpression(path.get("left")),
      self.explodeExpression(path.get("right"))
    ));

  case "UpdateExpression":
    return finish(t.updateExpression(
      expr.operator,
      self.explodeExpression(path.get("argument")),
      expr.prefix
    ));

  case "YieldExpression":
    after = loc();
    var arg = expr.argument && self.explodeExpression(path.get("argument"));

    if (arg && expr.delegate) {
      result = self.makeTempVar();

      self.emit(t.returnStatement(t.callExpression(
        self.contextProperty("delegateYield"), [
          arg,
          t.literal(result.property.name),
          after
        ]
      )));

      self.mark(after);

      return result;
    }

    self.emitAssign(self.contextProperty("next"), after);
    self.emit(t.returnStatement(arg || null));
    self.mark(after);

    return self.contextProperty("sent");

  default:
    throw new Error("unknown Expression of type " + JSON.stringify(expr.type));
  }
};
