var traverse = require("../traverse");
var t        = require("../types");
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
  return t.isVariableDeclaration(node) && node.kind === "var" && !isLet(node);
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

  run(node, node.body, parent, file, scope);

  if (node.label && !t.isLabeledStatement(parent)) {
    // we've been given a label so let's wrap ourselves
    return t.labeledStatement(node.label, node);
  }
};

exports.BlockStatement = function (block, parent, file, scope) {
  if (!t.isFor(parent)) {
    run(false, block, parent, file, scope);
  }
};

var noClosure = function (letDeclars, block, replacements) {
  standardiseLets(letDeclars);

  if (_.isEmpty(replacements)) return;

  traverse(block, function (node, parent) {
    if (!t.isIdentifier(node)) return;
    if (!t.isReferenced(node, parent)) return;
    node.name = replacements[node.name] || node.name;
  });
};

var standardiseLets = function (declars) {
  _.each(declars, function (declar) {
    delete declar._let;
  });
};

var getInfo = function (block, file, scope) {
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

var checkFor = function (forParent, block) {
  var has = {
    hasContinue: false,
    hasReturn:   false,
    hasBreak:    false,
  };

  if (forParent) {
    traverse(block, function (node) {
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
          t.property("init", t.identifier("v"), node.argument)
        ]));
      }

      if (replace) return t.inherits(replace, node);
    });
  }

  return has;
};

var run = function (forParent, block, parent, file, scope) {
  if (block._letDone) return;
  block._letDone = true;

  var info = getInfo(block, file, scope);
  var declarators = info.declarators;
  var letKeys = info.keys;

  // this is a block within a `Function` so we can safely leave it be
  if (t.isFunction(parent)) return;

  // this block has no let references so let's clean up
  if (!letKeys.length) return noClosure(declarators, block, info.duplicates);

  // outside let references that we need to wrap
  var letReferences = {};

  // are there any outside let references within any functions?
  var closurify = false;

  // traverse through this block, stopping on functions and checking if they
  // contain any outside let references
  traverse(block, function (node, parent, opts) {
    if (t.isFunction(node)) {
      traverse(node, function (node, parent) {
        // not an identifier so we have no use
        if (!t.isIdentifier(node)) return;

        // not a direct reference
        if (!t.isReferenced(node, parent)) return;

        // this scope has a variable with the same name so it couldn't belong
        // to our let scope
        if (opts.scope.hasOwn(node.name)) return;

        closurify = true;

        // this key doesn't appear just outside our scope
        if (!_.contains(info.outsideKeys, node.name)) return;

        // push this badboy
        letReferences[node.name] = node;
      });

      return false;
    } else if (t.isFor(node)) {
      return false;
    }
  });

  letReferences = _.values(letReferences);

  // no need for a closure so let's clean up
  if (!closurify) return noClosure(declarators, block, info.duplicates);

  // if we're inside of a for loop then we search to see if there are any
  // `break`s, `continue`s, `return`s etc
  var has = checkFor(forParent, block);

  var body = [];

  // hoist a `VariableDeclaration` and add `AssignmentExpression`s in it's place
  var pushDeclar = function (node) {
    body.push(t.variableDeclaration(node.kind, node.declarations.map(function (declar) {
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

  // hoist var references to retain scope
  traverse(block, function (node) {
    if (t.isForStatement(node)) {
      if (isVar(node.init)) {
        node.init = t.sequenceExpression(pushDeclar(node.init));
      }
    } else if (t.isFor(node)) {
      if (isVar(node.left)) {
        node.left = node.left.declarations[0].id;
      }
    } else if (isVar(node)) {
      return pushDeclar(node).map(t.expressionStatement);
    } else if (t.isFunction(node)) {
      return false;
    }
  });

  // set let references to plain var references
  standardiseLets(declarators);

  // build the closure that we're going to wrap the block with
  var fn = t.functionExpression(null, letReferences, t.blockStatement(block.body));
  fn._aliasFunction = true;

  // replace the current block body with the one we've built
  block.body = body;

  // cahnge duplicate let references to their uid if they have one
  var params = _.cloneDeep(letReferences);
  _.each(params, function (param) {
    param.name = info.duplicates[param.name] || param.name;
  });

  var call = t.callExpression(fn, params);
  var ret  = t.identifier(file.generateUid("ret", scope));

  if (has.hasReturn || has.hasBreak || has.hasContinue) {
    body.push(t.variableDeclaration("var", [
      t.variableDeclarator(ret, call)
    ]));

    var retCheck;

    if (has.hasReturn) {
      // typeof ret === "object"
      retCheck = t.ifStatement(
        t.binaryExpression("===", t.unaryExpression("typeof", ret, true), t.literal("object")),
        t.returnStatement(t.memberExpression(ret, t.identifier("v")))
      );

      // there's no `break` or `continue` so we can just push in the `if`
      if (!has.hasBreak && !has.hasContinue) {
        body.push(retCheck);
      }
    }

    if (has.hasBreak || has.hasContinue) {
      // ensure that the parent has a label as we're building a switch and we
      // need to be able to access it
      var label = forParent.label = forParent.label || t.identifier(file.generateUid("loop", scope));

      var cases = [];

      if (has.hasBreak) {
        cases.push(t.switchCase(t.literal("break"), [t.breakStatement(label)]));
      }

      if (has.hasContinue) {
        cases.push(t.switchCase(t.literal("continue"), [t.continueStatement(label)]));
      }

      if (has.hasReturn) {
        cases.push(t.switchCase(null, [retCheck]));
      }

      body.push(t.switchStatement(ret, cases));
    }

  } else {
    body.push(t.expressionStatement(call));
  }
};
