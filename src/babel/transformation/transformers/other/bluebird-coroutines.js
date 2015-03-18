import remapAsyncToGenerator from "../../helpers/remap-async-to-generator";
import * as t from "../../../types";

export function manipulateOptions(opts) {
  opts.optional.push("es7.asyncFunctions");
  opts.blacklist.push("regenerator");
}

export var metadata = {
  optional: true
};

exports.Function = function (node, parent, scope, file) {
  if (!node.async || node.generator) return;

  return remapAsyncToGenerator(
    node,
    t.memberExpression(file.addImport("bluebird", null, true), t.identifier("coroutine")),
    scope
  );
};
