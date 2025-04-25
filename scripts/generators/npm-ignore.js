import { glob } from "glob";
import { repoRoot } from "$repo-utils";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const commonIgnore = [
  "src",
  "test",
  "*.log",
  "tsconfig.json",
  "tsconfig.tsbuildinfo",
];

const extraIgnore = {
  "babel-plugin-proposal-decorators": ["CONTRIB.md"],
  "babel-compat-data": ["build"],
};

const packages = glob
  .sync("./@(codemods|packages|eslint)/*", {
    cwd: repoRoot,
    absolute: true,
  })
  .filter(packageDir => {
    return existsSync(path.join(packageDir, "package.json"));
  });

for (const packageDir of packages) {
  const packageJson = JSON.parse(
    readFileSync(path.join(packageDir, "package.json"), "utf8")
  );

  if (packageJson.private || packageJson.files) {
    rmSync(path.join(packageDir, ".npmignore"), {
      force: true,
    });
    continue;
  }

  const name = path.basename(packageDir);
  const ignore = commonIgnore.concat(extraIgnore[name] || []);

  if (existsSync(path.join(packageDir, "scripts"))) {
    ignore.push("scripts");
  }

  writeFileSync(path.join(packageDir, ".npmignore"), ignore.join("\n") + "\n");
}
