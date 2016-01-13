import binVersionCheck from "bin-version-check";
import chalk from "chalk";

export default function () {
  return new Promise(function (resolve) {
    binVersionCheck("npm", ">=3.3.0", function (err) {
      if (err) {
        let message = `Your npm version is outdated. Upgrade to the latest version by running:\n$ ${chalk.magenta("npm install -g npm")}.`;
        if (process.platform === "win32") {
          message += ` See this guide if you are having trouble upgrading: ${chalk.underline.blue("https://github.com/npm/npm/wiki/Troubleshooting#upgrading-on-windows")}`;
        }
        resolve([false, message]);
      } else {
        resolve([true, "You're on npm >=3.3.0"]);
      }
    });
  });
};
