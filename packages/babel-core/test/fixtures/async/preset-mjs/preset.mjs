// Until Jest supports native mjs, we must simulate it 🤷
module.exports = new Promise(resolve =>
  resolve({
    default: () => ({
      plugins: ["./plugin.mjs"]
    })
  })
);

module.exports.__esModule = true;
