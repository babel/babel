import { existsSync, readFileSync, writeFileSync } from "fs";
import isCI from "is-ci";
import husky from "husky";

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
