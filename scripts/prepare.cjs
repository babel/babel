const { existsSync, readFileSync, writeFileSync } = require("fs");
const isCI = require("is-ci");
const husky = require("husky");

if (!isCI) {
  if (!existsSync(".husky/_/husky.sh")) {
    husky.install();
  }

  if (!existsSync(".vscode/settings.json")) {
    writeFileSync(
      ".vscode/settings.json",
      readFileSync(".vscode/settings.example.json")
    );
  }
}
