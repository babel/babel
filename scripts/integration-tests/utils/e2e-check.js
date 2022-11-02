/* eslint-disable no-process-exit */
import fs from "fs";
import fetch from "node-fetch";
import github from "@actions/github";

const { repo } = github.context;

const resp = await fetch(
  "https://raw.githubusercontent.com/babel/babel/main/package.json"
);
const mainRepoPackageJson = await resp.json();

if (
  mainRepoPackageJson.version !==
  JSON.parse(fs.readFileSync("package.json")).version
) {
  if (repo.owner === "babel" && repo.repo === "babel") {
    console.error("The branch is not up to date with main, please rebase");
    process.exit(1);
  } else {
    console.error(
      "The branch is not up to date with main of babel/babel, skipping"
    );
    process.exit(10);
  }
}
