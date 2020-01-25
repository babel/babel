// Until Jest supports native mjs, we must simulate it 🤷

module.exports = new Promise(resolve => resolve({
  default: {
    comments: true
  }
}));
module.exports.__esModule = true;
