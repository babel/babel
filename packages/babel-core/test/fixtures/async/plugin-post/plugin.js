const wait = t => new Promise(r => setTimeout(r, t));

module.exports = function plugin({ types: t }) {
  return {
    async post() {
      await wait(50);
    },

    visitor: {
      Program(path) {
        path.pushContainer("body", t.stringLiteral("success"));
      },
    },
  };
};
