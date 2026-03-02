module.exports = {
  plugins: [
    () => ({
      parserOverride: require("npm-babel-parser").parse,
    }),
  ],
};
