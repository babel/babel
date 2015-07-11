import * as parsers from "./parsers";
import config from "./config";

export { config };

/**
 * Validate an option.
 */

export function validateOption(key, val, pipeline) {
  var opt = config[key];
  var parser = opt && parsers[opt.type];
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
  for (var key in options) {
    var val = options[key];
    if (val == null) continue;

    var opt = config[key];
    if (!opt) continue;

    var parser = parsers[opt.type];
    if (parser) val = parser(val);

    options[key] = val;
  }

  return options;
}
