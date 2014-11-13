var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");
var _        = require("lodash");

var isLet = function (node) {
  if (!t.isVariableDeclaration(node)) return false;
  if (node._let) return true;
  if (node.kind !== "let") return false;

  node._let = true;
  node.kind = "var";
  return true;
};

var isVar = function (node) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !isLet(node);
};

var standardiseLets = function (declars) {
  _.each(declars, function (declar) {
    delete declar._let;
  });
};

exports.VariableDeclaration = function (node) {
  isLet(node);
};

exports.For = function (node, parent, file, scope) {
  var init = node.left || node.init;
  if (isLet(init)) {
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
  if (!t.isFor(parent)) {
    var letScoping = new LetScoping(false, block, parent, file, scope);
    letScoping.run();
  }
};

/**
 * Description
 *
 * @param {Boolean|Node} forParent
 * @param {Node} block
 * @param {Node} parent
 * @param {File} file
 * @param {Scope} scope
 */

function LetScoping(forParent, block, parent, file, scope) {
  this.forParent = forParent;
  this.parent    = parent;
  this.scope     = scope;
  this.block     = block;
  this.file      = file;

  this.letReferences = {};
  this.body          = [];
  this.info          = this.getInfo();
}

/**
 * Start the ball rolling.
 */

LetScoping.prototype.run = function () {
  var block = this.block;

  if (block._letDone) return;
  block._letDone = true;

  // this is a block within a `Function` so we can safely leave it be
  if (t.isFunction(this.parent)) return;

  // this block has no let references so let's clean up
  if (!this.info.keys.length) return this.noClosure();

  // returns whether or not there are any outside let references within any
  // functions
  var referencesInClosure = this.getLetReferences();

  // no need for a closure so let's clean up
  if (!referencesInClosure) return this.noClosure();

  // if we're inside of a for loop then we search to see if there are any
  // `break`s, `continue`s, `return`s etc
  this.has = this.checkFor();

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
  var ret  = t.identifier(this.file.generateUid("ret", this.scope));

  this.build(ret, call);
};

/**
 * There are no let references accessed within a closure so we can just traverse
 * through this block and replace all references that exist in a higher scope to
 * their uids.
 */

LetScoping.prototype.noClosure = function () {
  var replacements = this.info.duplicates;
  var declarators  = this.info.declarators;
  var block        = this.block;

  standardiseLets(declarators);

  if (_.isEmpty(replacements)) return;

  traverse(block, function (node, parent) {
    if (!t.isIdentifier(node)) return;
    if (!t.isReferenced(node, parent)) return;
    node.name = replacements[node.name] || node.name;
  });
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

    // array of `Identifier` names of let variables that are accessible within
    // the current block
    keys:        []
  };

  _.each(opts.declarators, function (declar) {
    opts.declarators.push(declar);

    var keys = t.getIds(declar);
    opts.outsideKeys = opts.outsideKeys.concat(keys);
    opts.keys = opts.keys.concat(keys);
  });

  _.each(block.body, function (declar) {
    if (!isLet(declar)) return;

    _.each(t.getIds(declar, true), function (id, key) {
      var has = scope.parentGet(key);

      if (has && has !== id) {
        // there's a variable with this exact name in an upper scope so we need
        // to generate a new name
        opts.duplicates[key] = id.name = file.generateUid(key, scope);
      }

      opts.keys.push(key);
    });
  });

  return opts;
};

/**
 * If we're inside of a `For*Statement` then traverse it and check if it has one
 * of the following node types `ReturnStatement`, `BreakStatement`,
 * `ContinueStatement` and replace it with a return value that we can track
 * later on.
 *
 * @returns {Object}
 */

LetScoping.prototype.checkFor = function () {
  var has = {
    hasContinue: false,
    hasReturn:   false,
    hasBreak:    false,
  };

  if (this.forParent) {
    traverse(this.block, function (node) {
      var replace;

      if (t.isFunction(node) || t.isFor(node)) {
        return false;
      } else if (t.isBreakStatement(node) && !node.label) {
        has.hasBreak = true;
        replace = t.returnStatement(t.literal("break"));
      } else if (t.isContinueStatement(node) && !node.label) {
        has.hasContinue = true;
        replace = t.returnStatement(t.literal("continue"));
      } else if (t.isReturnStatement(node)) {
        has.hasReturn = true;
        replace = t.returnStatement(t.objectExpression([
          t.property("init", t.identifier("v"), node.argument || t.identifier("undefined"))
        ]));
      }

      if (replace) return t.inherits(replace, node);
    });
  }

  return has;
};

/**
 * Hoist all var declarations in this block to before it so they retain scope
 * once we wrap everything in a closure.
 */

LetScoping.prototype.hoistVarDeclarations = function () {
  var self = this;
  traverse(this.block, function (node) {
    if (t.isForStatement(node)) {
      if (isVar(node.init)) {
        node.init = t.sequenceExpression(self.pushDeclar(node.init));
      }
    } else if (t.isFor(node)) {
      if (isVar(node.left)) {
        node.left = node.left.declarations[0].id;
      }
    } else if (isVar(node)) {
      return self.pushDeclar(node).map(t.expressionStatement);
    } else if (t.isFunction(node)) {
      return false;
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
  traverse(this.block, function (node, parent, scope) {
    if (t.isFunction(node)) {
      traverse(node, function (node, parent) {
        // not an identifier so we have no use
        if (!t.isIdentifier(node)) return;

        // not a direct reference
        if (!t.isReferenced(node, parent)) return;

        // this scope has a variable with the same name so it couldn't belong
        // to our let scope
        if (scope.hasOwn(node.name)) return;

        closurify = true;

        // this key doesn't appear just outside our scope
        if (!_.contains(self.info.outsideKeys, node.name)) return;

        // push this badboy
        self.letReferences[node.name] = node;
      });

      return false;
    } else if (t.isFor(node)) {
      return false;
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

  _.each(node.declarations, function (declar) {
    if (!declar.init) return;

    var expr = t.assignmentExpression("=", declar.id, declar.init);
    replace.push(t.inherits(expr, declar));
  });

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

  var forParent = this.forParent;
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
    var label = forParent.label = forParent.label || t.identifier(this.file.generateUid("loop", this.scope));

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
