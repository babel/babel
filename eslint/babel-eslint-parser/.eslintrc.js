module.exports = {
  root: true,
  extends: "babel",
  "plugins": [
    "prettier"
  ],
  rules: {
    "no-var": 0,
    "max-len": 0,
    "prettier/prettier": "error",
  },
  env: {
    node: true,
    mocha: true
  }
};
