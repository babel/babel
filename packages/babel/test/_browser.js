if (process.browser) {
  require("../lib/api/browser");
  require("./generation");
  require("./transformation");
  require("./traverse");
  require("./util");
}
