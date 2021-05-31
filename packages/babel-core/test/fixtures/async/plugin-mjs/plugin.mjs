// Until Jest supports native mjs, we must simulate it 🤷
module.exports = new Promise(resolve =>
  resolve({
    default: function plugin({ types: t }) {
      return {
        visitor: {
          Program(path) {
            path.pushContainer("body", t.stringLiteral("success"));
          },
        },
      };
    },
  })
);

module.exports.__esModule = true;
