// Until Jest supports native mjs, we must simulate it 🤷
module.exports = new Promise(resolve =>
  resolve({
    plugins: ["./plugin.mjs"]
  })
);

module.exports.__esModule = true;
