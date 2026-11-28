// Prints whether each package of a release is on npm, one line per package:
//
//   published	@babel/core@8.1.4
//   missing	@babel/parser@8.1.4
//
// The packages of a release are those that `yarn release-tool publish`
// publishes: the public packages whose package.json is modified in the
// release commit.
//
// Usage: node scripts/release-npm-status.ts <release commit or tag>
//
// This script only uses Node.js built-ins, so that the release workflow can
// run it without installing the dependencies.

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const MAX_ATTEMPTS = 3;
const CONCURRENCY = 8;

function git(...args: string[]) {
  // Not through a shell, where `^` is an escape character on Windows
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

function getReleasedPackages(commit: string) {
  const packages: { name: string; version: string }[] = [];
  const files = git(
    "diff",
    "--name-only",
    "-z",
    "--diff-filter=d",
    `${commit}^`,
    commit
  ).split("\0");
  for (const file of files) {
    if (file !== "package.json" && !file.endsWith("/package.json")) continue;
    const manifest = JSON.parse(git("show", `${commit}:${file}`));
    if (manifest.private) continue;
    packages.push({ name: manifest.name, version: manifest.version });
  }
  return packages;
}

async function isPublished(name: string, version: string) {
  const url = `https://registry.npmjs.org/${name}/${version}`;
  for (let attempt = 1; ; attempt++) {
    let failure;
    try {
      const response = await fetch(url, {
        method: "HEAD",
        signal: AbortSignal.timeout(30_000),
      });
      if (response.status === 200) return true;
      if (response.status === 404) return false;
      failure = `${response.status} ${response.statusText}`;
    } catch (error) {
      failure = String(error);
    }
    if (attempt === MAX_ATTEMPTS) {
      throw new Error(
        `Failed to look up ${name}@${version} on npm: ${failure}`
      );
    }
    await sleep(attempt * 2000);
  }
}

async function main(commit: string | undefined) {
  if (!commit) {
    throw new Error(
      "Usage: node scripts/release-npm-status.ts <release commit or tag>"
    );
  }

  const packages = getReleasedPackages(commit);
  if (packages.length === 0) {
    throw new Error(
      `${commit} does not modify the package.json of any public package`
    );
  }

  const lines: string[] = [];
  for (let i = 0; i < packages.length; i += CONCURRENCY) {
    const batch = packages.slice(i, i + CONCURRENCY);
    const published = await Promise.all(
      batch.map(({ name, version }) => isPublished(name, version))
    );
    batch.forEach(({ name, version }, j) => {
      lines.push(
        `${published[j] ? "published" : "missing"}\t${name}@${version}`
      );
    });
  }
  // Only once every lookup has succeeded, so that a failure prints no statuses
  writeFileSync(process.stdout.fd, lines.join("\n") + "\n");
}

try {
  await main(process.argv[2]);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
