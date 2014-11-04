var traverse = require("../traverse");
var n        = require("ast-types").namedTypes;
var _        = require("lodash");

var t = exports;

//

t.VISITOR_KEYS = require("./visitor-keys");

_.each(t.VISITOR_KEYS, function (keys, type) {
  t["is" + type] = function (node) {
    return node && node.type === type;
  };
});

//

t.BUILDER_KEYS = _.defaults(require("./builder-keys"), t.VISITOR_KEYS);

_.each(t.BUILDER_KEYS, function (keys, type) {
  t[type[0].toLowerCase() + type.slice(1)] = function () {
    var args = arguments;
    var node = { type: type };
    _.each(keys, function (key, i) {
      node[key] = args[i];
    });
    return node;
  };
});

//

t.ALIAS_KEYS = require("./alias-keys");

var _aliases = {};

_.each(t.ALIAS_KEYS, function (aliases, type) {
  _.each(aliases, function (alias) {
    var types = _aliases[alias] = _aliases[alias] || [];
    types.push(type);
  });
});

_.each(_aliases, function (types, type) {
  t[type.toUpperCase() + "_TYPES"] = types;

  t["is" + type] = function (node) {
    return node && _.contains(types, node.type);
  };
});

//

t.isReferenced = function (node, parent) {
  // we're a property key so we aren't referenced
  if (t.isProperty(parent) && parent.key === node) return false;

  var isMemberExpression = t.isMemberExpression(parent);

  // we're in a member expression and we're the computed property so we're referenced
  var isComputedProperty = isMemberExpression && parent.property === node && parent.computed;

  // we're in a member expression and we're the object so we're referenced
  var isObject = isMemberExpression && parent.object === node;

  // we are referenced
  if (!isMemberExpression || isComputedProperty || isObject) return true;

  return false;
};

t.ensureBlock = function (node) {
  node.body = t.toBlock(node.body, node);
};

t.toBlock = function (node, parent) {
  if (t.isBlockStatement(node)) {
    return node;
  }

  if (!_.isArray(node)) {
    if (!n.Statement.check(node)) {
      if (t.isFunction(parent)) {
        node = t.returnStatement(node);
      } else {
        node = t.expressionStatement(node);
      }
    }

    node = [node];
  }

  return t.blockStatement(node);
};

t.getIds = function (node) {
  var search = [node];
  var ids  = [];

  while (search.length) {
    var id = search.shift();

    if (t.isIdentifier(id)) {
      ids.push(id.name);
    } else if (t.isArrayPattern(id)) {
      _.each(id.elements, function (elem) {
        search.push(elem);
      });
    } else if (t.isAssignmentExpression(id)) {
      search.push(id.left);
    } else if (t.isObjectPattern(id)) {
      _.each(id.properties, function (prop) {
        search.push(prop.value);
      });
    } else if (t.isVariableDeclaration(id)) {
      search = search.concat(id.declarations);
    } else if (t.isVariableDeclarator(id)) {
      search.push(id.id);
    } else if (id) {
      throw new Error("unknown node " + id.type);
    }
  }

  return ids;
};

t.inherits = function (child, parent) {
  child.loc   = parent.loc;
  child.end   = parent.end;
  child.range = parent.range;
  child.start = parent.start;
  return child;
};

t.getSpecifierName = function (specifier) {
  return specifier.name || specifier.id;
};

t.needsWhitespace = function (node, expression) {
  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  //

  if (t.isFunction(node) || t.isClass(node) || t.isFor(node) || t.isSwitchStatement(node)) {
    return true;
  }

  if (t.isIfStatement(node) && t.isBlockStatement(node.consequent)) {
    return true;
  }

  if (t.isCallExpression(node) && t.isFunction(node.callee)) {
    return true;
  }

  if (expression) return false;

  //

  if (_.contains([
    "Literal",
    "CallExpression"
  ], node.type)) {
    return true;
  }

  //

  var exprs = [];

  if (t.isVariableDeclaration(node)) {
    exprs = _.map(node.declarations, "init");
  }

  if (t.isArrayExpression(node)) {
    exprs = node.elements;
  }

  if (t.isObjectExpression(node)) {
    exprs = node.properties;
  }

  return exprs.some(function (expr) {
    return t.needsWhitespace(expr, true);
  });
};

t.needsParans = function (node, parent) {
  if (!parent) return false;

  //
  if (t.isUnaryLike(node)) {
    return t.isMemberExpression(parent) && parent.object === node;
  }

  if (t.isBinary(node)) {
    //
    if (t.isCallExpression(parent) && parent.callee === node) {
      return true;
    }

    //
    if (t.isUnaryLike(parent)) {
      return true;
    }

    //
    if (t.isMemberExpression(parent) && parent.object === node) {
      return true;
    }

    if (t.isBinary(parent)) {
      var parentOp  = parent.operator;
      var parentPos = PRECEDENCE[parentOp];

      var nodeOp = node.operator;
      var nodeOp = PRECEDENCE[nodeOp];

      if (parentPos > nodeOp) {
        return true;
      }

      if (parentPos === nodeOp && parent.right === node) {
        return true;
      }
    }
  }

  // (class {});
  if (t.isClassExpression(node) && t.isExpressionStatement(parent)) {
    return true;
  }

  if (t.isSequenceExpression(node)) {
    if (t.isForStatement(parent)) {
      // Although parentheses wouldn't hurt around sequence
      // expressions in the head of for loops, traditional style
      // dictates that e.g. i++, j++ should not be wrapped with
      // parentheses.
      return false;
    }

    if (t.isExpressionStatement(parent) && parent.expression === node) {
      return false;
    }

    // Otherwise err on the side of overparenthesization, adding
    // explicit exceptions above if this proves overzealous.
    return true;
  }

  //
  if (t.isYieldExpression(node)) {
    return t.isBinary(parent)
        || t.isUnaryLike(parent)
        || t.isCallExpression(parent)
        || t.isMemberExpression(parent)
        || t.isNewExpression(parent)
        || t.isConditionalExpression(parent)
        || t.isYieldExpression(parent);
  }

  if (t.isNewExpression(parent) && parent.callee === node) {
    return traverse.hasType(node, "CallExpression");
  }

  // (1).valueOf()
  if (t.isLiteral(node) && _.isNumber(node.value) && t.isMemberExpression(parent) && parent.object === node) {
    return true;
  }

  if (t.isAssignmentExpression(node) || t.isConditionalExpression(node)) {
    //
    if (t.isUnaryLike(parent)) {
      return true;
    }

    //
    if (t.isBinary(parent)) {
      return true;
    }

    //
    if (t.isCallExpression(parent) && parent.callee === node) {
      return true;
    }

    //
    if (t.isConditionalExpression(parent) && parent.test === node) {
      return true;
    }

    //
    if (t.isMemberExpression(parent) && parent.object === node) {
      return true;
    }
  }

  if (t.isFunctionExpression(node)) {
    // function () {};
    if (t.isExpressionStatement(parent)) {
      return true;
    }

    // (function test() {}).name;
    if (t.isMemberExpression(parent) && parent.object === node) {
      return true;
    }

    // (function () {})();
    if (t.isCallExpression(parent) && parent.callee === node) {
      return true;
    }
  }

  // ({ x, y }) = { x: 5, y: 6 };
  if (t.isObjectPattern(node) && t.isAssignmentExpression(parent) && parent.left == node) {
    return true;
  }

  return false;
};

var PRECEDENCE = {};

_.each([
  ["||"],
  ["&&"],
  ["|"],
  ["^"],
  ["&"],
  ["==", "===", "!=", "!=="],
  ["<", ">", "<=", ">=", "in", "instanceof"],
  [">>", "<<", ">>>"],
  ["+", "-"],
  ["*", "/", "%"]
], function(tier, i) {
  _.each(tier, function(op) {
    PRECEDENCE[op] = i;
  });
});

