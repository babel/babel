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
    opts ||= {};
    if (!is(node, opts)) {
      throw new Error(`Expected type ${JSON.stringify(type)} with option ${JSON.stringify(opts)}`);
    }
  };
}

export var STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
export var NATIVE_TYPE_NAMES       = ["Array", "Object", "Number", "Boolean", "Date", "Array", "String", "Promise", "Set", "Map", "WeakMap", "WeakSet", "Uint16Array", "ArrayBuffer", "DataView", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Uint32Array", "Int32Array", "Float32Array", "Int16Array", "Float64Array"];
export var FLATTENABLE_KEYS        = ["body", "expressions"];
export var FOR_INIT_KEYS           = ["left", "init"];
export var COMMENT_KEYS            = ["leadingComments", "trailingComments"];

export const VISITOR_KEYS = require("./visitor-keys");
export const BUILDER_KEYS = require("./builder-keys");
export const ALIAS_KEYS   = require("./alias-keys");

t.FLIPPED_ALIAS_KEYS = {};

each(t.VISITOR_KEYS, function (keys, type) {
  registerType(type, true);
});

each(t.ALIAS_KEYS, function (aliases, type) {
  each(aliases, function (alias) {
    var types = t.FLIPPED_ALIAS_KEYS[alias] ||= [];
    types.push(type);
  });
});

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

export function isType(nodeType, targetType) {
  if (nodeType === targetType) return true;

  var aliases = t.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) return aliases.indexOf(nodeType) > -1;

  return false;
}

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

/*
 * Description
 */

export function shallowEqual(actual: Object, expected: Object): boolean {
  var keys = Object.keys(expected);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (actual[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}

/**
 * Description
 */

export function appendToMemberExpression(member: Object, append: Object, computed?: boolean): Object {
  member.object   = t.memberExpression(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
}

/**
 * Description
 */

export function prependToMemberExpression(member: Object, append: Object): Object {
  member.object = t.memberExpression(append, member.object);
  return member;
}

/**
 * Description
 */

export function ensureBlock(node: Object, key: string = "body") {
  return node[key] = t.toBlock(node[key], node);
}

/**
 * Description
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
 * Description
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
}

/**
 * Description
 */

export function removeComments(child: Object): Object {
  each(COMMENT_KEYS, function (key) {
    delete child[key];
  });
  return child;
}

/**
 * Description
 */

export function inheritsComments(child: Object, parent: Object): Object {
  each(COMMENT_KEYS, function (key) {
    child[key]  = uniq(compact([].concat(child[key], parent[key])));
  });
  return child;
}

/**
 * Description
 */

export function inherits(child: Object, parent: Object): Object {
  child._declarations = parent._declarations;
  child._scopeInfo    = parent._scopeInfo;
  child.range         = parent.range;
  child.start         = parent.start;
  child.loc           = parent.loc;
  child.end           = parent.end;

  child.typeAnnotation = parent.typeAnnotation;
  child.returnType     = parent.returnType;

  t.inheritsComments(child, parent);
  return child;
}

toFastProperties(t);
toFastProperties(t.VISITOR_KEYS);

exports.__esModule = true;
assign(t, require("./retrievers"));
assign(t, require("./validators"));
assign(t, require("./converters"));
