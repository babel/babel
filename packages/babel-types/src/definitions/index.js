export var VISITOR_KEYS = {};
export var ALIAS_KEYS = {};
export var BUILDER_KEYS = {};

function builderFromArray(arr) {
  var builder = {};
  for (var key of (arr: Array)) builder[key] = null;
  return builder;
}

export default function define(type, opts = {}) {
  opts.visitor = opts.visitor || [];
  opts.aliases = opts.aliases || [];

  if (!opts.builder) opts.builder = builderFromArray(opts.visitor);
  if (Array.isArray(opts.builder)) opts.builder = builderFromArray(opts.builder);

  VISITOR_KEYS[type] = opts.visitor;
  ALIAS_KEYS[type] = opts.aliases;
  BUILDER_KEYS[type] = opts.builder;
}
