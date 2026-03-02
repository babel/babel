module.exports = function (babel) {
  const { types: t } = babel;

  return {
    visitor: {
      Program(path) {
        const { file } = this;
        const { sourceFileName } = file.opts.generatorOpts;

        // This injects the sourcesContent, though I don't imagine anyone's
        // doing it.
        file.code = {
            [sourceFileName]: file.code,
            'bar.js': '<bar />',
            'baz.js': 'baz();',
        };
      },

      CallExpression(path) {
        const callee = path.node;
        const { loc } = callee;

        // This filename will cause a second source file to be generated in the
        // output sourcemap.
        loc.filename = "bar.js";
        loc.start.column = 1;
        loc.end.column = 4;

        const node = t.stringLiteral('bar');
        node.loc = loc;
        path.replaceWith(node);
      },

      Function(path) {
        const callee = path.node;
        const { loc } = callee;

        // This filename will cause a second source file to be generated in the
        // output sourcemap.
        loc.filename = "baz.js";
        loc.start.column = 0;
        loc.start.line = 1;
        loc.end.column = 3;
        loc.end.line = 1;

        const node = t.stringLiteral('baz');
        node.loc = loc;
        path.replaceWith(node);
      },
    },
  };
};
