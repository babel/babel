var path = require("path");

module.exports = function (babel) {
  var t = babel.types;

  return new babel.Plugin("protect-internal-apis", {
    visitor: {
      Program: function (node, parent, scope, file) {
        if (file.opts.filename.indexOf("tools/protect") >= 0) return;
        if (file.opts.filename.indexOf("templates") >= 0) return;

        var from = "/" + path.dirname(file.opts.filename.replace(/^src/, "lib"));
        var to   = "/lib/babel/tools";

        var protectLoc = "./" + path.relative(from, to) + "/protect.js";

        this.unshiftContainer("body", [
          t.expressionStatement(t.callExpression(file.addImport(protectLoc), [t.identifier("module")]))
        ]);
      }
    }
  });
}
