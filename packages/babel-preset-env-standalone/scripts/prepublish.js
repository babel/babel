// This file is executed by lerna before publishing,
// @babel/preset-env-standalone so that it has the
// new version and not the old one.

require("child_process").execSync(
  "make prepublish-build-preset-env-standalone",
  {
    cwd: require("path").resolve(__dirname, "../../.."),
    stdio: "inherit",
  }
);
