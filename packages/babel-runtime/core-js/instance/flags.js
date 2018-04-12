var flags = require("core-js-pure/features/regexp/flags");
var RegExpPrototype = RegExp.prototype;

module.exports = function (it) {
  return (it === RegExpPrototype || it instanceof RegExp) && !('flags' in it) ? flags(it) : it.flags;
};
