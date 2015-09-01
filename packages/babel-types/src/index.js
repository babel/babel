import toFastProperties from "to-fast-properties";
import compact from "lodash/array/compact";
import assign from "lodash/object/assign";
import each from "lodash/collection/each";
import uniq from "lodash/array/uniq";

var t = exports;

/**
 * Registers `is[Type]` and `assert[Type]` generated functions for a given `type`.
 * Pass `skipAliasCheck` to force it to directly compare `node.type` with `type`.
 */

function registerType(type: string, skipAliasCheck?: boolean) {
  var is = t[`is${type}`] = function (node, opts) {
    return t.is(type, node, opts, skipAliasCheck);
  };

  t[`assert${type}`] = function (node, opts) {
    opts = opts || {};
    if (!is(node, opts)) {
      throw new Error(`Expected type ${JSON.stringify(type)} with option ${JSON.stringify(opts)}`);
    }
  };
}

/**
 * Constants.
 */

export const STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
export const FLATTENABLE_KEYS        = ["body", "expressions"];
export const FOR_INIT_KEYS           = ["left", "init"];
export const COMMENT_KEYS            = ["leadingComments", "trailingComments", "innerComments"];

export const INHERIT_KEYS = {
  optional: ["typeAnnotation", "typeParameters", "returnType"],
  force: ["_scopeInfo", "_paths", "start", "loc", "end"]
};

export const BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="];
export const EQUALITY_BINARY_OPERATORS       = ["==", "===", "!=", "!=="];
export const COMPARISON_BINARY_OPERATORS     = EQUALITY_BINARY_OPERATORS.concat(["in", "instanceof"]);
export const BOOLEAN_BINARY_OPERATORS        = [].concat(COMPARISON_BINARY_OPERATORS, BOOLEAN_NUMBER_BINARY_OPERATORS);
export const NUMBER_BINARY_OPERATORS         = ["-", "/", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];

export const BOOLEAN_UNARY_OPERATORS = ["delete", "!"];
export const NUMBER_UNARY_OPERATORS  = ["+", "-", "++", "--", "~"];
export const STRING_UNARY_OPERATORS  = ["typeof"];

import "./definitions/init";
import { VISITOR_KEYS, ALIAS_KEYS, NODE_FIELDS, BUILDER_KEYS } from "./definitions";
export { VISITOR_KEYS, ALIAS_KEYS, NODE_FIELDS, BUILDER_KEYS };
export * as react from "./react";

/**
 * Registers `is[Type]` and `assert[Type]` for all types.
 */

each(t.VISITOR_KEYS, function (keys, type) {
  registerType(type, true);
});

/**
 * Flip `ALIAS_KEYS` for faster access in the reverse direction.
 */

t.FLIPPED_ALIAS_KEYS = {};

each(t.ALIAS_KEYS, function (aliases, type) {
  each(aliases, function (alias) {
    var types = t.FLIPPED_ALIAS_KEYS[alias] = t.FLIPPED_ALIAS_KEYS[alias] || [];
    types.push(type);
  });
});

/**
 * Registers `is[Alias]` and `assert[Alias]` functions for all aliases.
 */

each(t.FLIPPED_ALIAS_KEYS, function (types, type) {
  t[type.toUpperCase() + "_TYPES"] = types;
  registerType(type, false);
});

export const TYPES = Object.keys(t.VISITOR_KEYS).concat(Object.keys(t.FLIPPED_ALIAS_KEYS));

/**
 * Returns whether `node` is of given `type`.
 *
 * For better performance, use this instead of `is[Type]` when `type` is unknown.
 * Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.
 */

// @TODO should `skipAliasCheck` be removed?
/*eslint-disable no-unused-vars */
export function is(type: string, node: Object, opts?: Object, skipAliasCheck?: boolean): boolean {
  if (!node) return false;

  var matches = isType(node.type, type);
  if (!matches) return false;

  if (typeof opts === "undefined") {
    return true;
  } else {
    return t.shallowEqual(node, opts);
  }
}
/*eslint-enable no-unused-vars */

/**
 * Test if a `nodeType` is a `targetType` or if `targetType` is an alias of `nodeType`.
 */

export function isType(nodeType: string, targetType: string): boolean {
  if (nodeType === targetType) return true;

  var aliases = t.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) {
    if (aliases[0] === nodeType) return true;

    for (var alias of (aliases: Array)) {
      if (nodeType === alias) return true;
    }
  }

  return false;
}

each(t.BUILDER_KEYS, function (keys, type) {
  function builder() {
    var node = {};
    node.type = type;

    var i = 0;

    for (var key of (keys: Array)) {
      var field = t.NODE_FIELDS[type][key];

      var arg = arguments[i++];
      if (arg === undefined) arg = field.default;
      if (field.validate) field.validate(arg, key);

      node[key] = arg;
    }

    return node;
  }

  t[type] = builder;
  t[type[0].toLowerCase() + type.slice(1)] = builder;
});

/**
 * Description
 */

export function validate(key, parent, node) {
  var fields = t.NODE_FIELDS[parent.type];
  if (!fields) return;

  var field = fields[key];
  if (!field || !field.validate) return;

  field.validate(node, key);
}

/**
 * Test if an object is shallowly equal.
 */

export function shallowEqual(actual: Object, expected: Object): boolean {
  var keys = Object.keys(expected);

  for (var key of (keys: Array)) {
    if (actual[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}

/**
 * Append a node to a member expression.
 */

export function appendToMemberExpression(member: Object, append: Object, computed?: boolean): Object {
  member.object   = t.memberExpression(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
}

/**
 * Prepend a node to a member expression.
 */

export function prependToMemberExpression(member: Object, prepend: Object): Object {
  member.object = t.memberExpression(prepend, member.object);
  return member;
}

/**
 * Ensure the `key` (defaults to "body") of a `node` is a block.
 * Casting it to a block if it is not.
 */

export function ensureBlock(node: Object, key: string = "body") {
  return node[key] = t.toBlock(node[key], node);
}

/**
 * Create a shallow clone of a `node` excluding `_private` properties.
 */

export function clone(node: Object): Object {
  var newNode = {};
  for (var key in node) {
    if (key[0] === "_") continue;
    newNode[key] = node[key];
  }
  return newNode;
}

/**
 * Create a deep clone of a `node` and all of it's child nodes
 * exluding `_private` properties.
 */

export function cloneDeep(node: Object): Object {
  var newNode = {};

  for (var key in node) {
    if (key[0] === "_") continue;

    var val = node[key];

    if (val) {
      if (val.type) {
        val = t.cloneDeep(val);
      } else if (Array.isArray(val)) {
        val = val.map(t.cloneDeep);
      }
    }

    newNode[key] = val;
  }

  return newNode;
}

/**
 * Build a function that when called will return whether or not the
 * input `node` `MemberExpression` matches the input `match`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */

export function buildMatchMemberExpression(match:string, allowPartial?: boolean): Function {
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
      } else if (t.isStringLiteral(node)) {
        // this part doesn't match
        if (parts[i] !== node.value) return false;
      } else if (t.isMemberExpression(node)) {
        if (node.computed && !t.isStringLiteral(node.property)) {
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
}

/**
 * Remove comment properties from a node.
 */

export function removeComments(node: Object): Object {
  for (var key of (COMMENT_KEYS: Array)) {
    delete node[key];
  }
  return node;
}

/**
 * Inherit all unique comments from `parent` node to `child` node.
 */

export function inheritsComments(child: Object, parent: Object): Object {
  inheritTrailingComments(child, parent);
  inheritLeadingComments(child, parent);
  inheritInnerComments(child, parent);
  return child;
}

export function inheritTrailingComments(child, parent) {
  _inheritComments("trailingComments", child, parent);
}

export function inheritLeadingComments(child, parent) {
  _inheritComments("leadingComments", child, parent);
}

export function inheritInnerComments(child, parent) {
  _inheritComments("innerComments", child, parent);
}

function _inheritComments(key, child, parent) {
  if (child && parent) {
    child[key] = uniq(compact([].concat(child[key], parent[key])));
  }
}

/**
 * Inherit all contextual properties from `parent` node to `child` node.
 */

export function inherits(child: Object, parent: Object): Object {
  if (!child || !parent) return child;

  for (let key of (t.INHERIT_KEYS.optional: Array)) {
    if (child[key] == null) {
      child[key] = parent[key];
    }
  }

  for (let key of (t.INHERIT_KEYS.force: Array)) {
    child[key] = parent[key];
  }

  t.inheritsComments(child, parent);

  return child;
}

/**
 * Description
 */

export function directive(value) {
  return t.expressionStatement(t.literal(value));
}

// Optimize property access.
toFastProperties(t);
toFastProperties(t.VISITOR_KEYS);

// Export all type checkers from other files.
assign(t, require("./retrievers"));
assign(t, require("./validators"));
assign(t, require("./converters"));
assign(t, require("./flow"));
