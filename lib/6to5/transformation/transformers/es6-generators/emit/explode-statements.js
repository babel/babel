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
var types  = require("ast-types");
var leap   = require("../leap");
var util   = require("../util");
var t      = require("../../../../types");

var runtimeKeysMethod = util.runtimeProperty("keys");
var loc               = util.loc;

exports.ExpressionStatement = function (path) {
  this.explodeExpression(path.get("expression"), true);
};

exports.LabeledStatement = function (path, stmt) {
  this.explodeStatement(path.get("body"), stmt.label);
};

exports.WhileStatement = function (path, stmt, labelId) {
  var before = loc();
  var after = loc();

  this.mark(before);
  this.jumpIfNot(this.explodeExpression(path.get("test")), after);
  this.leapManager.withEntry(
    new leap.LoopEntry(after, before, labelId),
    function () { this.explodeStatement(path.get("body")); }
  );
  this.jump(before);
  this.mark(after);
};

exports.DoWhileStatement = function (path, stmt, labelId) {
  var first = loc();
  var test = loc();
  var after = loc();

  this.mark(first);
  this.leapManager.withEntry(
    new leap.LoopEntry(after, test, labelId),
    function () { this.explode(path.get("body")); }
  );
  this.mark(test);
  this.jumpIf(this.explodeExpression(path.get("test")), first);
  this.mark(after);
};

exports.ForStatement = function (path, stmt, labelId) {
  var head = loc();
  var update = loc();
  var after = loc();

  if (stmt.init) {
    // We pass true here to indicate that if stmt.init is an expression
    // then we do not care about its result.
    this.explode(path.get("init"), true);
  }

  this.mark(head);

  if (stmt.test) {
    this.jumpIfNot(this.explodeExpression(path.get("test")), after);
  } else {
    // No test means continue unconditionally.
  }

  this.leapManager.withEntry(
    new leap.LoopEntry(after, update, labelId),
    function () { this.explodeStatement(path.get("body")); }
  );

  this.mark(update);

  if (stmt.update) {
    // We pass true here to indicate that if stmt.update is an
    // expression then we do not care about its result.
    this.explode(path.get("update"), true);
  }

  this.jump(head);

  this.mark(after);
};

exports.ForInStatement = function (path, stmt, labelId) {
  t.assertIdentifier(stmt.left);

  var head = loc();
  var after = loc();

  var keyIterNextFn = this.makeTempVar();
  this.emitAssign(
    keyIterNextFn,
    t.callExpression(
      runtimeKeysMethod,
      [this.explodeExpression(path.get("right"))]
    )
  );

  this.mark(head);

  var keyInfoTmpVar = this.makeTempVar();
  this.jumpIf(
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

  this.emitAssign(
    stmt.left,
    t.memberExpression(
      keyInfoTmpVar,
      t.identifier("value"),
      false
    )
  );

  this.leapManager.withEntry(
    new leap.LoopEntry(after, head, labelId),
    function () { this.explodeStatement(path.get("body")); }
  );

  this.jump(head);

  this.mark(after);
};

exports.BreakStatement = function (path, stmt) {
  this.emitAbruptCompletion({
    type: "break",
    target: this.leapManager.getBreakLoc(stmt.label)
  });
};

exports.ContinueStatement = function (path, stmt) {
  this.emitAbruptCompletion({
    type: "continue",
    target: this.leapManager.getContinueLoc(stmt.label)
  });
};

exports.SwitchStatement = function (path, stmt) {
  // Always save the discriminant into a temporary variable in case the
  // test expressions overwrite values like context.sent.
  var disc = this.emitAssign(
    this.makeTempVar(),
    this.explodeExpression(path.get("discriminant"))
  );

  var after = loc();
  var defaultLoc = loc();
  var condition = defaultLoc;
  var caseLocs = [];
  var self = this;

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

  this.jump(this.explodeExpression(
    new types.NodePath(condition, path, "discriminant")
  ));

  this.leapManager.withEntry(
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

  this.mark(after);
  if (defaultLoc.value === -1) {
    this.mark(defaultLoc);
    assert.strictEqual(after.value, defaultLoc.value);
  }
};

exports.IfStatement = function (path, stmt) {
  var elseLoc = stmt.alternate && loc();
  var after = loc();

  this.jumpIfNot(
    this.explodeExpression(path.get("test")),
    elseLoc || after
  );

  this.explodeStatement(path.get("consequent"));

  if (elseLoc) {
    this.jump(after);
    this.mark(elseLoc);
    this.explodeStatement(path.get("alternate"));
  }

  this.mark(after);
};

exports.ReturnStatement = function (path) {
  this.emitAbruptCompletion({
    type: "return",
    value: this.explodeExpression(path.get("argument"))
  });
};

exports.TryStatement = function (path, stmt) {
  var after = loc();
  var self = this;

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
    this.getUnmarkedCurrentLoc(),
    catchEntry,
    finallyEntry
  );

  this.tryEntries.push(tryEntry);
  this.updateContextPrevLoc(tryEntry.firstLoc);

  this.leapManager.withEntry(tryEntry, function () {
    this.explodeStatement(path.get("block"));

    if (catchLoc) {
      if (finallyLoc) {
        // If we have both a catch block and a finally block, then
        // because we emit the catch block first, we need to jump over
        // it to the finally block.
        this.jump(finallyLoc);

      } else {
        // If there is no finally block, then we need to jump over the
        // catch block to the fall-through location.
        this.jump(after);
      }

      this.updateContextPrevLoc(self.mark(catchLoc));

      var bodyPath = path.get("handler", "body");
      var safeParam = this.makeTempVar();
      this.clearPendingException(tryEntry.firstLoc, safeParam);

      var catchScope = bodyPath.scope;
      var catchParamName = handler.param.name;
      t.assertCatchClause(catchScope.node);
      assert.strictEqual(catchScope.lookup(catchParamName), catchScope);

      types.visit(bodyPath, {
        visitIdentifier: function (path) {
          if (t.isReferenced(path.value, path.parentPath.node) &&
              path.value.name === catchParamName &&
              path.scope.lookup(catchParamName) === catchScope) {
            return safeParam;
          }
          this.traverse(path);
        }
      });

      this.leapManager.withEntry(catchEntry, function () {
        this.explodeStatement(bodyPath);
      });
    }

    if (finallyLoc) {
      this.updateContextPrevLoc(this.mark(finallyLoc));

      this.leapManager.withEntry(finallyEntry, function () {
        this.explodeStatement(path.get("finalizer"));
      });

      this.emit(t.callExpression(
        this.contextProperty("finish"),
        [finallyEntry.firstLoc]
      ));
    }
  });

  this.mark(after);
};

exports.ThrowStatement = function (path) {
  this.emit(t.throwStatement(
    this.explodeExpression(path.get("argument"))
  ));
};
