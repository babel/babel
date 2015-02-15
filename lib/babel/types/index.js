"use strict";

var toFastProperties = require("../helpers/to-fast-properties");
var isString         = require("lodash/lang/isString");
var compact          = require("lodash/array/compact");
var esutils          = require("esutils");
var object           = require("../helpers/object");
var each             = require("lodash/collection/each");
var uniq             = require("lodash/array/uniq");

var t = exports;

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
t.NATIVE_TYPE_NAMES       = ["Array", "Object", "Number", "Boolean", "Date", "Array", "String"];
t.FOR_INIT_KEYS           = ["left", "init"];

t.VISITOR_KEYS = require("./visitor-keys");
t.ALIAS_KEYS   = require("./alias-keys");

t.FLIPPED_ALIAS_KEYS = {};

each(t.VISITOR_KEYS, function (keys, type) {
  registerType(type, true);
});

each(t.ALIAS_KEYS, function (aliases, type) {
  each(aliases, function (alias) {
    var types = t.FLIPPED_ALIAS_KEYS[alias] = t.FLIPPED_ALIAS_KEYS[alias] || [];
    types.push(type);
  });
});

each(t.FLIPPED_ALIAS_KEYS, function (types, type) {
  t[type.toUpperCase() + "_TYPES"] = types;
  registerType(type, false);
});

/**
 * Returns whether `node` is of given `type`.
 *
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
  if (!node) return false;

  var typeMatches = type === node.type;

  if (!typeMatches && !skipAliasCheck) {
    var aliases = t.FLIPPED_ALIAS_KEYS[type];

    if (typeof aliases !== "undefined") {
      typeMatches = aliases.indexOf(node.type) > -1;
    }
  }

  if (!typeMatches) {
    return false;
  }

  if (typeof opts !== "undefined") {
    return t.shallowEqual(node, opts);
  }

  return true;
};

//

t.BUILDER_KEYS = require("./builder-keys");

each(t.VISITOR_KEYS, function (keys, type) {
  if (t.BUILDER_KEYS[type]) return;

  var defs = {};
  each(keys, function (key) {
    defs[key] = null;
  });
  t.BUILDER_KEYS[type] = defs;
});

each(t.BUILDER_KEYS, function (keys, type) {
  t[type[0].toLowerCase() + type.slice(1)] = function () {
    var node = {};
    node.start = null;
    node.type = type;

    var i = 0;

    for (var key in keys) {
      var arg = arguments[i++];
      if (arg === undefined) arg = keys[key];
      node[key] = arg;
    }

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
 * Shallowly checks to see if the passed `node` is falsy.
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
 *
 * @param {Array} nodes
 * @param {Scope} scope
 */

t.toSequenceExpression = function (nodes, scope) {
  var exprs = [];

  each(nodes, function (node) {
    if (t.isExpression(node)) {
      exprs.push(node);
    } if (t.isExpressionStatement(node)) {
      exprs.push(node.expression);
    } else if (t.isVariableDeclaration(node)) {
      each(node.declarations, function (declar) {
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

/*
 * Description
 *
 * @param {Object} actual
 * @param {Object} expected
 * @returns {Boolean}
 */

t.shallowEqual = function (actual, expected) {
  var keys = Object.keys(expected);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (actual[key] !== expected[key]) {
      return false;
    }
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
 * Check if the input `node` is a reference to a bound variable.
 *
 * @param {Object} node
 * @param {Object} parent
 * @returns {Boolean}
 */

t.isReferenced = function (node, parent) {
  // yes: PARENT[NODE]
  // yes: NODE.child
  // no: parent.CHILD
  if (t.isMemberExpression(parent)) {
    if (parent.property === node && parent.computed) {
      return true;
    } else if (parent.object === node) {
      return true;
    } else {
      return false;
    }
  }

  // yes: { [NODE]: "" }
  // no: { NODE: "" }
  if (t.isProperty(parent) && parent.key === node) {
    return parent.computed;
  }

  // no: var NODE = init;
  // yes: var id = NODE;
  if (t.isVariableDeclarator(parent)) {
    return parent.id !== node;
  }

  // no: function NODE() {}
  // no: function foo(NODE) {}
  if (t.isFunction(parent)) {
    for (var i = 0; i < parent.params.length; i++) {
      var param = parent.params[i];
      if (param === node) return false;
    }

    return parent.id !== node;
  }

  // no: class NODE {}
  if (t.isClass(parent)) {
    return parent.id !== node;
  }

  // yes: class { [NODE](){} }
  if (t.isMethodDefinition(parent)) {
    return parent.key === node && parent.computed;
  }

  // no: NODE: for (;;) {}
  if (t.isLabeledStatement(parent)) {
    return false;
  }

  // no: try {} catch (NODE) {}
  if (t.isCatchClause(parent)) {
    return parent.param !== node;
  }

  // no: function foo(...NODE) {}
  if (t.isRestElement(parent)) {
    return false;
  }

  // no: [NODE = foo] = [];
  // yes: [foo = NODE] = [];
  if (t.isAssignmentPattern(parent)) {
    return parent.right === node;
  }

  // no: [NODE] = [];
  // no: ({ NODE }) = [];
  if (t.isPattern(parent)) {
    return false;
  }

  // no: import NODE from "bar";
  if (t.isImportSpecifier(parent)) {
    return false;
  }

  // no: import * as NODE from "foo";
  if (t.isImportBatchSpecifier(parent)) {
    return false;
  }

  // no: class Foo { private NODE; }
  if (t.isPrivateDeclaration(parent)) {
    return false;
  }

  return true;
};

/**
 * Check if the input `node` is an `Identifier` and `isReferenced`.
 *
 * @param {Node} node
 * @parma {Node} parent
 * @returns {Boolean}
 */

t.isReferencedIdentifier = function (node, parent, opts) {
  return t.isIdentifier(node, opts) && t.isReferenced(node, parent);
};

/**
 * Check if the input `name` is a valid identifier name
 * and isn't a reserved word.
 *
 * @param {String} name
 * @returns {Boolean}
 */

t.isValidIdentifier = function (name) {
  return isString(name) && esutils.keyword.isIdentifierName(name) && !esutils.keyword.isReservedWordES6(name, true);
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
  name = name.replace(/[-\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });

  if (!t.isValidIdentifier(name)) {
    name = "_" + name;
  }

  return name || "_";
};

/**
 * Description
 *
 * @param {Object} node
 * @param {String=} key
 */

t.ensureBlock = function (node, key) {
  key = key || "body";
  return node[key] = t.toBlock(node[key], node);
};

/**
 * Build a function that when called will return whether or not the
 * input `node` `MemberExpression` matches the input `match`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 *
 * @param {String} match Dot-delimited string
 * @param {Boolean} [allowPartial] Allow a partial match
 * @returns {Function}
 */

t.buildMatchMemberExpression = function (match, allowPartial) {
  var parts = match.split(".");

  return function (member) {
    // not a member expression
    if (!t.isMemberExpression(member)) return false;

    var search = [member];
    var i = 0;

    while (search.length) {
      var node = search.shift();

      if (allowPartial && i === parts.length) {
        return true;
      }

      if (t.isIdentifier(node)) {
        // this part doesn't match
        if (parts[i] !== node.name) return false;
      } else if (t.isLiteral(node)) {
        // this part doesn't match
        if (parts[i] !== node.value) return false;
      } else if (t.isMemberExpression(node)) {
        if (node.computed && !t.isLiteral(node.property)) {
          // we can't deal with this
          return false;
        } else {
          search.push(node.object);
          search.push(node.property);
          continue;
        }
      } else {
        // we can't deal with this
        return false;
      }

      // too many parts
      if (++i > parts.length) {
        return false;
      }
    }

    return true;
  };
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
  } else if (t.isAssignmentExpression(node)) {
    return t.expressionStatement(node);
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
 * Return a list of binding identifiers associated with
 * the input `node`.
 *
 * @param {Object} node
 * @returns {Array|Object}
 */

t.getBindingIdentifiers = function (node) {
  var search = [].concat(node);
  var ids    = object();

  while (search.length) {
    var id = search.shift();
    if (!id) continue;

    var keys = t.getBindingIdentifiers.keys[id.type];

    if (t.isIdentifier(id)) {
      ids[id.name] = id;
    } else if (t.isImportSpecifier(id)) {
      search.push(id.name || id.id);
    } else if (t.isExportDeclaration(id)) {
      if (t.isDeclaration(node.declaration)) {
        search.push(node.declaration);
      }
    } else if (keys) {
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        search = search.concat(id[key] || []);
      }
    }
  }

  return ids;
};

t.getBindingIdentifiers.keys = {
  UnaryExpression: ["argument"],
  AssignmentExpression: ["left"],
  ImportBatchSpecifier: ["name"],
  VariableDeclarator: ["id"],
  FunctionDeclaration: ["id"],
  ClassDeclaration: ["id"],
  SpreadElement: ["argument"],
  RestElement: ["argument"],
  UpdateExpression: ["argument"],
  SpreadProperty: ["argument"],
  Property: ["value"],
  ComprehensionBlock: ["left"],
  AssignmentPattern: ["left"],
  PrivateDeclaration: ["declarations"],
  ComprehensionExpression: ["blocks"],
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
  return t.isFunctionDeclaration(node) || t.isClassDeclaration(node) || t.isLet(node);
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
  each(t.COMMENT_KEYS, function (key) {
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
  each(t.COMMENT_KEYS, function (key) {
    child[key]  = uniq(compact([].concat(child[key], parent[key])));
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
  child._declarations = parent._declarations;
  child._scopeInfo    = parent._scopeInfo;
  child.range         = parent.range;
  child.start         = parent.start;
  child.loc           = parent.loc;
  child.end           = parent.end;
  t.inheritsComments(child, parent);
  return child;
};

/**
 * Description
 *
 * @param {Object} node
 * @returns {Array}
 */

t.getLastStatements = function (node) {
  var nodes = [];

  var add = function (node) {
    nodes = nodes.concat(t.getLastStatements(node));
  };

  if (t.isIfStatement(node)) {
    add(node.consequent);
    add(node.alternate);
  } else if (t.isFor(node) || t.isWhile(node)) {
    add(node.body);
  } else if (t.isProgram(node) || t.isBlockStatement(node)) {
    add(node.body[node.body.length - 1]);
  } else if (node) {
    nodes.push(node);
  }

  return nodes;
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
 * @returns {String}
 */

t.getSpecifierId = function (specifier) {
  if (specifier.default) {
    return t.identifier("default");
  } else {
    return specifier.id;
  }
};

/**
 * Description
 *
 * @param {Object} specifier
 * @returns {Boolean}
 */

t.isSpecifierDefault = function (specifier) {
  return specifier.default || t.isIdentifier(specifier.id) && specifier.id.name === "default";
};

/**
 * Description
 *
 * @param {Node} node
 * @param {Node} parent
 * @returns {Boolean}
 */

t.isScope = function (node, parent) {
  if (t.isBlockStatement(node)) {
    if (t.isLoop(parent.block, { body: node })) {
      return false;
    }

    if (t.isFunction(parent.block, { body: node })) {
      return false;
    }
  }

  return t.isScopable(node);
};

toFastProperties(t);
toFastProperties(t.VISITOR_KEYS);
