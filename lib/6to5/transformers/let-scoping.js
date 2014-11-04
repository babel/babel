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
    // we've been given a label so let's wrap ourself
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
    outsideKeys: [],
    declarators:  block._letDeclars || [],
    duplicates:  {},
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
        opts.duplicates[key] = id.name = file.generateUid(key, scope);
      }

      opts.keys.push(key);
    });
  });

  return opts;
};

var run = function (forParent, block, parent, file, scope) {
  if (block._letDone) return;
  block._letDone = true;

  var info = getInfo(block, file, scope);
  var declarators = info.declarators;
  var letKeys = info.keys;

  //

  if (!letKeys.length) return noClosure(declarators, block, info.duplicates);

  //

  var letReferences = {};
  var closurify = false;

  traverse(block, function (node, parent, opts) {
    if (t.isFunction(node)) {
      traverse(node, function (node, parent) {
        if (!t.isIdentifier(node)) return;
        if (!t.isReferenced(node, parent)) return;
        if (opts.scope.hasOwn(node.name)) return;

        closurify = true;
        if (!_.contains(info.outsideKeys, node.name)) return;
        if (_.has(letReferences, node.name)) return;

        letReferences[node.name] = node;
      });
      return false;
    } else if (t.isFor(node)) {
      return false;
    }
  });

  letReferences = _.values(letReferences);

  if (!closurify) return noClosure(declarators, block, info.duplicates);

  //

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

  //

  var body = [];

  var pushDeclar = function (node) {
    body.push(t.variableDeclaration("var", node.declarations.map(function (declar) {
      return t.variableDeclarator(declar.id);
    })));

    var replace = [];

    _.each(node.declarations, function (declar) {
      if (declar.init) replace.push(buildDeclarAssign(declar));
    });

    return replace;
  };

  var buildDeclarAssign = function (declar) {
    var expr = t.assignmentExpression("=", declar.id, declar.init);
    return t.inherits(expr, declar);
  };

  // hoist `var` declarations
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

  standardiseLets(declarators);

  //

  if (t.isFunction(parent)) return;

  //

  var fn = t.functionExpression(null, letReferences, t.blockStatement(block.body));
  fn._aliasFunction = true;

  var params = _.cloneDeep(letReferences);

  _.each(params, function (param) {
    param.name = info.duplicates[param.name] || param.name;
  });

  var call = t.callExpression(fn, params);

  block.body = body;

  //

  var ret = t.identifier(file.generateUid("ret", scope));

  var retCheck;

  if (has.hasReturn || has.hasBreak || has.hasContinue) {
    body.push(t.variableDeclaration("var", [
      t.variableDeclarator(ret, call)
    ]));

    if (has.hasReturn) {
      retCheck = t.ifStatement(
        t.binaryExpression("===", t.unaryExpression("typeof", ret, true), t.literal("object")),
        t.returnStatement(t.memberExpression(ret, t.identifier("v")))
      );

      if (!has.hasBreak && !has.hasContinue) {
        body.push(retCheck);
      }
    }

    if (has.hasBreak || has.hasContinue) {
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
