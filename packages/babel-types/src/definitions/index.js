import * as t from "../index";

export var VISITOR_KEYS = {};
export var ALIAS_KEYS = {};
export var NODE_FIELDS = {};
export var BUILDER_KEYS = {};

export function assertContains(vals) {
  return function (val, key) {
    if (vals.indexOf(val) < 0) {
      throw new TypeError(`Property ${key} with the value of ${val} expected to be one of ${JSON.stringify(vals)}`);
    }
  };
}

export function assertNodeType(...types) {
  return function (node, key) {
    var valid = false;

    for (var type of types) {
      if (t.is(type, node)) {
        valid = true;
        break;
      }
    }

    if (!valid) {
      throw new TypeError(`Property ${key} expected node to be of a type ${JSON.stringify(types)} but instead got ${node && node.type}`);
    }
  };
}

export function assertValueType(type) {
  return function (val, key) {
    var valid = typeof val === type;
    if (type === "array" && Array.isArray(val)) valid = true;

    if (!valid) {
      throw new TypeError(`Property ${key} expected type of ${type} but got ${typeof val}`);
    }
  };
}

export default function define(type, opts = {}) {
  opts.fields  = opts.fields || {};
  opts.visitor = opts.visitor || [];
  opts.aliases = opts.aliases || [];
  opts.builder = opts.builder || opts.visitor || [];

  // ensure all field keys are represented in `fields`
  for (let key of (opts.visitor.concat(opts.builder): Array)) {
    opts.fields[key] = opts.fields[key] || {};
  }

  for (let key in opts.fields) {
    var field = opts.fields[key];

    if (field.default === undefined) {
      field.default = null;
    }
  }

  VISITOR_KEYS[type] = opts.visitor;
  BUILDER_KEYS[type] = opts.builder;
  NODE_FIELDS[type]  = opts.fields;
  ALIAS_KEYS[type]   = opts.aliases;
}
