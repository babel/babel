const fs = require("fs");

const recordFileName = `${__dirname}/updated.txt`;

/**
 *
 * @param {string} package The name of the package to remember.
 */
const justDone = async package => {
  fs.promises.appendFile(recordFileName, `${package}\n`);
};

const alreadyDone = fs
  .readFileSync(recordFileName, { encoding: "utf8", flag: "r" })
  .split("\n");

module.exports = { justDone, alreadyDone };
