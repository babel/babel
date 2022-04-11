module.exports = function(api) {
  api.env();

  return {
    plugins: [
      require("./plugin"),
    ],
  };
}
