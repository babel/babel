const wait = t => new Promise(r => setTimeout(r, t));

// "Dynamic import"
const import_ = path => Promise.resolve(require(path));

module.exports = function preset(api) {
  return {
    plugins: [import_("./plugin")],
  };
};
