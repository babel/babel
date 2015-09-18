import * as parsers from "./parsers";
import config from "./config";

export { config };

/**
 * Validate an option.
 */

export function validateOption(key, val, pipeline) {
  let opt = config[key];
  let parser = opt && parsers[opt.type];
  if (parser && parser.validate) {
    return parser.validate(key, val, pipeline);
  } else {
    return val;
  }
}

/**
 * Normalize all options.
 */

export function normaliseOptions(options = {}) {
  for (let key in options) {
    let val = options[key];
    if (val == null) continue;

    let opt = config[key];
    if (!opt) continue;

    let parser = parsers[opt.type];
    if (parser) val = parser(val);

    options[key] = val;
  }

  return options;
}
