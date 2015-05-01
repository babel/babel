import includes from "lodash/collection/includes";

export function internal(transformer, opts) {
  if (transformer.key[0] === "_") return true;
}

export function blacklist(transformer, opts) {
  var blacklist = opts.blacklist;
  if (blacklist.length && includes(blacklist, transformer.key)) return false;
}

export function whitelist(transformer, opts) {
  var whitelist = opts.whitelist;
  if (whitelist) return includes(whitelist, transformer.key);
}

export function stage(transformer, opts) {
  var stage = transformer.metadata.stage;
  if (stage != null && stage >= opts.stage) return true;
}

export function optional(transformer, opts) {
  if (transformer.metadata.optional && !includes(opts.optional, transformer.key)) return false;
}
