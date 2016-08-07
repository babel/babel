import toFastProperties from "to-fast-properties";
import compact from "lodash.compact";
import loClone from "lodash.clone";
import each from "lodash.foreach";
import uniq from "lodash.uniq";

let t = exports;

/**
 * Registers `is[Type]` and `assert[Type]` generated functions for a given `type`.
 * Pass `skipAliasCheck` to force it to directly compare `node.type` with `type`.
 */

function registerType(type: string) {
  let is = t[`is${type}`];
  if (!is) {
    is = t[`is${type}`] = function (node, opts) {
      return t.is(type, node, opts);
    };
  }

  t[`assert${type}`] = function (node, opts) {
    opts = opts || {};
    if (!is(node, opts)) {
      throw new Error(`Expected type ${JSON.stringify(type)} with option ${JSON.stringify(opts)}`);
    }
  };
}

//

export {
  STATEMENT_OR_BLOCK_KEYS,
  FLATTENABLE_KEYS,
  FOR_INIT_KEYS,
  COMMENT_KEYS,
  LOGICAL_OPERATORS,
  UPDATE_OPERATORS,
  BOOLEAN_NUMBER_BINARY_OPERATORS,
  EQUALITY_BINARY_OPERATORS,
  COMPARISON_BINARY_OPERATORS,
  BOOLEAN_BINARY_OPERATORS,
  NUMBER_BINARY_OPERATORS,
  BINARY_OPERATORS,
  BOOLEAN_UNARY_OPERATORS,
  NUMBER_UNARY_OPERATORS,
  STRING_UNARY_OPERATORS,
  UNARY_OPERATORS,
  INHERIT_KEYS,
  BLOCK_SCOPED_SYMBOL,
  NOT_LOCAL_BINDING
} from "./constants";

import "./definitions/init";
import { VISITOR_KEYS, ALIAS_KEYS, NODE_FIELDS, BUILDER_KEYS, DEPRECATED_KEYS } from "./definitions";
export { VISITOR_KEYS, ALIAS_KEYS, NODE_FIELDS, BUILDER_KEYS, DEPRECATED_KEYS };

import * as _react from "./react";
export { _react as react };

/**
 * Registers `is[Type]` and `assert[Type]` for all types.
 */

for (let type in t.VISITOR_KEYS) {
  registerType(type);
}

/**
 * Flip `ALIAS_KEYS` for faster access in the reverse direction.
 */

t.FLIPPED_ALIAS_KEYS = {};

each(t.ALIAS_KEYS, function (aliases, type) {
  each(aliases, function (alias) {
    let types = t.FLIPPED_ALIAS_KEYS[alias] = t.FLIPPED_ALIAS_KEYS[alias] || [];
    types.push(type);
  });
});

/**
 * Registers `is[Alias]` and `assert[Alias]` functions for all aliases.
 */

each(t.FLIPPED_ALIAS_KEYS, function (types, type) {
  t[type.toUpperCase() + "_TYPES"] = types;
  registerType(type);
});

export const TYPES = Object.keys(t.VISITOR_KEYS)
  .concat(Object.keys(t.FLIPPED_ALIAS_KEYS))
  .concat(Object.keys(t.DEPRECATED_KEYS));

/**
 * Returns whether `node` is of given `type`.
 *
 * For better performance, use this instead of `is[Type]` when `type` is unknown.
 * Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.
 */

export function is(type: string, node: Object, opts?: Object): boolean {
  if (!node) return false;

  let matches = isType(node.type, type);
  if (!matches) return false;

  if (typeof opts === "undefined") {
    return true;
  } else {
    return t.shallowEqual(node, opts);
  }
}

/**
 * Test if a `nodeType` is a `targetType` or if `targetType` is an alias of `nodeType`.
 */

export function isType(nodeType: string, targetType: string): boolean {
  if (nodeType === targetType) return true;

  // This is a fast-path. If the test above failed, but an alias key is found, then the
  // targetType was a primary node type, so there's no need to check the aliases.
  if (t.ALIAS_KEYS[targetType]) return false;

  let aliases: ?Array<string> = t.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) {
    if (aliases[0] === nodeType) return true;

    for (let alias of aliases) {
      if (nodeType === alias) return true;
    }
  }

  return false;
}

/**
 * Description
 */

each(t.BUILDER_KEYS, function (keys, type) {
  function builder() {
    if (arguments.length > keys.length) {
      throw new Error(
        `t.${type}: Too many arguments passed. Received ${arguments.length} but can receive ` +
        `no more than ${keys.length}`
      );
    }

    let node = {};
    node.type = type;

    let i = 0;

    for (let key of (keys: Array<string>)) {
      let field = t.NODE_FIELDS[type][key];

      let arg = arguments[i++];
      if (arg === undefined) arg = loClone(field.default);

      node[key] = arg;
    }

    for (let key in node) {
      validate(node, key, node[key]);
    }

    return node;
  }

  t[type] = builder;
  t[type[0].toLowerCase() + type.slice(1)] = builder;
});

/**
 * Description
 */

for (let type in t.DEPRECATED_KEYS) {
  let newType = t.DEPRECATED_KEYS[type];

  function proxy(fn) {
    return function () {
      console.trace(`The node type ${type} has been renamed to ${newType}`);
      return fn.apply(this, arguments);
    };
  }

  t[type] = t[type[0].toLowerCase() + type.slice(1)] = proxy(t[newType]);
  t[`is${type}`] = proxy(t[`is${newType}`]);
  t[`assert${type}`] = proxy(t[`assert${newType}`]);
}

/**
 * Description
 */

export function validate(node?: Object, key: string, val: any) {
  if (!node) return;

  let fields = t.NODE_FIELDS[node.type];
  if (!fields) return;

  let field = fields[key];
  if (!field || !field.validate) return;
  if (field.optional && val == null) return;

  field.validate(node, key, val);
}

/**
 * Test if an object is shallowly equal.
 */

export function shallowEqual(actual: Object, expected: Object): boolean {
  let keys = Object.keys(expected);

  for (let key of (keys: Array<string>)) {
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

export function ensureBlock(node: Object, key: string = "body"): Object {
  return node[key] = t.toBlock(node[key], node);
}

/**
 * Create a shallow clone of a `node` excluding `_private` properties.
 */

export function clone(node: Object): Object {
  let newNode = {};
  for (let key in node) {
    if (key[0] === "_") continue;
    newNode[key] = node[key];
  }
  return newNode;
}

/**
 * Create a shallow clone of a `node` excluding `_private` and location properties.
 */

export function cloneWithoutLoc(node: Object): Object {
  let newNode = clone(node);
  delete newNode.loc;
  return newNode;
}

/**
 * Create a deep clone of a `node` and all of it's child nodes
 * exluding `_private` properties.
 */

export function cloneDeep(node: Object): Object {
  let newNode = {};

  for (let key in node) {
    if (key[0] === "_") continue;

    let val = node[key];

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
  let parts = match.split(".");

  return function (member) {
    // not a member expression
    if (!t.isMemberExpression(member)) return false;

    let search = [member];
    let i = 0;

    while (search.length) {
      let node = search.shift();

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
  for (let key of t.COMMENT_KEYS) {
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

export function inheritTrailingComments(child: Object, parent: Object) {
  _inheritComments("trailingComments", child, parent);
}

export function inheritLeadingComments(child: Object, parent: Object) {
  _inheritComments("leadingComments", child, parent);
}

export function inheritInnerComments(child: Object, parent: Object) {
  _inheritComments("innerComments", child, parent);
}

function _inheritComments(key, child, parent) {
  if (child && parent) {
    child[key] = uniq(compact([].concat(child[key], parent[key])));
  }
}

// Can't use import because of cyclic dependency between babel-traverse
// and this module (babel-types). This require needs to appear after
// we export the TYPES constant, so we lazy-initialize it before use.
let traverse;

/**
 * Inherit all contextual properties from `parent` node to `child` node.
 */

export function inherits(child: Object, parent: Object): Object {
  if (!traverse) traverse = require("babel-traverse").default;

  if (!child || !parent) return child;

  // optionally inherit specific properties if not null
  for (let key of (t.INHERIT_KEYS.optional: Array<string>)) {
    if (child[key] == null) {
      child[key] = parent[key];
    }
  }

  // force inherit "private" properties
  for (let key in parent) {
    if (key[0] === "_") child[key] = parent[key];
  }

  // force inherit select properties
  for (let key of (t.INHERIT_KEYS.force: Array<string>)) {
    child[key] = parent[key];
  }

  t.inheritsComments(child, parent);
  traverse.copyCache(parent, child);

  return child;
}

/**
 * TODO
 */

export function assertNode(node?) {
  if (!isNode(node)) {
    // $FlowFixMe
    throw new TypeError("Not a valid node " + (node && node.type));
  }
}

/**
 * TODO
 */

export function isNode(node?): boolean {
  return !!(node && VISITOR_KEYS[node.type]);
}

// Optimize property access.
toFastProperties(t);
toFastProperties(t.VISITOR_KEYS);

//
export {
  getBindingIdentifiers,
  getOuterBindingIdentifiers
} from "./retrievers";

export {
  isBinding,
  isReferenced,
  isValidIdentifier,
  isLet,
  isBlockScoped,
  isVar,
  isSpecifierDefault,
  isScope,
  isImmutable
} from "./validators";

export {
  toComputedKey,
  toSequenceExpression,
  toKeyAlias,
  toIdentifier,
  toBindingIdentifierName,
  toStatement,
  toExpression,
  toBlock,
  valueToNode
} from "./converters";

export {
  createUnionTypeAnnotation,
  removeTypeDuplicates,
  createTypeAnnotationBasedOnTypeof
} from "./flow";
