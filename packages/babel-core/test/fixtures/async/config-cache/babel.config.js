const wait = t => new Promise(r => setTimeout(r, t));

module.exports = function(api) {
  api.cache.using(async () => {
    await wait(50);
    return 2;
  })

  return {
    plugins: ["./plugin"],
  };
};
