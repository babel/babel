/* eslint-disable no-case-declarations */
import assert from "node:assert";
import * as leap from "./leap.ts";
import * as meta from "./meta.ts";
import * as util from "./util.ts";

import type { NodePath, PluginPass, Visitor, Scope } from "@babel/core";
import { types as t } from "@babel/core";

// From packages/babel-helpers/src/helpers/regenerator.ts
const enum OperatorType {
  Return = 2,
  Jump,
}

type AbruptCompletion =
  | {
      type: OperatorType.Jump;
      target: t.NumericLiteral;
    }
  | {
      type: OperatorType.Return;
      value: t.Expression | null;
    };

// Offsets into this.listing that could be used as targets for branches or
// jumps are represented as numeric Literal nodes. This representation has
// the amazingly convenient benefit of allowing the exact value of the
// location to be determined at any time, even after generating code that
// refers to the location.
// We use 'Number.MAX_VALUE' to mark uninitialized location. We can safely do
// so because no code can realistically have about 1.8e+308 locations before
// hitting memory limit of the machine it's running on. For comparison, the
// estimated number of atoms in the observable universe is around 1e+80.
const PENDING_LOCATION = Number.MAX_VALUE;

function getDeclError(node: t.Node) {
  return new Error(
    "all declarations should have been transformed into " +
      "assignments before the Exploder began its work: " +
      JSON.stringify(node),
  );
}

const catchParamVisitor: Visitor<{
  getSafeParam: () => t.Identifier;
  catchParamName: string;
}> = {
  Identifier: function (path, state) {
    if (path.node.name === state.catchParamName && util.isReference(path)) {
      path.replaceWith(state.getSafeParam());
    }
  },

  Scope: function (path, state) {
    if (path.scope.hasOwnBinding(state.catchParamName)) {
      // Don't descend into nested scopes that shadow the catch
      // parameter with their own declarations.
      path.skip();
    }
  },
};

export class Emitter {
  nextTempId: number;
  contextId: t.Identifier;
  index: number;
  indexMap: Map<number, number>;
  listing: t.Statement[];
  returns: Set<number>;
  lastReferenceIndex: number = 0;
  marked: boolean[];
  insertedLocs: Set<t.NumericLiteral>;
  finalLoc: t.NumericLiteral;
  tryEntries: leap.TryEntry[];
  leapManager: leap.LeapManager;
  scope: Scope;
  vars: t.VariableDeclarator[];

  pluginPass: PluginPass;

  constructor(
    contextId: t.Identifier,
    scope: Scope,
    vars: t.VariableDeclarator[],
    pluginPass: PluginPass,
  ) {
    this.pluginPass = pluginPass;
    this.scope = scope;
    this.vars = vars;

    // Used to generate unique temporary names.
    this.nextTempId = 0;

    // In order to make sure the context object does not collide with
    // anything in the local scope, we might have to rename it, so we
    // refer to it symbolically instead of just assuming that it will be
    // called "context".
    this.contextId = contextId;

    // An append-only list of Statements that grows each time this.emit is
    // called.
    this.listing = [];

    this.index = 0;
    this.indexMap = new Map([[0, 0]]);
    this.returns = new Set();
    this.lastReferenceIndex = 0;

    // A sparse array whose keys correspond to locations in this.listing
    // that have been marked as branch/jump targets.
    this.marked = [true];

    this.insertedLocs = new Set();

    // The last location will be marked when this.getDispatchLoop is
    // called.
    this.finalLoc = this.loc();

    // A list of all leap.TryEntry statements emitted.
    this.tryEntries = [];

    // Each time we evaluate the body of a loop, we tell this.leapManager
    // to enter a nested loop context that determines the meaning of break
    // and continue statements therein.
    this.leapManager = new leap.LeapManager(this);
  }

  loc() {
    const l = t.numericLiteral(PENDING_LOCATION);
    this.insertedLocs.add(l);
    return l;
  }

  getInsertedLocs() {
    return this.insertedLocs;
  }

  getContextId() {
    return t.cloneNode(this.contextId);
  }

  getIndex() {
    if (!this.indexMap.has(this.listing.length)) {
      this.indexMap.set(this.listing.length, ++this.index);
    }
    return this.index;
  }

  // Sets the exact value of the given location to the offset of the next
  // Statement emitted.
  mark(loc: t.NumericLiteral) {
    if (loc.value === PENDING_LOCATION) {
      loc.value = this.getIndex();
    } else {
      // Locations can be marked redundantly, but their values cannot change
      // once set the first time.
      assert.strictEqual(loc.value, this.index);
    }
    this.marked[this.listing.length] = true;
    if (loc.value > this.lastReferenceIndex) {
      this.lastReferenceIndex = loc.value;
    }
    return loc;
  }

  emit(node: t.Node) {
    if (t.isExpression(node)) {
      node = t.expressionStatement(node);
    }
    t.assertStatement(node);
    this.listing.push(node);
  }

  // Shorthand for emitting assignment statements. This will come in handy
  // for assignments to temporary variables.
  emitAssign<T extends t.AssignmentExpression["left"]>(
    lhs: T,
    rhs: t.Expression,
  ) {
    this.emit(this.assign(lhs, rhs));
    return lhs;
  }

  // Shorthand for an assignment statement.
  assign(lhs: t.AssignmentExpression["left"], rhs: t.Expression) {
    return t.expressionStatement(
      t.assignmentExpression("=", t.cloneNode(lhs), rhs),
    );
  }

  // Convenience function for generating expressions like context.next,
  // context.sent, and context.rval.
  contextProperty(name: string) {
    const computed = name === "catch";
    return t.memberExpression(
      this.getContextId(),
      computed ? t.stringLiteral(name) : t.identifier(name),
      !!computed,
    );
  }

  clearPendingException(
    tryLoc: t.NumericLiteral,
    assignee: t.AssignmentExpression["left"],
  ) {
    const catchCall = t.callExpression(this.contextProperty("catch"), [
      t.cloneNode(tryLoc),
    ]);

    if (assignee) {
      this.emitAssign(assignee, catchCall);
    } else {
      this.emit(catchCall);
    }
  }

  // Emits code for an unconditional jump to the given location, even if the
  // exact value of the location is not yet known.
  jump(toLoc: t.Expression) {
    this.emitAssign(this.contextProperty("n"), toLoc);
    this.emit(t.breakStatement());
  }

  // Conditional jump.
  jumpIf(test: t.Expression, toLoc: t.NumericLiteral) {
    this.emit(
      t.ifStatement(
        test,
        t.blockStatement([
          this.assign(this.contextProperty("n"), toLoc),
          t.breakStatement(),
        ]),
      ),
    );
  }

  // Conditional jump, with the condition negated.
  jumpIfNot(test: t.Expression, toLoc: t.NumericLiteral) {
    let negatedTest;
    if (t.isUnaryExpression(test) && test.operator === "!") {
      // Avoid double negation.
      negatedTest = test.argument;
    } else {
      negatedTest = t.unaryExpression("!", test);
    }

    this.emit(
      t.ifStatement(
        negatedTest,
        t.blockStatement([
          this.assign(this.contextProperty("n"), toLoc),
          t.breakStatement(),
        ]),
      ),
    );
  }

  // Returns a unique MemberExpression that can be used to store and
  // retrieve temporary values. Since the object of the member expression is
  // the context object, which is presumed to coexist peacefully with all
  // other local variables, and since we just increment `nextTempId`
  // monotonically, uniqueness is assured.
  makeContextTempVar() {
    return this.contextProperty("t" + this.nextTempId++);
  }

  makeTempVar() {
    const id = this.scope.generateUidIdentifier("t");
    this.vars.push(t.variableDeclarator(id));
    return t.cloneNode(id);
  }

  getContextFunction() {
    return t.functionExpression(
      null /*Anonymous*/,
      [this.getContextId()],
      t.blockStatement([this.getDispatchLoop()]),
      false, // Not a generator anymore!
      false, // Nor an expression.
    );
  }

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
  getDispatchLoop() {
    const self = this;
    const cases: t.SwitchCase[] = [];
    let current;

    // If we encounter a break, continue, or return statement in a switch
    // case, we can skip the rest of the statements until the next case.
    let alreadyEnded = false;

    self.listing.forEach(function (stmt, i) {
      if (self.marked[i]) {
        cases.push(
          t.switchCase(t.numericLiteral(self.indexMap.get(i)), (current = [])),
        );
        alreadyEnded = false;
      }

      if (!alreadyEnded) {
        current.push(stmt);
        if (t.isCompletionStatement(stmt)) alreadyEnded = true;
      }
    });

    // Now that we know how many statements there will be in this.listing,
    // we can finally resolve this.finalLoc.value.
    this.finalLoc.value = this.getIndex();

    if (
      this.lastReferenceIndex === this.index ||
      !this.returns.has(this.listing.length)
    ) {
      cases.push(
        t.switchCase(this.finalLoc, [
          t.returnStatement(
            t.callExpression(this.contextProperty("a"), [
              t.numericLiteral(OperatorType.Return),
            ]),
          ),
        ]),
      );
    }

    return t.whileStatement(
      t.numericLiteral(1),
      t.switchStatement(
        this.tryEntries.length === 0
          ? this.contextProperty("n")
          : t.assignmentExpression(
              "=",
              this.contextProperty("p"),
              this.contextProperty("n"),
            ),

        cases,
      ),
    );
  }

  getTryLocsList() {
    if (this.tryEntries.length === 0) {
      // To avoid adding a needless [] to the majority of runtime.wrap
      // argument lists, force the caller to handle this case specially.
      return null;
    }

    let lastLocValue = 0;

    const arrayExpression = t.arrayExpression(
      this.tryEntries.map(function (tryEntry) {
        const thisLocValue = tryEntry.firstLoc.value;
        assert.ok(thisLocValue >= lastLocValue, "try entries out of order");
        lastLocValue = thisLocValue;

        const ce = tryEntry.catchEntry;
        const fe = tryEntry.finallyEntry;

        const locs = [
          tryEntry.firstLoc,
          // The null here makes a hole in the array.
          ce ? ce.firstLoc : null,
        ];

        if (fe) {
          locs[2] = fe.firstLoc;
          locs[3] = fe.afterLoc;
        }

        return t.arrayExpression(locs.map(loc => loc && t.cloneNode(loc)));
      }),
    );

    arrayExpression.elements.reverse();

    return arrayExpression;
  }

  // All side effects must be realized in order.

  // If any subexpression harbors a leap, all subexpressions must be
  // neutered of side effects.

  // No destructive modification of AST nodes.
  explode(path: NodePath, ignoreResult?: boolean) {
    const node = path.node;
    const self = this;

    if (t.isDeclaration(node)) throw getDeclError(node);

    if (path.isStatement()) return self.explodeStatement(path);

    if (path.isExpression()) return self.explodeExpression(path, ignoreResult);

    switch (node.type) {
      case "VariableDeclarator":
        throw getDeclError(node);

      // These node types should be handled by their parent nodes
      // (ObjectExpression, SwitchStatement, and TryStatement, respectively).
      case "ObjectProperty":
      case "SwitchCase":
      case "CatchClause":
        throw new Error(
          node.type + " nodes should be handled by their parents",
        );

      default:
        throw new Error("unknown Node of type " + JSON.stringify(node.type));
    }
  }

  explodeStatement(path: NodePath<t.Statement>, labelId: t.Identifier = null) {
    const stmt = path.node;
    const self = this;
    let before: t.NumericLiteral,
      after: t.NumericLiteral,
      head: t.NumericLiteral;

    // Explode BlockStatement nodes even if they do not contain a yield,
    // because we don't want or need the curly braces.
    if (path.isBlockStatement()) {
      path.get("body").forEach(function (path) {
        self.explodeStatement(path);
      });
      return;
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

    switch (path.type) {
      case "ExpressionStatement":
        self.explodeExpression(path.get("expression"), true);
        break;

      case "LabeledStatement":
        after = this.loc();

        // Did you know you can break from any labeled block statement or
        // control structure? Well, you can! Note: when a labeled loop is
        // encountered, the leap.LabeledEntry created here will immediately
        // enclose a leap.LoopEntry on the leap manager's stack, and both
        // entries will have the same label. Though this works just fine, it
        // may seem a bit redundant. In theory, we could check here to
        // determine if stmt knows how to handle its own label; for example,
        // stmt happens to be a WhileStatement and so we know it's going to
        // establish its own LoopEntry when we explode it (below). Then this
        // LabeledEntry would be unnecessary. Alternatively, we might be
        // tempted not to pass stmt.label down into self.explodeStatement,
        // because we've handled the label here, but that's a mistake because
        // labeled loops may contain labeled continue statements, which is not
        // something we can handle in this generic case. All in all, I think a
        // little redundancy greatly simplifies the logic of this case, since
        // it's clear that we handle all possible LabeledStatements correctly
        // here, regardless of whether they interact with the leap manager
        // themselves. Also remember that labels and break/continue-to-label
        // statements are rare, and all of this logic happens at transform
        // time, so it has no additional runtime cost.
        self.leapManager.withEntry(
          new leap.LabeledEntry(after, path.node.label),
          function () {
            self.explodeStatement(path.get("body"), path.node.label);
          },
        );

        self.mark(after);

        break;

      case "WhileStatement":
        before = this.loc();
        after = this.loc();

        self.mark(before);
        self.jumpIfNot(self.explodeExpression(path.get("test")), after);
        self.leapManager.withEntry(
          new leap.LoopEntry(after, before, labelId),
          function () {
            self.explodeStatement(path.get("body"));
          },
        );
        self.jump(before);
        self.mark(after);

        break;

      case "DoWhileStatement":
        const first = this.loc();
        const test = this.loc();
        after = this.loc();

        self.mark(first);
        self.leapManager.withEntry(
          new leap.LoopEntry(after, test, labelId),
          function () {
            self.explode(path.get("body"));
          },
        );
        self.mark(test);
        self.jumpIf(self.explodeExpression(path.get("test")), first);
        self.mark(after);

        break;

      case "ForStatement":
        head = this.loc();
        const update = this.loc();
        after = this.loc();

        if (path.node.init) {
          // We pass true here to indicate that if stmt.init is an expression
          // then we do not care about its result.
          self.explode(path.get("init"), true);
        }

        self.mark(head);

        if (path.node.test) {
          self.jumpIfNot(self.explodeExpression(path.get("test")), after);
        } else {
          // No test means continue unconditionally.
        }

        self.leapManager.withEntry(
          new leap.LoopEntry(after, update, labelId),
          function () {
            self.explodeStatement(path.get("body"));
          },
        );

        self.mark(update);

        if (path.node.update) {
          // We pass true here to indicate that if stmt.update is an
          // expression then we do not care about its result.
          self.explode(path.get("update"), true);
        }

        self.jump(head);

        self.mark(after);

        break;

      // @ts-expect-error flow type
      case "TypeCastExpression":
        return self.explodeExpression((path as any).get("expression"));

      case "ForInStatement":
        head = this.loc();
        after = this.loc();

        const keyIterNextFn = self.makeTempVar();

        const helper = this.pluginPass.addHelper("regeneratorKeys");
        self.emitAssign(
          keyIterNextFn,
          t.callExpression(helper, [self.explodeExpression(path.get("right"))]),
        );

        self.mark(head);

        const keyInfoTmpVar = self.makeTempVar();
        self.jumpIf(
          t.memberExpression(
            t.assignmentExpression(
              "=",
              keyInfoTmpVar,
              t.callExpression(t.cloneNode(keyIterNextFn), []),
            ),
            t.identifier("done"),
            false,
          ),
          after,
        );

        self.emitAssign(
          path.node.left as t.AssignmentExpression["left"],
          t.memberExpression(
            t.cloneNode(keyInfoTmpVar),
            t.identifier("value"),
            false,
          ),
        );

        self.leapManager.withEntry(
          new leap.LoopEntry(after, head, labelId),
          function () {
            self.explodeStatement(path.get("body"));
          },
        );

        self.jump(head);

        self.mark(after);

        break;

      case "BreakStatement":
        self.emitAbruptCompletion({
          type: OperatorType.Jump,
          target: self.leapManager.getBreakLoc(path.node.label),
        });

        break;

      case "ContinueStatement":
        self.emitAbruptCompletion({
          type: OperatorType.Jump,
          target: self.leapManager.getContinueLoc(path.node.label),
        });

        break;

      case "SwitchStatement":
        // Always save the discriminant into a temporary variable in case the
        // test expressions overwrite values like context.sent.
        const disc = self.emitAssign(
          self.makeTempVar(),
          self.explodeExpression(path.get("discriminant")),
        );

        after = this.loc();
        const defaultLoc = this.loc();
        let condition: t.Expression = defaultLoc;
        const caseLocs: t.NumericLiteral[] = [];

        // If there are no cases, .cases might be undefined.
        const cases = path.node.cases || [];

        for (let i = cases.length - 1; i >= 0; --i) {
          const c = cases[i];

          if (c.test) {
            condition = t.conditionalExpression(
              t.binaryExpression("===", t.cloneNode(disc), c.test),
              (caseLocs[i] = this.loc()),
              condition,
            );
          } else {
            caseLocs[i] = defaultLoc;
          }
        }

        const discriminant = path.get("discriminant");
        discriminant.replaceWith(condition);
        self.jump(self.explodeExpression(discriminant));

        self.leapManager.withEntry(new leap.SwitchEntry(after), function () {
          path.get("cases").forEach(function (casePath) {
            const i = casePath.key as number;
            self.mark(caseLocs[i]);

            casePath.get("consequent").forEach(function (path) {
              self.explodeStatement(path);
            });
          });
        });

        self.mark(after);
        if (defaultLoc.value === PENDING_LOCATION) {
          self.mark(defaultLoc);
          assert.strictEqual(after.value, defaultLoc.value);
        }

        break;

      case "IfStatement":
        const elseLoc = path.node.alternate && this.loc();
        after = this.loc();

        self.jumpIfNot(
          self.explodeExpression(path.get("test")),
          elseLoc || after,
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
          type: OperatorType.Return,
          value: self.explodeExpression(path.get("argument")),
        });

        break;

      case "WithStatement":
        throw new Error("WithStatement not supported in generator functions.");

      case "TryStatement":
        after = this.loc();

        const handler = path.node.handler;

        const catchLoc = handler && this.loc();
        const catchEntry =
          catchLoc && new leap.CatchEntry(catchLoc, handler.param as any);

        const finallyLoc = path.node.finalizer && this.loc();
        const finallyEntry =
          finallyLoc && new leap.FinallyEntry(finallyLoc, after);

        const tryEntry = new leap.TryEntry(
          self.getUnmarkedCurrentLoc(),
          catchEntry,
          finallyEntry,
        );

        self.tryEntries.push(tryEntry);
        self.updateContextPrevLoc(tryEntry.firstLoc);

        self.leapManager.withEntry(tryEntry, () => {
          self.explodeStatement(path.get("block"));

          if (catchLoc) {
            const body = path.node.block.body;
            if (finallyLoc) {
              // If we have both a catch block and a finally block, then
              // because we emit the catch block first, we need to jump over
              // it to the finally block.
              self.jump(finallyLoc);
            } else if (
              body.length &&
              body[body.length - 1].type === "ReturnStatement"
            ) {
              after = null;
            } else {
              // If there is no finally block, then we need to jump over the
              // catch block to the fall-through location.
              self.jump(after);
            }

            self.updateContextPrevLoc(self.mark(catchLoc));

            const bodyPath = path.get("handler.body");
            const safeParam = self.makeTempVar();

            this.emitAssign(safeParam, self.contextProperty("v"));

            bodyPath.traverse(catchParamVisitor, {
              getSafeParam: () => t.cloneNode(safeParam),
              catchParamName:
                // @ts-expect-error Assuming `handler.param` is `t.Identifier`
                handler.param.name,
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

            self.emit(
              t.returnStatement(
                t.callExpression(self.contextProperty("f"), [
                  finallyEntry.firstLoc,
                ]),
              ),
            );
          }
        });

        if (after) self.mark(after);

        break;

      case "ThrowStatement":
        self.emit(
          t.throwStatement(self.explodeExpression(path.get("argument"))),
        );

        break;

      case "ClassDeclaration":
        self.emit(self.explodeClass(path));
        break;

      default:
        throw new Error(
          "unknown Statement of type " + JSON.stringify(stmt.type),
        );
    }
  }

  emitAbruptCompletion(record: AbruptCompletion) {
    const abruptArgs: [t.NumericLiteral | t.StringLiteral, t.Expression?] = [
      t.numericLiteral(record.type),
    ];

    if (record.type === OperatorType.Jump) {
      abruptArgs[1] = this.insertedLocs.has(record.target)
        ? record.target
        : t.cloneNode(record.target);
    } else if (record.type === OperatorType.Return) {
      if (record.value) {
        abruptArgs[1] = t.cloneNode(record.value);
      }
    }

    this.emit(
      t.returnStatement(
        t.callExpression(this.contextProperty("a"), abruptArgs),
      ),
    );

    if (record.type === OperatorType.Return) {
      this.returns.add(this.listing.length);
    }
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
  getUnmarkedCurrentLoc() {
    return t.numericLiteral(this.getIndex());
  }

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
  updateContextPrevLoc(loc: t.NumericLiteral) {
    if (loc) {
      if (loc.value === PENDING_LOCATION) {
        // If an uninitialized location literal was passed in, set its value
        // to the current this.listing.length.
        loc.value = this.getIndex();
      } else {
        // Otherwise assert that the location matches the current offset.
        assert.strictEqual(loc.value, this.index);
      }
    } else {
      loc = this.getUnmarkedCurrentLoc();
    }

    // Make sure context.prev is up to date in case we fell into this try
    // statement without jumping to it. TODO Consider avoiding this
    // assignment when we know control must have jumped here.
    this.emitAssign(this.contextProperty("p"), loc);
  }

  // In order to save the rest of explodeExpression from a combinatorial
  // trainwreck of special cases, explodeViaTempVar is responsible for
  // deciding when a subexpression needs to be "exploded," which is my
  // very technical term for emitting the subexpression as an assignment
  // to a temporary variable and the substituting the temporary variable
  // for the original subexpression. Think of exploded view diagrams, not
  // Michael Bay movies. The point of exploding subexpressions is to
  // control the precise order in which the generated code realizes the
  // side effects of those subexpressions.
  explodeViaTempVar(
    tempVar: t.MemberExpression | t.Identifier,
    childPath: NodePath<t.Expression>,
    hasLeapingChildren: boolean,
    ignoreChildResult?: boolean,
  ) {
    assert.ok(
      !ignoreChildResult || !tempVar,
      "Ignoring the result of a child expression but forcing it to " +
        "be assigned to a temporary variable?",
    );

    let result = this.explodeExpression(childPath, ignoreChildResult);

    if (ignoreChildResult) {
      // Side effects already emitted above.
    } else if (tempVar || (hasLeapingChildren && !t.isLiteral(result))) {
      // If tempVar was provided, then the result will always be assigned
      // to it, even if the result does not otherwise need to be assigned
      // to a temporary variable.  When no tempVar is provided, we have
      // the flexibility to decide whether a temporary variable is really
      // necessary.  Unfortunately, in general, a temporary variable is
      // required whenever any child contains a yield expression, since it
      // is difficult to prove (at all, let alone efficiently) whether
      // this result would evaluate to the same value before and after the
      // yield (see #206).  One narrow case where we can prove it doesn't
      // matter (and thus we do not need a temporary variable) is when the
      // result in question is a Literal value.
      result = this.emitAssign(tempVar || this.makeTempVar(), result);
    }
    return result;
  }

  explodeExpression(
    path: NodePath<t.Expression>,
    ignoreResult?: boolean,
  ): t.Expression {
    const expr = path.node;
    if (!expr) {
      return expr;
    }

    const self = this;
    let result; // Used optionally by several cases below.
    let after;

    function finish(expr: t.Expression) {
      if (ignoreResult) {
        self.emit(expr);
      }
      return expr;
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
    const hasLeapingChildren = meta.containsLeap.onlyChildren(expr);

    // If ignoreResult is true, then we must take full responsibility for
    // emitting the expression with all its side effects, and we should not
    // return a result.

    switch (path.type) {
      case "MemberExpression":
        return finish(
          t.memberExpression(
            self.explodeExpression(
              path.get("object") as NodePath<t.Expression>,
            ),
            path.node.computed
              ? self.explodeViaTempVar(
                  null,
                  path.get("property") as NodePath<t.Expression>,
                  hasLeapingChildren,
                )
              : path.node.property,
            path.node.computed,
          ),
        );

      case "CallExpression":
        const calleePath = path.get("callee");
        const argsPath = path.get("arguments");

        let newCallee;
        let newArgs;

        let lastLeapingArgIndex = argsPath.length - 1;
        while (
          lastLeapingArgIndex >= 0 &&
          !meta.containsLeap(argsPath[lastLeapingArgIndex].node)
        ) {
          lastLeapingArgIndex--;
        }

        let injectFirstArg = null;

        if (t.isMemberExpression(calleePath.node)) {
          if (lastLeapingArgIndex !== -1) {
            // If the arguments of the CallExpression contained any yield
            // expressions, then we need to be sure to evaluate the callee
            // before evaluating the arguments, but if the callee was a member
            // expression, then we must be careful that the object of the
            // member expression still gets bound to `this` for the call.

            const newObject = self.explodeViaTempVar(
              // Assign the exploded callee.object expression to a temporary
              // variable so that we can use it twice without reevaluating it.
              self.makeTempVar(),
              calleePath.get("object") as NodePath<t.Expression>,
              hasLeapingChildren,
            );

            const newProperty = calleePath.node.computed
              ? self.explodeViaTempVar(
                  null,
                  calleePath.get("property") as NodePath<t.Expression>,
                  hasLeapingChildren,
                )
              : calleePath.node.property;

            injectFirstArg = newObject;

            newCallee = t.memberExpression(
              t.memberExpression(
                t.cloneNode(newObject),
                newProperty,
                calleePath.node.computed,
              ),
              t.identifier("call"),
              false,
            );
          } else {
            newCallee = self.explodeExpression(
              calleePath as NodePath<t.Expression>,
            );
          }
        } else {
          newCallee = self.explodeViaTempVar(
            null,
            calleePath as NodePath<t.Expression>,
            hasLeapingChildren,
          );

          if (t.isMemberExpression(newCallee)) {
            // If the callee was not previously a MemberExpression, then the
            // CallExpression was "unqualified," meaning its `this` object
            // should be the global object. If the exploded expression has
            // become a MemberExpression (e.g. a context property, probably a
            // temporary variable), then we need to force it to be unqualified
            // by using the (0, object.property)(...) trick; otherwise, it
            // will receive the object of the MemberExpression as its `this`
            // object.
            newCallee = t.sequenceExpression([
              t.numericLiteral(0),
              t.cloneNode(newCallee),
            ]);
          }
        }

        if (lastLeapingArgIndex !== -1) {
          newArgs = argsPath.map((argPath, index) =>
            index >= lastLeapingArgIndex
              ? self.explodeExpression(argPath as NodePath<t.Expression>) // Don't explode leaping children.
              : self.explodeViaTempVar(
                  null,
                  argPath as NodePath<t.Expression>,
                  hasLeapingChildren,
                ),
          );
          if (injectFirstArg) newArgs.unshift(injectFirstArg);

          newArgs = newArgs.map(arg => t.cloneNode(arg));
        } else {
          newArgs = path.node.arguments;
        }

        return finish(t.callExpression(newCallee, newArgs));

      case "NewExpression":
        return finish(
          t.newExpression(
            self.explodeViaTempVar(
              null,
              path.get("callee") as NodePath<t.Expression>,
              hasLeapingChildren,
            ),
            path.get("arguments").map(function (argPath: any) {
              return self.explodeViaTempVar(null, argPath, hasLeapingChildren);
            }),
          ),
        );

      case "ObjectExpression":
        return finish(
          t.objectExpression(
            path.get("properties").map(function (propPath) {
              if (propPath.isObjectProperty()) {
                return t.objectProperty(
                  propPath.node.key,
                  self.explodeViaTempVar(
                    null,
                    // @ts-expect-error `ArrayPattern` cannot cast to `ArrayExpression`
                    propPath.get("value"),
                    hasLeapingChildren,
                  ),
                  propPath.node.computed,
                );
              } else {
                return propPath.node;
              }
            }),
          ),
        );

      case "ArrayExpression":
        return finish(
          t.arrayExpression(
            path.get("elements").map(function (elemPath: any) {
              if (!elemPath.node) {
                return null;
              }
              if (elemPath.isSpreadElement()) {
                return t.spreadElement(
                  self.explodeViaTempVar(
                    null,
                    elemPath.get("argument"),
                    hasLeapingChildren,
                  ),
                );
              } else {
                return self.explodeViaTempVar(
                  null,
                  elemPath,
                  hasLeapingChildren,
                );
              }
            }),
          ),
        );

      case "SequenceExpression":
        const lastIndex = path.node.expressions.length - 1;

        path.get("expressions").forEach(function (exprPath: any) {
          if (exprPath.key === lastIndex) {
            result = self.explodeExpression(exprPath, ignoreResult);
          } else {
            self.explodeExpression(exprPath, true);
          }
        });

        return result;

      case "LogicalExpression":
        after = this.loc();

        if (!ignoreResult) {
          result = self.makeTempVar();
        }

        const left = self.explodeViaTempVar(
          result,
          path.get("left"),
          hasLeapingChildren,
        );

        if (path.node.operator === "&&") {
          self.jumpIfNot(left, after);
        } else {
          assert.strictEqual(path.node.operator, "||");
          self.jumpIf(left, after);
        }

        self.explodeViaTempVar(
          result,
          path.get("right"),
          hasLeapingChildren,
          ignoreResult,
        );

        self.mark(after);

        return result;

      case "ConditionalExpression":
        const elseLoc = this.loc();
        after = this.loc();
        const test = self.explodeExpression(path.get("test"));

        self.jumpIfNot(test, elseLoc);

        if (!ignoreResult) {
          result = self.makeTempVar();
        }

        self.explodeViaTempVar(
          result,
          path.get("consequent"),
          hasLeapingChildren,
          ignoreResult,
        );
        self.jump(after);

        self.mark(elseLoc);
        self.explodeViaTempVar(
          result,
          path.get("alternate"),
          hasLeapingChildren,
          ignoreResult,
        );

        self.mark(after);

        return result;

      case "UnaryExpression":
        return finish(
          t.unaryExpression(
            path.node.operator,
            // Can't (and don't need to) break up the syntax of the argument.
            // Think about delete a[b].
            self.explodeExpression(path.get("argument")),
            !!path.node.prefix,
          ),
        );

      case "BinaryExpression":
        return finish(
          t.binaryExpression(
            path.node.operator,
            self.explodeViaTempVar(
              null,
              path.get("left") as NodePath<t.Expression>,
              hasLeapingChildren,
            ),
            self.explodeViaTempVar(null, path.get("right"), hasLeapingChildren),
          ),
        );

      case "AssignmentExpression":
        if (path.node.operator === "=") {
          // If this is a simple assignment, the left hand side does not need
          // to be read before the right hand side is evaluated, so we can
          // avoid the more complicated logic below.
          return finish(
            t.assignmentExpression(
              path.node.operator,
              // @ts-expect-error `ArrayPattern` cannot cast to `ArrayExpression`
              self.explodeExpression(path.get("left")),
              self.explodeExpression(path.get("right")),
            ),
          );
        }

        // @ts-expect-error `ArrayPattern` cannot cast to `ArrayExpression`
        const lhs = self.explodeExpression(path.get("left"));
        const temp = self.emitAssign(self.makeTempVar(), lhs);

        // For example,
        //
        //   x += yield y
        //
        // becomes
        //
        //   context.t0 = x
        //   x = context.t0 += yield y
        //
        // so that the left-hand side expression is read before the yield.
        // Fixes https://github.com/facebook/regenerator/issues/345.

        return finish(
          t.assignmentExpression(
            "=",
            // @ts-expect-error `ArrayPattern` cannot cast to `ArrayExpression`
            t.cloneNode(lhs),
            t.assignmentExpression(
              path.node.operator,
              t.cloneNode(temp),
              self.explodeExpression(path.get("right")),
            ),
          ),
        );

      case "UpdateExpression":
        return finish(
          t.updateExpression(
            path.node.operator,
            self.explodeExpression(path.get("argument")) as
              | t.Identifier
              | t.MemberExpression,
            path.node.prefix,
          ),
        );

      case "YieldExpression":
        after = this.loc();
        const arg =
          path.node.argument && self.explodeExpression(path.get("argument"));

        if (arg && path.node.delegate) {
          const ret = t.returnStatement(
            t.callExpression(self.contextProperty("d"), [
              t.callExpression(this.pluginPass.addHelper("regeneratorValues"), [
                arg,
              ]),
              after,
            ]),
          );
          ret.loc = expr.loc;

          self.emit(ret);
          self.mark(after);

          return self.contextProperty("v");
        }

        self.emitAssign(self.contextProperty("n"), after);

        const ret = t.returnStatement(t.cloneNode(arg) || null);
        // Preserve the `yield` location so that source mappings for the statements
        // link back to the yield properly.
        ret.loc = expr.loc;
        self.emit(ret);
        self.mark(after);

        return self.contextProperty("v");

      case "ClassExpression":
        return finish(self.explodeClass(path));

      default:
        throw new Error(
          "unknown Expression of type " + JSON.stringify(expr.type),
        );
    }
  }

  explodeClass<T extends t.Class>(path: NodePath<T>): T {
    const explodingChildren = [];

    if (path.node.superClass) {
      explodingChildren.push(path.get("superClass"));
    }

    path.get("body.body").forEach((member: any) => {
      if (member.node.computed) {
        explodingChildren.push(member.get("key"));
      }
    });

    const hasLeapingChildren = explodingChildren.some(child =>
      meta.containsLeap(child.node),
    );

    for (let i = 0; i < explodingChildren.length; i++) {
      const child = explodingChildren[i];
      const isLast = i === explodingChildren.length - 1;

      if (isLast) {
        child.replaceWith(this.explodeExpression(child));
      } else {
        child.replaceWith(
          this.explodeViaTempVar(null, child, hasLeapingChildren),
        );
      }
    }

    return path.node as T;
  }
}
