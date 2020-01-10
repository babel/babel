// Until Jest supports native mjs, we must simulate it 🤷

module.exports = new Promise(resolve => resolve({
  default: function () {
    throw new Error("Babelrc threw an error");
  }
}));
module.exports.__esModule = true;
