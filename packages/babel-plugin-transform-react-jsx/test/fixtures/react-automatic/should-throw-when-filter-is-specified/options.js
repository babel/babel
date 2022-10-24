module.exports = {
  BABEL_8_BREAKING: true,
  throws:
    '@babel/plugin-transform-react-jsx: "filter" option can not be used with automatic runtime. If you are upgrading from Babel 7, please specify `runtime: "classic"`.',
  plugins: [
    [
      "transform-react-jsx",
      { runtime: "automatic", filter: (node, file) => true },
    ],
  ],
};
