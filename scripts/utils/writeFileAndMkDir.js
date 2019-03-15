const fs = require("fs");
const path = require("path");

module.exports = function writeFileAndMkDir(file, content) {
  try {
    fs.mkdirSync(path.dirname(file));
  } catch (error) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }

  fs.writeFileSync(file, content);
};
