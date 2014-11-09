var _ = require("lodash");

var t = exports;

//

t.VISITOR_KEYS = require("./visitor-keys");

_.each(t.VISITOR_KEYS, function (keys, type) {
  t["is" + type] = function (node, opts) {
    return node && node.type === type && t.shallowEqual(node, opts);
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

  t["is" + type] = function (node, opts) {
    return node && _.contains(types, node.type) && t.shallowEqual(node, opts);
  };
});

//

t.shallowEqual = function (actual, expected) {
  var same = true;

  if (expected) {
    _.each(expected, function (val, key) {
      if (actual[key] !== val) {
        return same = false;
      }
    });
  }

  return same;
};

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

t.toIdentifier = function (name) {
  if (t.isIdentifier(name)) return name.name;

  // replace all non-valid identifiers with dashes
  name = name.replace(/[^a-zA-Z0-9]/g, "-");

  // remove all dashes and numbers from start of name
  name = name.replace(/^[-0-9]+/, "");

  // camel case
  name = name.replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });

  return name;
};

t.ensureBlock = function (node) {
  node.body = t.toBlock(node.body, node);
};

t.toStatement = function (node, ignore) {
  var mustHaveId = false;
  var newType;

  if (t.isClass(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration";
  } else if (t.isFunction(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration";
  } else if (t.isStatement(node)) {
    newType = node.type;
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

t.toBlock = function (node, parent) {
  if (t.isBlockStatement(node)) {
    return node;
  }

  if (!_.isArray(node)) {
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

t.getIds = function (node, map) {
  var search = [node];
  var ids    = {};

  while (search.length) {
    var id = search.shift();

    if (t.isIdentifier(id)) {
      ids[id.name] = id;
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
    } else if (t.isImportSpecifier(id) || t.isExportSpecifier(id) || t.isVariableDeclarator(id) || t.isFunctionDeclaration(id) || t.isClassDeclaration(id)) {
      search.push(id.id);
    } else if (t.isSpreadElement(id)) {
      search.push(id.argument);
    } else if (t.isExportDeclaration(id) || t.isImportDeclaration(id)) {
      search = search.concat(id.specifiers);
    } else if (t.isMemberExpression(id)) {
      search.push(id.object);
    }
  }

  if (!map) ids = _.keys(ids);
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
