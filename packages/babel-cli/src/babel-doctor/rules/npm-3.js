import binVersionCheck from "bin-version-check";
import chalk from "chalk";

export default function () {
  return new Promise(function (resolve) {
    binVersionCheck("npm", ">=3.3.0", function (err) {
      if (err) {
        resolve([false, `Your npm version is outdated. Upgrade to the latest version by running:\n$ ${chalk.magenta("npm install -g npm")}`]);
      } else {
        resolve([true, "You're on npm >=3.3.0"]);
      }
    });
  });
}
