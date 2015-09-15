import * as t from "../index";

export var VISITOR_KEYS = {};
export var ALIAS_KEYS = {};
export var NODE_FIELDS = {};
export var BUILDER_KEYS = {};

function getType(val) {
  if (Array.isArray(val)) {
    return "array";
  } else if (val === null) {
    return "null";
  } else if (val === undefined) {
    return "undefined";
  } else {
    return typeof val;
  }
}

export function assertContains(vals) {
  return function (val, key) {
    if (vals.indexOf(val) < 0) {
      throw new TypeError(`Property ${key} with the value of ${JSON.stringify(val)} expected to be one of ${JSON.stringify(vals)}`);
    }
  };
}

export function assertEach(callback) {
  return function (node, key, val) {
    if (!Array.isArray(val)) return;

    for (var i = 0; i < val.length; i++) {
      callback(node, `${key}[${i}]`, val[i]);
    }
  };
}

export function assertOneOf(...vals) {
  return function (node, key, val) {
    if (vals.indexOf(val) < 0) {
      throw new TypeError(`Property ${key} expected value to be one of ${JSON.stringify(vals)} but got ${JSON.stringify(val)}`);
    }
  };
}

export function assertNodeType(...types) {
  return function (node, key, val) {
    var valid = false;

    for (var type of types) {
      if (t.is(type, val)) {
        valid = true;
        break;
      }
    }

    if (!valid) {
      throw new TypeError(`Property ${key} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(val && val.type)}`);
    }
  };
}

export function assertValueType(type) {
  return function (node, key, val) {
    var valid = getType(val) === type;

    if (!valid) {
      console.log(type, key, val);
      throw new TypeError(`Property ${key} expected type of ${type} but got ${getType(val)}`);
    }
  };
}

export function chain(...fns) {
  return function (...args) {
    for (var fn of fns) {
      fn(...args);
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
