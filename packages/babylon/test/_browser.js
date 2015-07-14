if (process.browser) {
  require("./tests");
  require("./tests-jsx");
  require("./tests-harmony");
  require("./tests-flow");
  require("./tests-babel");
}
