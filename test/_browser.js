if (process.browser) {
  require("../lib/6to5/browser");
  require("./generation");
  require("./transformation");
  require("./traverse");
  require("./util");
}
