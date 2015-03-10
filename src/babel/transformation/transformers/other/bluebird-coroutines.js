import remapAsyncToGenerator from "../../helpers/remap-async-to-generator";
import * as t from "../../../types";

export function manipulateOptions(opts) {
  opts.experimental = true;
  opts.blacklist.push("regenerator");
}

export var optional = true;

exports.Function = function (node, parent, scope, file) {
  if (!node.async || node.generator) return;

  return remapAsyncToGenerator(
    node,
    t.memberExpression(file.addImport("bluebird", null, true), t.identifier("coroutine")),
    scope
  );
};
