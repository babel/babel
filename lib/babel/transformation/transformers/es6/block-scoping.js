"use strict";

var traverse = require("../../../traversal");
var object   = require("../../../helpers/object");
var util     = require("../../../util");
var t        = require("../../../types");
var values   = require("lodash/object/values");
var extend   = require("lodash/object/extend");

exports.check = function (node) {
  return t.isVariableDeclaration(node) && (node.kind === "let" || node.kind === "const");
};

var isLet = function (node, parent) {
  if (!t.isVariableDeclaration(node)) return false;
  if (node._let) return true;
  if (node.kind !== "let") return false;

  // https://github.com/babel/babel/issues/255
  if (isLetInitable(node, parent)) {
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      declar.init = declar.init || t.identifier("undefined");
    }
  }

  node._let = true;
  node.kind = "var";
  return true;
};

var isLetInitable = function (node, parent) {
  return !t.isFor(parent) || t.isFor(parent) && parent.left !== node;
};

var isVar = function (node, parent) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !isLet(node, parent);
};

var standardizeLets = function (declars) {
  for (var i = 0; i < declars.length; i++) {
    delete declars[i]._let;
  }
};

exports.VariableDeclaration = function (node, parent, scope, file) {
  if (!isLet(node, parent)) return;

  if (isLetInitable(node) && file.transformers["es6.blockScopingTDZ"].canRun()) {
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
};

exports.Loop = function (node, parent, scope, file) {
  var init = node.left || node.init;
  if (isLet(init, node)) {
    t.ensureBlock(node);
    node.body._letDeclarators = [init];
  }
  var blockScoping = new BlockScoping(node, node.body, parent, scope, file);
  blockScoping.run();
};

exports.Program =
exports.BlockStatement = function (block, parent, scope, file) {
  if (!t.isLoop(parent)) {
    var blockScoping = new BlockScoping(false, block, parent, scope, file);
    blockScoping.run();
  }
};

/**
 * Description
 *
 * @param {Boolean|Node} loopParent
 * @param {Node} block
 * @param {Node} parent
 * @param {Scope} scope
 * @param {File} file
 */

function BlockScoping(loopParent, block, parent, scope, file) {
  this.loopParent = loopParent;
  this.parent     = parent;
  this.scope      = scope;
  this.block      = block;
  this.file       = file;

  this.outsideLetReferences = object();
  this.hasLetReferences     = false;
  this.letReferences        = block._letReferences = object();
  this.body                 = [];
}

/**
 * Start the ball rolling.
 */

BlockScoping.prototype.run = function () {
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
};

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

/**
 * Description
 */

BlockScoping.prototype.remap = function () {
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

  var loopParent = this.loopParent;
  if (loopParent) {
    traverseReplace(loopParent.right, loopParent, scope, remaps);
    traverseReplace(loopParent.test, loopParent, scope, remaps);
    traverseReplace(loopParent.update, loopParent, scope, remaps);
  }

  scope.traverse(this.block, replaceVisitor, remaps);
};

/**
 * Description
 */

BlockScoping.prototype.wrapClosure = function () {
  var block = this.block;

  var outsideRefs = this.outsideLetReferences;

  // remap loop heads with colliding variables
  if (this.loopParent) {
    for (var name in outsideRefs) {
      var id = outsideRefs[name];

      if (this.scope.hasGlobal(id.name)) {
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

  // build the closure that we're going to wrap the block with
  var fn = t.functionExpression(null, params, t.blockStatement(block.body));
  fn._aliasFunction = true;

  // replace the current block body with the one we're going to build
  block.body = this.body;

  // build a call and a unique id that we can assign the return value to
  var call = t.callExpression(fn, params);
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
    call = t.awaitExpression(call, true);
  }

  this.build(ret, call);
};

var letReferenceFunctionVisitor = {
  enter: function (node, parent, scope, state) {
    // not a direct reference
    if (!t.isReferencedIdentifier(node, parent)) return;

    // this scope has a variable with the same name so it couldn't belong
    // to our let scope
    if (scope.hasOwnBinding(node.name)) return;

    // not a part of our scope
    if (!state.letReferences[node.name]) return;

    state.closurify = true;
  }
};

var letReferenceBlockVisitor = {
  enter: function (node, parent, scope, state) {
    if (t.isFunction(node)) {
      scope.traverse(node, letReferenceFunctionVisitor, state);
      return this.skip();
    }
  }
};

/**
 * Description
 */

BlockScoping.prototype.getLetReferences = function () {
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
  this.scope.traverse(this.block, letReferenceBlockVisitor, state);

  return state.closurify;
};

var loopNodeTo = function (node) {
  if (t.isBreakStatement(node)) {
    return "break";
  } else if (t.isContinueStatement(node)) {
    return "continue";
  }
};

var loopVisitor = {
  enter: function (node, parent, scope, state) {
    var replace;

    if (t.isLoop(node)) {
      state.ignoreLabeless = true;
      scope.traverse(node, loopVisitor, state);
      state.ignoreLabeless = false;
    }

    if (t.isFunction(node) || t.isLoop(node)) {
      return this.skip();
    }

    var loopText = loopNodeTo(node);

    if (loopText) {
      if (node.label) {
        // we shouldn't be transforming this because it exists somewhere inside
        if (state.innerLabels.indexOf(node.label.name) >= 0) {
          return;
        }

        loopText = loopText + "|" + node.label.name;
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

    if (t.isReturnStatement(node)) {
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

var loopLabelVisitor = {
  enter: function (node, parent, scope, state) {
    if (t.isLabeledStatement(node)) {
      state.innerLabels.push(node.label.name);
    }
  }
};

/**
 * If we're inside of a loop then traverse it and check if it has one of
 * the following node types `ReturnStatement`, `BreakStatement`,
 * `ContinueStatement` and replace it with a return value that we can track
 * later on.
 *
 * @returns {Object}
 */

BlockScoping.prototype.checkLoop = function () {
  var state = {
    hasBreakContinue: false,
    ignoreLabeless:   false,
    innerLabels:      [],
    hasReturn:        false,
    isLoop:           !!this.loopParent,
    map:              {}
  };

  this.scope.traverse(this.block, loopLabelVisitor, state);
  this.scope.traverse(this.block, loopVisitor, state);

  return state;
};

var hoistVarDeclarationsVisitor = {
  enter: function (node, parent, scope, self) {
    if (t.isForStatement(node)) {
      if (isVar(node.init, node)) {
        node.init = t.sequenceExpression(self.pushDeclar(node.init));
      }
    } else if (t.isFor(node)) {
      if (isVar(node.left, node)) {
        node.left = node.left.declarations[0].id;
      }
    } else if (isVar(node, parent)) {
      return self.pushDeclar(node).map(t.expressionStatement);
    } else if (t.isFunction(node)) {
      return this.skip();
    }
  }
};

/**
 * Hoist all var declarations in this block to before it so they retain scope
 * once we wrap everything in a closure.
 */

BlockScoping.prototype.hoistVarDeclarations = function () {
  traverse(this.block, hoistVarDeclarationsVisitor, this.scope, this);
};

/**
 * Turn a `VariableDeclaration` into an array of `AssignmentExpressions` with
 * their declarations hoisted to before the closure wrapper.
 *
 * @param {Node} node VariableDeclaration
 * @returns {Array}
 */

BlockScoping.prototype.pushDeclar = function (node) {
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
};

/**
 * Push the closure to the body.
 *
 * @param {Node} ret Identifier
 * @param {Node} call CallExpression
 */

BlockScoping.prototype.build = function (ret, call) {
  var has = this.has;
  if (has.hasReturn || has.hasBreakContinue) {
    this.buildHas(ret, call);
  } else {
    this.body.push(t.expressionStatement(call));
  }
};

/**
 * Description
 *
 * @param {Node} ret Identifier
 * @param {Node} call CallExpression
 */

BlockScoping.prototype.buildHas = function (ret, call) {
  var body = this.body;

  body.push(t.variableDeclaration("var", [
    t.variableDeclarator(ret, call)
  ]));

  var loopParent = this.loopParent;
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
    if (!loopParent) {
      throw new Error("Has no loop parent but we're trying to reassign breaks " +
                      "and continues, something is going wrong here.");
    }

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
      body.push(this.file.attachAuxiliaryComment(t.switchStatement(ret, cases)));
    }
  } else {
    if (has.hasReturn) {
      body.push(this.file.attachAuxiliaryComment(retCheck));
    }
  }
};
