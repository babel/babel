module.exports = {
  root: true,
  extends: "babel",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  },
  rules: {
    "no-var": 0,
    "max-len": 0
  },
  env: {
    node: true,
    mocha: true
  }
};
