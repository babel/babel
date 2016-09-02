module.exports = {
  plugins: [
    require("babel-plugin-transform-react-jsx"),
    require("babel-plugin-transform-flow-strip-types"),
    require("babel-plugin-syntax-flow"),
    require("babel-plugin-syntax-jsx"),
    require("babel-plugin-transform-react-display-name"),
  ],
  env: {
    development: {
      plugins: [
        // require("babel-plugin-transform-react-jsx-source"),
        // require("babel-plugin-transform-react-jsx-self")
      ]
    }
  }
};
