"use strict";

var toFastProperties = require("../to-fast-properties");
var esutils          = require("esutils");
var _                = require("lodash");

var t = exports;

t.NATIVE_TYPE_NAMES = ["Array", "Object", "Number", "Boolean", "Date", "Array", "String"];

//

/**
 * Registers `is[Type]` and `assert[Type]` generated functions for a given `type`.
 * Pass `skipAliasCheck` to force it to directly compare `node.type` with `type`.
 *
 * @param {String} type
 * @param {Boolean?} skipAliasCheck
 */

function registerType(type, skipAliasCheck) {
  var is = t["is" + type] = function (node, opts) {
    return t.is(type, node, opts, skipAliasCheck);
  };

  t["assert" + type] = function (node, opts) {
    opts = opts || {};
    if (!is(node, opts)) {
      throw new Error("Expected type " + JSON.stringify(type) + " with option " + JSON.stringify(opts));
    }
  };
}

t.STATEMENT_OR_BLOCK_KEYS = ["consequent", "body"];

//

t.VISITOR_KEYS = require("./visitor-keys");

t.ALIAS_KEYS = require("./alias-keys");

t.FLIPPED_ALIAS_KEYS = {};

_.each(t.VISITOR_KEYS, function (keys, type) {
  registerType(type, true);
});

_.each(t.ALIAS_KEYS, function (aliases, type) {
  _.each(aliases, function (alias) {
    var types = t.FLIPPED_ALIAS_KEYS[alias] = t.FLIPPED_ALIAS_KEYS[alias] || [];
    types.push(type);
  });
});

_.each(t.FLIPPED_ALIAS_KEYS, function (types, type) {
  t[type.toUpperCase() + "_TYPES"] = types;
  registerType(type, false);
});

/**
 * Returns whether `node` is of given `type`.
 * For better performance, use this instead of `is[Type]` when `type` is unknown.
 * Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.
 *
 * @param {String} type
 * @param {Node} node
 * @param {Object?} opts
 * @param {Boolean?} skipAliasCheck
 * @returns {Boolean} isOfType
 */

t.is = function (type, node, opts, skipAliasCheck) {
  if (!node) return;

  var typeMatches = (type === node.type);

  if (!typeMatches && !skipAliasCheck) {
    var aliases = t.FLIPPED_ALIAS_KEYS[type];

    if (typeof aliases !== 'undefined')
      typeMatches = aliases.indexOf(node.type) > -1;
  }

  if (!typeMatches) {
    return false;
  }

  if (typeof opts !== 'undefined')
    return t.shallowEqual(node, opts);

  return true;
};

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

/**
 * Description
 *
 * @param {Object} node
 * @returns {Object}
 */

t.toComputedKey = function (node, key) {
  if (!node.computed) {
    if (t.isIdentifier(key)) key = t.literal(key.name);
  }
  return key;
};

/*
 * Shallowly checks to see if the passed `node` will evaluate to a
 * falsy. This is if `node` is a `Literal` and `value` is falsy or
 * `node` is an `Identifier` with a name of `undefiend`.
 *
 * @param {Object} node
 * @returns {Boolean}
 */

t.isFalsyExpression = function (node) {
  if (t.isLiteral(node)) {
    return !node.value;
  } else if (t.isIdentifier(node)) {
    return node.name === "undefined";
  }
  return false;
};

/**
 * Turn an array of statement `nodes` into a `SequenceExpression`.
 *
 * Variable declarations are turned into simple assignments and their
 * declarations hoisted to the top of the current scope.
 *
 * Expression statements are just resolved to their standard expression.
 */

t.toSequenceExpression = function (nodes, scope) {
  var exprs = [];

  _.each(nodes, function (node) {
    if (t.isExpression(node)) {
      exprs.push(node);
    } if (t.isExpressionStatement(node)) {
      exprs.push(node.expression);
    } else if (t.isVariableDeclaration(node)) {
      _.each(node.declarations, function (declar) {
        scope.push({
          kind: node.kind,
          key: declar.id.name,
          id: declar.id
        });
        exprs.push(t.assignmentExpression("=", declar.id, declar.init));
      });
    }
  });

  if (exprs.length === 1) {
    return exprs[0];
  } else {
    return t.sequenceExpression(exprs);
  }
};

//

t.shallowEqual = function (actual, expected) {
  var keys = Object.keys(expected);
  var key;

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];

    if (actual[key] !== expected[key])
      return false;
  }

  return true;
};

/**
 * Description
 *
 * @param {Object} member
 * @param {Object} append
 * @param {Boolean} [computed]
 * @returns {Object} member
 */

t.appendToMemberExpression = function (member, append, computed) {
  member.object   = t.memberExpression(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
};

/**
 * Description
 *
 * @param {Object} member
 * @param {Object} append
 * @returns {Object} member
 */

t.prependToMemberExpression = function (member, append) {
  member.object = t.memberExpression(append, member.object);
  return member;
};

/**
 * Description
 *
 * @param {Object} node
 * @param {Object} parent
 * @returns {Boolean}
 */

t.isReferenced = function (node, parent) {
  // we're a property key and we aren't computed so we aren't referenced
  if (t.isProperty(parent) && parent.key === node && !parent.computed) return false;

  if (t.isFunction(parent)) {
    // we're a function param
    if (_.contains(parent.params, node)) return false;

    // we're a rest parameter
    if (parent.rest === node) return false;
  }

  if (t.isMethodDefinition(parent) && parent.key === node && !parent.computed) {
    return false;
  }

  // we're a catch clause param
  if (t.isCatchClause(parent) && parent.param === node) return false;

  // we're a variable declarator id so we aren't referenced
  if (t.isVariableDeclarator(parent) && parent.id === node) return false;

  var isMemberExpression = t.isMemberExpression(parent);

  // we're in a member expression and we're the computed property so we're referenced
  var isComputedProperty = isMemberExpression && parent.property === node && parent.computed;

  // we're in a member expression and we're the object so we're referenced
  var isObject = isMemberExpression && parent.object === node;

  // we are referenced
  if (!isMemberExpression || isComputedProperty || isObject) return true;

  return false;
};

/**
 * Description
 *
 * @param {Object} node
 * @param {Object} parent
 * @returns {Boolean}
 */

t.isReferencedIdentifier = function (node, parent) {
  return t.isIdentifier(node) && t.isReferenced(node, parent);
};

/**
 * Description
 *
 * @param {String} name
 * @returns {Boolean}
 */

t.isValidIdentifier = function (name) {
  return _.isString(name) && esutils.keyword.isIdentifierName(name) && !esutils.keyword.isReservedWordES6(name, true);
};

/*
 * Description
 *
 * @param {String} name
 * @returns {String}
 */

t.toIdentifier = function (name) {
  if (t.isIdentifier(name)) return name.name;

  name = name + "";

  // replace all non-valid identifiers with dashes
  name = name.replace(/[^a-zA-Z0-9$_]/g, "-");

  // remove all dashes and numbers from start of name
  name = name.replace(/^[-0-9]+/, "");

  // camel case
  name = name.replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });

  // remove underscores from start of name
  name = name.replace(/^\_/, "");

  if (!t.isValidIdentifier(name)) {
    name = "_" + name;
  }

  return name || '_';
};

/**
 * Description
 *
 * @param {Object} node
 * @param {String} key
 */

t.ensureBlock = function (node, key) {
  key = key || "body";
  node[key] = t.toBlock(node[key], node);
};

/**
 * Description
 *
 * @param {Object} node
 * @param {Boolean} [ignore]
 * @returns {Object|Boolean}
 */

t.toStatement = function (node, ignore) {
  if (t.isStatement(node)) {
    return node;
  }

  var mustHaveId = false;
  var newType;

  if (t.isClass(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration";
  } else if (t.isFunction(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration";
  }

  if (mustHaveId && !node.id) {
    newType = false;
  }

  if (!newType) {
    if (ignore) {
      return false;
    } else {
      throw new Error("cannot turn " + node.type + " to a statement");
    }
  }

  node.type = newType;

  return node;
};

/**
 * Description
 *
 * @param {Object} node
 * @returns {Object}
 */

exports.toExpression = function (node) {
  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  if (t.isClass(node)) {
    node.type = "ClassExpression";
  } else if (t.isFunction(node)) {
    node.type = "FunctionExpression";
  }

  if (t.isExpression(node)) {
    return node;
  } else {
    throw new Error("cannot turn " + node.type + " to an expression");
  }
};

/**
 * Description
 *
 * @param {Object} node
 * @param {Object} parent
 * @returns {Object}
 */

t.toBlock = function (node, parent) {
  if (t.isBlockStatement(node)) {
    return node;
  }

  if (t.isEmptyStatement(node)) {
    node = [];
  }

  if (!Array.isArray(node)) {
    if (!t.isStatement(node)) {
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

/**
 * Description
 *
 * @param {Object} node
 * @param {Boolean} [map]
 * @param {Array} [ignoreTypes]
 * @returns {Array|Object}
 */

t.getIds = function (node, map, ignoreTypes) {
  ignoreTypes = ignoreTypes || [];

  var search = [].concat(node);
  var ids    = {};

  while (search.length) {
    var id = search.shift();
    if (!id) continue;
    if (_.contains(ignoreTypes, id.type)) continue;

    var nodeKeys = t.getIds.nodes[id.type];
    var arrKeys  = t.getIds.arrays[id.type];

    var i, key;

    if (t.isIdentifier(id)) {
      ids[id.name] = id;
    } else if (nodeKeys) {
      for (i = 0; i < nodeKeys.length; i++) {
        key = nodeKeys[i];
        if (id[key]) {
          search.push(id[key]);
          break;
        }
      }
    } else if (arrKeys) {
      for (i = 0; i < arrKeys.length; i++) {
        key = arrKeys[i];
        search = search.concat(id[key] || []);
      }
    }
  }

  if (!map) ids = _.keys(ids);
  return ids;
};

t.getIds.nodes = {
  AssignmentExpression: ["left"],
  ImportBatchSpecifier: ["name"],
  ImportSpecifier: ["name", "id"],
  ExportSpecifier: ["name", "id"],
  VariableDeclarator: ["id"],
  FunctionDeclaration: ["id"],
  ClassDeclaration: ["id"],
  MemeberExpression: ["object"],
  SpreadElement: ["argument"],
  Property: ["value"],
  ComprehensionBlock: ["left"],
  AssignmentPattern: ["left"]
};

t.getIds.arrays = {
  PrivateDeclaration: ["declarations"],
  ComprehensionExpression: ["blocks"],
  ExportDeclaration: ["specifiers", "declaration"],
  ImportDeclaration: ["specifiers"],
  VariableDeclaration: ["declarations"],
  ArrayPattern: ["elements"],
  ObjectPattern: ["properties"]
};

/**
 * Description
 *
 * @param {Object} node
 * @returns {Boolean}
 */

t.isLet = function (node) {
  return t.isVariableDeclaration(node) && (node.kind !== "var" || node._let);
};

/**
 * Description
 *
 * @param {Object} node
 * @returns {Boolean}
 */

t.isBlockScoped = function (node) {
  return t.isFunctionDeclaration(node) || t.isLet(node);
};

/**
 * Description
 *
 * @param {Object} node
 * @returns {Boolean}
 */

t.isVar = function (node) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !node._let;
};

//

t.COMMENT_KEYS = ["leadingComments", "trailingComments"];

/**
 * Description
 *
 * @param {Object} child
 * @returns {Object} child
 */

t.removeComments = function (child) {
  _.each(t.COMMENT_KEYS, function (key) {
    delete child[key];
  });
  return child;
};

/**
 * Description
 *
 * @param {Object} child
 * @param {Object} parent
 * @returns {Object} child
 */

t.inheritsComments = function (child, parent) {
  _.each(t.COMMENT_KEYS, function (key) {
    child[key]  = _.uniq(_.compact([].concat(child[key], parent[key])));
  });
  return child;
};

/**
 * Description
 *
 * @param {Object} child
 * @param {Object} parent
 * @returns {Object} child
 */

t.inherits = function (child, parent) {
  child.range = parent.range;
  child.start = parent.start;
  child.loc   = parent.loc;
  child.end   = parent.end;
  t.inheritsComments(child, parent);
  return child;
};

/**
 * Description
 *
 * @param {Object} specifier
 * @returns {String}
 */

t.getSpecifierName = function (specifier) {
  return specifier.name || specifier.id;
};

/**
 * Description
 *
 * @param {Object} specifier
 * @returns {Boolean}
 */

t.isSpecifierDefault = function (specifier) {
  return t.isIdentifier(specifier.id) && specifier.id.name === "default";
};

toFastProperties(t);
toFastProperties(t.VISITOR_KEYS);
