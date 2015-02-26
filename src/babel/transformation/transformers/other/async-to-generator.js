import remapAsyncToGenerator from "../../helpers/remap-async-to-generator";

export { manipulateOptions } from "./bluebird-coroutines";

export var optional = true;

exports.Function = function (node, parent, scope, file) {
  if (!node.async || node.generator) return;

  return remapAsyncToGenerator(node, file.addHelper("async-to-generator"), scope);
};
