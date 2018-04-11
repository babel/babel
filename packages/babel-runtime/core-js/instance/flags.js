var flags = require("core-js-pure/features/regexp/flags");

module.exports = function (it) {
  return (it instanceof RegExp && !('flags' in it)) ? flags(it) : it.flags;
};
