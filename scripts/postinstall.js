import { existsSync, copyFileSync } from "fs";
import isCI from "is-ci";
import husky from "husky";

if (!isCI) {
  if (!existsSync(".husky/_/husky.sh")) {
    husky.install();
  }

  if (!existsSync(".vscode/settings.json")) {
    copyFileSync(".vscode/settings.example.json", ".vscode/settings.json");
  }
}
