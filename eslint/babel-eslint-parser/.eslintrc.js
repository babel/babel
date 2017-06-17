module.exports = {
  root: true,
  extends: "babel",
  "plugins": [
    "prettier"
  ],
  rules: {
    "no-var": 0,
    "max-len": 0,
    "prettier/prettier": ["error", { "trailingComma": "es5" }],
  },
  env: {
    node: true,
    mocha: true
  }
};
