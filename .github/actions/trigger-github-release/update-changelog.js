"use strict";

const getStdin = require("get-stdin");
const fs = require("fs").promises;
const path = require("path");

const { GITHUB_WORKSPACE } = process.env;

const INSERTION_POINT = "<!-- insert-new-changelog-here -->";
const CHANGELOG = path.resolve(GITHUB_WORKSPACE, "CHANGELOG.md");

main();
async function main() {
  let [stdin, changelog] = await Promise.all([
    getStdin(),
    fs.readFile(CHANGELOG, "utf8"),
  ]);

  if (!changelog.includes(INSERTION_POINT)) {
    throw new Error(`Missing "${INSERTION_POINT}" in CHANGELOG.md`);
  }

  // Remove committers
  stdin = stdin.split("\n\n#### Committers")[0];
  changelog = changelog.replace(
    INSERTION_POINT,
    INSERTION_POINT + "\n" + stdin
  );

  await fs.writeFile(CHANGELOG, changelog);
}
