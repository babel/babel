if (process.browser) {
  require("../../lib/babel/api/browser");
  require("./generation");
  require("./transformation");
  require("./traverse");
  require("./util");
}
