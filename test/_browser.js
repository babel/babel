if (process.browser) {
  require("../lib/6to5/api/browser");
  require("./generation");
  require("./transformation");
  require("./traverse");
  require("./util");
}
