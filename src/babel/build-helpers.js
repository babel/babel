import File from "./transformation/file";
import * as util from  "./util";
import each from "lodash/collection/each";
import t from "./types";

export default function (body, namespace, whitelist = []) {
  each(File.helpers, function (name) {
    if (whitelist.length && whitelist.indexOf(name) === -1) return;

    var key = t.identifier(t.toIdentifier(name));
    body.push(t.expressionStatement(
      t.assignmentExpression("=", t.memberExpression(namespace, key), util.template(name))
    ));
  });
};
