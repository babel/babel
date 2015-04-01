import traverse from "../../../traversal";
import object from "../../../helpers/object";
import * as util from  "../../../util";
import * as t from "../../../types";
import values from "lodash/object/values";
import extend from "lodash/object/extend";

function isLet(node, parent) {
  if (!t.isVariableDeclaration(node)) return false;
  if (node._let) return true;
  if (node.kind !== "let") return false;

  // https://github.com/babel/babel/issues/255
  if (isLetInitable(node, parent)) {
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      declar.init ||= t.identifier("undefined");
    }
  }

  node._let = true;
  node.kind = "var";
  return true;
}

function isLetInitable(node, parent) {
  return !t.isFor(parent) || !t.isFor(parent, { left: node });
}

function isVar(node, parent) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !isLet(node, parent);
}

function standardizeLets(declars) {
  for (var i = 0; i < declars.length; i++) {
    delete declars[i]._let;
  }
}

export function check(node) {
  return t.isVariableDeclaration(node) && (node.kind === "let" || node.kind === "const");
}

export function VariableDeclaration(node, parent, scope, file) {
  if (!isLet(node, parent)) return;

  if (isLetInitable(node) && file.transformers["es6.spec.blockScoping"].canTransform()) {
    var nodes = [node];

    for (var i = 0; i < node.declarations.length; i++) {
      var decl = node.declarations[i];
      if (decl.init) {
        var assign = t.assignmentExpression("=", decl.id, decl.init);
        assign._ignoreBlockScopingTDZ = true;
        nodes.push(t.expressionStatement(assign));
      }
      decl.init = file.addHelper("temporal-undefined");
    }

    node._blockHoist = 2;

    return nodes;
  }
}

export function Loop(node, parent, scope, file) {
  var init = node.left || node.init;
  if (isLet(init, node)) {
    t.ensureBlock(node);
    node.body._letDeclarators = [init];
  }

  var blockScoping = new BlockScoping(this, this.get("body"), parent, scope, file);
  return blockScoping.run();
}

export function BlockStatement(block, parent, scope, file) {
  if (!t.isLoop(parent)) {
    var blockScoping = new BlockScoping(null, this, parent, scope, file);
    blockScoping.run();
  }
}

export { BlockStatement as Program };

function replace(node, parent, scope, remaps) {
  if (!t.isReferencedIdentifier(node, parent)) return;

  var remap = remaps[node.name];
  if (!remap) return;

  var ownBinding = scope.getBindingIdentifier(node.name);
  if (ownBinding === remap.binding) {
    node.name = remap.uid;
  } else {
    // scope already has it's own binding that doesn't
    // match the one we have a stored replacement for
    if (this) this.skip();
  }
}

var replaceVisitor = {
  enter: replace
};

function traverseReplace(node, parent, scope, remaps) {
  replace(node, parent, scope, remaps);
  scope.traverse(node, replaceVisitor, remaps);
}

var letReferenceBlockVisitor = {
  enter(node, parent, scope, state) {
    if (this.isFunction()) {
      this.traverse(letReferenceFunctionVisitor, state);
      return this.skip();
    }
  }
};

var letReferenceFunctionVisitor = {
  enter(node, parent, scope, state) {
    // not a direct reference
    if (!this.isReferencedIdentifier()) return;

    var ref = state.letReferences[node.name];

    // not a part of our scope
    if (!ref) return;

    // this scope has a variable with the same name so it couldn't belong
    // to our let scope
    if (scope.getBindingIdentifier(node.name) !== ref) return;

    state.closurify = true;
  }
};

var hoistVarDeclarationsVisitor = {
  enter(node, parent, scope, self) {
    if (this.isForStatement()) {
      if (isVar(node.init, node)) {
        node.init = t.sequenceExpression(self.pushDeclar(node.init));
      }
    } else if (this.isFor()) {
      if (isVar(node.left, node)) {
        node.left = node.left.declarations[0].id;
      }
    } else if (isVar(node, parent)) {
      return self.pushDeclar(node).map(t.expressionStatement);
    } else if (this.isFunction()) {
      return this.skip();
    }
  }
};

var loopLabelVisitor = {
  enter(node, parent, scope, state) {
    if (this.isLabeledStatement()) {
      state.innerLabels.push(node.label.name);
    }
  }
};

var continuationVisitor = {
  enter(node, parent, scope, state) {
    if (this.isAssignmentExpression() || this.isUpdateExpression()) {
      var bindings = this.getBindingIdentifiers();
      for (var name in bindings) {
        if (state.outsideReferences[name] !== scope.getBindingIdentifier(name)) continue;
        state.reassignments[name] = true;
      }
    }
  }
};

var loopNodeTo = function (node) {
  if (t.isBreakStatement(node)) {
    return "break";
  } else if (t.isContinueStatement(node)) {
    return "continue";
  }
};

var loopVisitor = {
  enter(node, parent, scope, state) {
    var replace;

    if (this.isLoop()) {
      state.ignoreLabeless = true;
      this.traverse(loopVisitor, state);
      state.ignoreLabeless = false;
    }

    if (this.isFunction() || this.isLoop()) {
      return this.skip();
    }

    var loopText = loopNodeTo(node);

    if (loopText) {
      if (node.label) {
        // we shouldn't be transforming this because it exists somewhere inside
        if (state.innerLabels.indexOf(node.label.name) >= 0) {
          return;
        }

        loopText = `${loopText}|${node.label.name}`;
      } else {
        // we shouldn't be transforming these statements because
        // they don't refer to the actual loop we're scopifying
        if (state.ignoreLabeless) return;

        // break statements mean something different in this context
        if (t.isBreakStatement(node) && t.isSwitchCase(parent)) return;
      }

      state.hasBreakContinue = true;
      state.map[loopText] = node;
      replace = t.literal(loopText);
    }

    if (this.isReturnStatement()) {
      state.hasReturn = true;
      replace = t.objectExpression([
        t.property("init", t.identifier("v"), node.argument || t.identifier("undefined"))
      ]);
    }

    if (replace) {
      replace = t.returnStatement(replace);
      return t.inherits(replace, node);
    }
  }
};

class BlockScoping {

  /**
   * Description
   */

  constructor(loopPath?: TraversalPath, blockPath: TraversalPath, parent: Object, scope: Scope, file: File) {
    this.parent = parent;
    this.scope  = scope;
    this.file   = file;

    this.blockPath = blockPath;
    this.block     = blockPath.node;

    this.outsideLetReferences = object();
    this.hasLetReferences     = false;
    this.letReferences        = this.block._letReferences = object();
    this.body                 = [];

    if (loopPath) {
      this.loopParent = loopPath.parent;
      this.loopLabel  = t.isLabeledStatement(this.loopParent) && this.loopParent.label;
      this.loopPath   = loopPath;
      this.loop       = loopPath.node;
    }
  }

  /**
   * Start the ball rolling.
   */

  run() {
    var block = this.block;
    if (block._letDone) return;
    block._letDone = true;

    var needsClosure = this.getLetReferences();

    // this is a block within a `Function/Program` so we can safely leave it be
    if (t.isFunction(this.parent) || t.isProgram(this.block)) return;

    // we can skip everything
    if (!this.hasLetReferences) return;

    if (needsClosure) {
      this.wrapClosure();
    } else {
      this.remap();
    }

    if (this.loopLabel && !t.isLabeledStatement(this.loopParent)) {
      return t.labeledStatement(this.loopLabel, this.loop);
    }
  }

  /**
   * Description
   */

  remap() {
    var hasRemaps = false;
    var letRefs   = this.letReferences;
    var scope     = this.scope;

    // alright, so since we aren't wrapping this block in a closure
    // we have to check if any of our let variables collide with
    // those in upper scopes and then if they do, generate a uid
    // for them and replace all references with it
    var remaps = object();

    for (var key in letRefs) {
      // just an Identifier node we collected in `getLetReferences`
      // this is the defining identifier of a declaration
      var ref = letRefs[key];

      if (scope.parentHasBinding(key) || scope.hasGlobal(key)) {
        var uid = scope.generateUidIdentifier(ref.name).name;
        ref.name = uid;

        hasRemaps = true;
        remaps[key] = remaps[uid] = {
          binding: ref,
          uid: uid
        };
      }
    }

    if (!hasRemaps) return;

    //

    var loop = this.loop;
    if (loop) {
      traverseReplace(loop.right, loop, scope, remaps);
      traverseReplace(loop.test, loop, scope, remaps);
      traverseReplace(loop.update, loop, scope, remaps);
    }

    this.blockPath.traverse(replaceVisitor, remaps);
  }

  /**
   * Description
   */

  wrapClosure() {
    var block = this.block;

    var outsideRefs = this.outsideLetReferences;

    // remap loop heads with colliding variables
    if (this.loop) {
      for (var name in outsideRefs) {
        var id = outsideRefs[name];

        if (this.scope.hasGlobal(id.name) || this.scope.parentHasBinding(id.name)) {
          delete outsideRefs[id.name];
          delete this.letReferences[id.name];

          this.scope.rename(id.name);

          this.letReferences[id.name] = id;
          outsideRefs[id.name] = id;
        }
      }
    }

    // if we're inside of a for loop then we search to see if there are any
    // `break`s, `continue`s, `return`s etc
    this.has = this.checkLoop();

    // hoist var references to retain scope
    this.hoistVarDeclarations();

    // turn outsideLetReferences into an array
    var params = values(outsideRefs);
    var args   = values(outsideRefs);

    // build the closure that we're going to wrap the block with
    var fn = t.functionExpression(null, params, t.blockStatement(block.body));
    fn.shadow = true;

    // continuation
    this.addContinuations(fn);

    // replace the current block body with the one we're going to build
    block.body = this.body;

    var ref = fn;

    if (this.loop) {
      ref = this.scope.generateUidIdentifier("loop");
      this.loopPath.insertBefore(t.variableDeclaration("var", [
        t.variableDeclarator(ref, fn)
      ]));
    }

    // build a call and a unique id that we can assign the return value to
    var call = t.callExpression(ref, args);
    var ret  = this.scope.generateUidIdentifier("ret");

    // handle generators
    var hasYield = traverse.hasType(fn.body, this.scope, "YieldExpression", t.FUNCTION_TYPES);
    if (hasYield) {
      fn.generator = true;
      call = t.yieldExpression(call, true);
    }

    // handlers async functions
    var hasAsync = traverse.hasType(fn.body, this.scope, "AwaitExpression", t.FUNCTION_TYPES);
    if (hasAsync) {
      fn.async = true;
      call = t.awaitExpression(call);
    }

    this.buildClosure(ret, call);
  }

  /**
   * Push the closure to the body.
   */

  buildClosure(ret: { type: "Identifier" }, call: { type: "CallExpression" }) {
    var has = this.has;
    if (has.hasReturn || has.hasBreakContinue) {
      this.buildHas(ret, call);
    } else {
      this.body.push(t.expressionStatement(call));
    }
  }

  /**
   * If any of the outer let variables are reassigned then we need to rename them in
   * the closure so we can get direct access to the outer variable to continue the
   * iteration with bindings based on each iteration.
   *
   * Reference: https://github.com/babel/babel/issues/1078
   */

  addContinuations(fn) {
    var state = {
      reassignments: {},
      outsideReferences: this.outsideLetReferences
    };

    this.scope.traverse(fn, continuationVisitor, state);

    for (var i = 0; i < fn.params.length; i++) {
      var param = fn.params[i];
      if (!state.reassignments[param.name]) continue;

      var newParam = this.scope.generateUidIdentifier(param.name);
      fn.params[i] = newParam;

      this.scope.rename(param.name, newParam.name, fn);

      // assign outer reference as it's been modified internally and needs to be retained
      fn.body.body.push(t.expressionStatement(t.assignmentExpression("=", param, newParam)));
    }
  }

  /**
   * Description
   */

  getLetReferences() {
    var block = this.block;

    var declarators = block._letDeclarators || [];
    var declar;

    //
    for (var i = 0; i < declarators.length; i++) {
      declar = declarators[i];
      extend(this.outsideLetReferences, t.getBindingIdentifiers(declar));
    }

    //
    if (block.body) {
      for (i = 0; i < block.body.length; i++) {
        declar = block.body[i];
        if (isLet(declar, block)) {
          declarators = declarators.concat(declar.declarations);
        }
      }
    }

    //
    for (i = 0; i < declarators.length; i++) {
      declar = declarators[i];
      var keys = t.getBindingIdentifiers(declar);
      extend(this.letReferences, keys);
      this.hasLetReferences = true;
    }

    // no let references so we can just quit
    if (!this.hasLetReferences) return;

    // set let references to plain var references
    standardizeLets(declarators);

    var state = {
      letReferences: this.letReferences,
      closurify:     false
    };

    // traverse through this block, stopping on functions and checking if they
    // contain any local let references
    this.blockPath.traverse(letReferenceBlockVisitor, state);

    return state.closurify;
  }

  /**
   * If we're inside of a loop then traverse it and check if it has one of
   * the following node types `ReturnStatement`, `BreakStatement`,
   * `ContinueStatement` and replace it with a return value that we can track
   * later on.
   *
   * @returns {Object}
   */

  checkLoop() {
    var state = {
      hasBreakContinue: false,
      ignoreLabeless:   false,
      innerLabels:      [],
      hasReturn:        false,
      isLoop:           !!this.loop,
      map:              {}
    };

    this.blockPath.traverse(loopLabelVisitor, state);
    this.blockPath.traverse(loopVisitor, state);

    return state;
  }

  /**
   * Hoist all var declarations in this block to before it so they retain scope
   * once we wrap everything in a closure.
   */

  hoistVarDeclarations() {
    this.blockPath.traverse(hoistVarDeclarationsVisitor, this);
  }

  /**
   * Turn a `VariableDeclaration` into an array of `AssignmentExpressions` with
   * their declarations hoisted to before the closure wrapper.
   */

  pushDeclar(node: { type: "VariableDeclaration" }): Array<Object> {
    this.body.push(t.variableDeclaration(node.kind, node.declarations.map(function (declar) {
      return t.variableDeclarator(declar.id);
    })));

    var replace = [];

    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      if (!declar.init) continue;

      var expr = t.assignmentExpression("=", declar.id, declar.init);
      replace.push(t.inherits(expr, declar));
    }

    return replace;
  }

  /**
   * Description
   */

  buildHas(ret: { type: "Identifier" }, call: { type: "CallExpression" }) {
    var body = this.body;

    body.push(t.variableDeclaration("var", [
      t.variableDeclarator(ret, call)
    ]));

    var loop = this.loop;
    var retCheck;
    var has = this.has;
    var cases = [];

    if (has.hasReturn) {
      // typeof ret === "object"
      retCheck = util.template("let-scoping-return", {
        RETURN: ret
      });
    }

    if (has.hasBreakContinue) {
      for (var key in has.map) {
        cases.push(t.switchCase(t.literal(key), [has.map[key]]));
      }

      if (has.hasReturn) {
        cases.push(t.switchCase(null, [retCheck]));
      }

      if (cases.length === 1) {
        var single = cases[0];
        body.push(this.file.attachAuxiliaryComment(t.ifStatement(
          t.binaryExpression("===", ret, single.test),
          single.consequent[0]
        )));
      } else {
        // https://github.com/babel/babel/issues/998
        for (var i = 0; i < cases.length; i++) {
          var caseConsequent = cases[i].consequent[0];
          if (t.isBreakStatement(caseConsequent) && !caseConsequent.label) {
            caseConsequent.label = this.loopLabel ||= this.file.scope.generateUidIdentifier("loop");
          }
        }

        body.push(this.file.attachAuxiliaryComment(t.switchStatement(ret, cases)));
      }
    } else {
      if (has.hasReturn) {
        body.push(this.file.attachAuxiliaryComment(retCheck));
      }
    }
  }
}
