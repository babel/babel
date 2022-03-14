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
            'test.js': '<bar />',
        };
      },

      CallExpression(path) {
        const callee = path.node;
        const { loc } = callee;

        // This filename will cause a second source file to be generated in the
        // output sourcemap.
        loc.filename = "test.js";
        loc.start.column = 1;
        loc.end.column = 4;

        const node = t.stringLiteral('bar');
        node.loc = loc;
        path.replaceWith(node);
      },

      Function(path) {
        path.remove();
      },
    },
  };
};
