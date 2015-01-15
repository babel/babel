var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");
var _        = require("lodash");

var isLet = function (node, parent) {
  if (!t.isVariableDeclaration(node)) return false;
  if (node._let) return true;
  if (node.kind !== "let") return false;

  // https://github.com/6to5/6to5/issues/255
  if (!t.isFor(parent) || t.isFor(parent) && parent.left !== node) {
    _.each(node.declarations, function (declar) {
      declar.init = declar.init || t.identifier("undefined");
    });
  }

  node._let = true;
  node.kind = "var";
  return true;
};

var isVar = function (node, parent) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !isLet(node, parent);
};

var standardiseLets = function (declars) {
  for (var i = 0; i < declars.length; i++) {
    delete declars[i]._let;
  }
};

exports.VariableDeclaration = function (node, parent) {
  isLet(node, parent);
};

exports.Loop = function (node, parent, file, scope) {
  var init = node.left || node.init;
  if (isLet(init, node)) {
    t.ensureBlock(node);
    node.body._letDeclars = [init];
  }

  if (t.isLabeledStatement(parent)) {
    // set label so `run` has access to it
    node.label = parent.label;
  }

  var letScoping = new LetScoping(node, node.body, parent, file, scope);
  letScoping.run();

  if (node.label && !t.isLabeledStatement(parent)) {
    // we've been given a label so let's wrap ourselves
    return t.labeledStatement(node.label, node);
  }
};

exports.BlockStatement = function (block, parent, file, scope) {
  if (!t.isLoop(parent) && block._letDeclars) {
    var letScoping = new LetScoping(false, block, parent, file, scope);
    letScoping.run();
  }
};

/**
 * Description
 *
 * @param {Boolean|Node} loopParent
 * @param {Node} block
 * @param {Node} parent
 * @param {File} file
 * @param {Scope} scope
 */

function LetScoping(loopParent, block, parent, file, scope) {
  this.loopParent = loopParent;
  this.parent     = parent;
  this.scope      = scope;
  this.block      = block;
  this.file       = file;

  this.letReferences = {};
  this.body          = [];
}

/**
 * Start the ball rolling.
 */

LetScoping.prototype.run = function () {
  var block = this.block;

  if (block._letDone) return;
  block._letDone = true;

  this.info = this.getInfo();

  // remap all let references that exist in upper scopes to their uid
  this.remap();

  // this is a block within a `Function` so we can safely leave it be
  if (t.isFunction(this.parent)) return this.noClosure();

  // this block has no let references so let's clean up
  if (!this.info.keys.length) return this.noClosure();

  // returns whether or not there are any outside let references within any
  // functions
  var referencesInClosure = this.getLetReferences();

  // no need for a closure so let's clean up
  if (!referencesInClosure) return this.noClosure();

  // if we're inside of a for loop then we search to see if there are any
  // `break`s, `continue`s, `return`s etc
  this.has = this.checkLoop();

  // hoist var references to retain scope
  this.hoistVarDeclarations();

  // set let references to plain var references
  standardiseLets(this.info.declarators);

  // turn letReferences into an array
  var letReferences = _.values(this.letReferences);

  // build the closure that we're going to wrap the block with
  var fn = t.functionExpression(null, letReferences, t.blockStatement(block.body));
  fn._aliasFunction = true;

  // replace the current block body with the one we're going to build
  block.body = this.body;

  // change upper scope references with their uid if they have one
  var params = this.getParams(letReferences);

  // build a call and a unique id that we can assign the return value to
  var call = t.callExpression(fn, params);
  var ret  = this.file.generateUidIdentifier("ret", this.scope);

  var hasYield = traverse.hasType(fn.body, "YieldExpression", t.FUNCTION_TYPES);
  if (hasYield) {
    fn.generator = true;
    call = t.yieldExpression(call, true);
  }

  this.build(ret, call);
};

/**
 * There are no let references accessed within a closure so we can just turn the
 * lets into vars.
 */

LetScoping.prototype.noClosure = function () {
  standardiseLets(this.info.declarators);
};

/**
 * Traverse through block and replace all references that exist in a higher
 * scope to their uids.
 */

LetScoping.prototype.remap = function () {
  var replacements = this.info.duplicates;
  var block        = this.block;

  if (!this.info.hasDuplicates) return;

  var replace = function (node, parent, scope) {
    if (!t.isIdentifier(node)) return;
    if (!t.isReferenced(node, parent)) return;
    if (scope && scope.hasOwn(node.name)) return;
    node.name = replacements[node.name] || node.name;
  };

  var traverseReplace = function (node, parent) {
    replace(node, parent);
    traverse(node, { enter: replace });
  };

  var loopParent = this.loopParent;
  if (loopParent) {
    traverseReplace(loopParent.right, loopParent);
    traverseReplace(loopParent.test, loopParent);
    traverseReplace(loopParent.update, loopParent);
  }

  traverse(block, { enter: replace });
};

/**
 * Description
 *
 * @returns {Object}
 */

LetScoping.prototype.getInfo = function () {
  var block = this.block;
  var scope = this.scope;
  var file  = this.file;

  var opts = {
    // array of `Identifier` names of let variables that appear lexically out of
    // this scope but should be accessible - eg. `ForOfStatement`.left
    outsideKeys: [],

    // array of let `VariableDeclarator`s that are a part of this block
    declarators: block._letDeclars || [],

    // object of duplicate ids and their aliases - if there's an `Identifier`
    // name that's used in an upper scope we generate a unique id and replace
    // all references with it
    duplicates:  {},

    hasDuplicates: false,

    // array of `Identifier` names of let variables that are accessible within
    // the current block
    keys:        []
  };

  var duplicates = function (id, key) {
    var has = scope.parentGet(key);

    if (has && has !== id) {
      // there's a variable with this exact name in an upper scope so we need
      // to generate a new name
      opts.duplicates[key] = id.name = file.generateUid(key, scope);
      opts.hasDuplicates = true;
    }
  };

  var declar;

  for (var i in opts.declarators) {
    declar = opts.declarators[i];
    opts.declarators.push(declar);

    var keys = t.getIds(declar, true);
    _.each(keys, duplicates);
    keys = Object.keys(keys);

    opts.outsideKeys = opts.outsideKeys.concat(keys);
    opts.keys = opts.keys.concat(keys);
  }

  if (block.body) {
    for (i = 0; i < block.body.length; i++) {
      declar = block.body[i];
      if (!isLet(declar, block)) continue;

      var declars = t.getIds(declar, true);
      for (var key in declars) {
        duplicates(declars[key], key);
        opts.keys.push(key);
      }
    }
  }

  return opts;
};

/**
 * If we're inside of a loop then traverse it and check if it has one of
 * the following node types `ReturnStatement`, `BreakStatement`,
 * `ContinueStatement` and replace it with a return value that we can track
 * later on.
 *
 * @returns {Object}
 */

LetScoping.prototype.checkLoop = function () {
  var has = {
    hasContinue: false,
    hasReturn:   false,
    hasBreak:    false,
  };

  traverse(this.block, {
    enter: function (node, parent) {
      var replace;

      if (t.isFunction(node) || t.isLoop(node)) {
        return this.skip();
      }

      if (node && !node.label) {
        if (t.isBreakStatement(node)) {
          if (t.isSwitchCase(parent)) return;

          has.hasBreak = true;
          replace = t.returnStatement(t.literal("break"));
        } else if (t.isContinueStatement(node)) {
          has.hasContinue = true;
          replace = t.returnStatement(t.literal("continue"));
        }
      }

      if (t.isReturnStatement(node)) {
        has.hasReturn = true;
        replace = t.returnStatement(t.objectExpression([
          t.property("init", t.identifier("v"), node.argument || t.identifier("undefined"))
        ]));
      }

      if (replace) return t.inherits(replace, node);
    }
  });

  return has;
};

/**
 * Hoist all var declarations in this block to before it so they retain scope
 * once we wrap everything in a closure.
 */

LetScoping.prototype.hoistVarDeclarations = function () {
  var self = this;
  traverse(this.block, {
    enter: function (node, parent) {
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
  });
};

/**
 * Build up a parameter list that we'll call our closure wrapper with, replacing
 * all duplicate ids with their uid.
 *
 * @param {Array} params
 * @returns {Array}
 */

LetScoping.prototype.getParams = function (params) {
  var info = this.info;
  params = _.cloneDeep(params);
  _.each(params, function (param) {
    param.name = info.duplicates[param.name] || param.name;
  });
  return params;
};

/**
 * Get all let references within this block. Stopping whenever we reach another
 * block.
 */

LetScoping.prototype.getLetReferences = function () {
  var closurify = false;
  var self = this;

  // traverse through this block, stopping on functions and checking if they
  // contain any outside let references
  traverse(this.block, {
    enter: function (node, parent, scope) {
      if (t.isFunction(node)) {
        traverse(node, {
          enter: function (node, parent) {
            // not an identifier so we have no use
            if (!t.isIdentifier(node)) return;

            // not a direct reference
            if (!t.isReferenced(node, parent)) return;

            // this scope has a variable with the same name so it couldn't belong
            // to our let scope
            if (scope.hasOwn(node.name, true)) return;

            closurify = true;

            // this key doesn't appear just outside our scope
            if (!_.contains(self.info.outsideKeys, node.name)) return;

            // push this badboy
            self.letReferences[node.name] = node;
          }
        });

        return this.skip();
      }
    }
  });

  return closurify;
};

/**
 * Turn a `VariableDeclaration` into an array of `AssignmentExpressions` with
 * their declarations hoisted to before the closure wrapper.
 *
 * @param {Node} node VariableDeclaration
 * @returns {Array}
 */

LetScoping.prototype.pushDeclar = function (node) {
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

LetScoping.prototype.build = function (ret, call) {
  var has = this.has;
  if (has.hasReturn || has.hasBreak || has.hasContinue) {
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

LetScoping.prototype.buildHas = function (ret, call) {
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

  if (has.hasBreak || has.hasContinue) {
    // ensure that the parent has a label as we're building a switch and we
    // need to be able to access it
    var label = loopParent.label = loopParent.label || this.file.generateUidIdentifier("loop", this.scope);

    if (has.hasBreak) {
      cases.push(t.switchCase(t.literal("break"), [t.breakStatement(label)]));
    }

    if (has.hasContinue) {
      cases.push(t.switchCase(t.literal("continue"), [t.continueStatement(label)]));
    }

    if (has.hasReturn) {
      cases.push(t.switchCase(null, [retCheck]));
    }

    if (cases.length === 1) {
      var single = cases[0];
      body.push(t.ifStatement(
        t.binaryExpression("===", ret, single.test),
        single.consequent[0]
      ));
    } else {
      body.push(t.switchStatement(ret, cases));
    }
  } else {
    if (has.hasReturn) body.push(retCheck);
  }
};
