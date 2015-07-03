import includes from "lodash/collection/includes";

/**
 * [Please add a description.]
 */

export function internal(transformer, opts) {
  if (transformer.key[0] === "_") return true;
}

/**
 * [Please add a description.]
 */

export function blacklist(transformer, opts) {
  var blacklist = opts.blacklist;
  if (blacklist.length && includes(blacklist, transformer.key)) return false;
}

/**
 * [Please add a description.]
 */

export function whitelist(transformer, opts) {
  var whitelist = opts.whitelist;
  if (whitelist) return includes(whitelist, transformer.key);
}

/**
 * [Please add a description.]
 */

export function stage(transformer, opts) {
  var stage = transformer.metadata.stage;
  if (stage != null && stage >= opts.stage) return true;
}

/**
 * [Please add a description.]
 */

export function optional(transformer, opts) {
  if (transformer.metadata.optional && !includes(opts.optional, transformer.key)) return false;
}
