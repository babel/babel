const wait = t => new Promise(r => setTimeout(r, t));

module.exports = function plugin({ types: t }) {
  return {
    async post() {
      await wait(50);
      this.file.ast.program.body[0].value = "success"
    },

    visitor: {
      Program(path) {
        path.pushContainer("body", t.stringLiteral("failure"));
      },
    },
  };
};
