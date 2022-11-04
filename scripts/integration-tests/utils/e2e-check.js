import fs from "fs";

const resp = await fetch(
  "https://raw.githubusercontent.com/babel/babel/main/package.json"
);
const mainRepoPackageJson = await resp.json();

if (
  mainRepoPackageJson.version !==
  JSON.parse(fs.readFileSync("package.json")).version
) {
  if (process.env.GITHUB_REPOSITORY === "babel/babel") {
    console.error("The branch is not up to date with main, please rebase");
    process.exitCode = 1;
  } else {
    console.error(
      "The branch is not up to date with main of babel/babel, skipping"
    );
    process.exitCode = 10;
  }
}
