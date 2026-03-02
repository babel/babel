const wait = t => new Promise(r => setTimeout(r, t));

module.exports = async function preset(api) {
  await wait(50);

  return {
    plugins: [require("./plugin")],
  };
};
