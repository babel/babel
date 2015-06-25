module.exports = function (babel) {
  var t = babel.types;

  return new babel.Plugin("protect-internal-apis", {
    visitor: {
      Program: function (node, parent, scope, file) {
        if (file.opts.filename.indexOf("tools/protect") >= 0) return;
        if (file.opts.filename.indexOf("templates") >= 0) return;

        this.unshiftContainer("body", [
          t.expressionStatement(t.callExpression(file.addImport("babel-core/lib/babel/tools/protect"), [t.identifier("module")]))
        ]);
      }
    }
  });
}
