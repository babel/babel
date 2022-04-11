const wait = t => new Promise(r => setTimeout(r, t));

module.exports = async function plugin({ types: t }) {
  await wait(50);

  return {
    visitor: {
      Program(path) {
        path.pushContainer("body", t.stringLiteral("success 2"));
      },
    },
  };
};
