require("./_util").updateMain("lib/index.js");
require("fs").unlinkSync(__dirname + "/../index.js");
