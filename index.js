var path = require("path"
  );
var isCli = module.parent.filename.indexOf(path.sep + "babel" + path.sep) >= 0;

if (!isCli && module.parent.filename !== __filename) {
  try {
    module.exports = require("babel/node_modules/babel-core");
    return;
  } catch (err) {
    if (err.code !== "MODULE_NOT_FOUND") {
      throw err;
    }
  }
}

module.exports = require("./lib/babel/api/node.js");
