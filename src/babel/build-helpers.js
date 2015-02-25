var File = require("./transformation/file");
var util = require("./util");
var each = require("lodash/collection/each");
var t    = require("./types");

module.exports = function (body, namespace, whitelist = []) {
  each(File.helpers, function (name) {
    if (whitelist.length && whitelist.indexOf(name) == -1) return;

    var key = t.identifier(t.toIdentifier(name));
    body.push(t.expressionStatement(
      t.assignmentExpression("=", t.memberExpression(namespace, key), util.template(name))
    ));
  });
};
