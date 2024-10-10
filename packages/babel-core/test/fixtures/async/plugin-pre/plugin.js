const wait = t => new Promise(r => setTimeout(r, t));

module.exports = function plugin({ types: t }) {
  let value = "failure";

  return {
    async pre() {
      await wait(50);
      value = "success";
    },

    visitor: {
      Program(path) {
        path.pushContainer("body", t.stringLiteral(value));
      },
    },
  };
};
