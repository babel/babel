// Runs node.cjs on many Node.js versions in parallel. GitHub Actions runs steps
// sequentially, so this can't be done with one setup-node step per version.
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createWriteStream } from "node:fs";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { setTimeout as delay } from "node:timers/promises";

const DIST = "https://nodejs.org/dist";
const SCRIPT = path.join(import.meta.dirname, "node.cjs");
const IS_WINDOWS = process.platform === "win32";
const NODE_BINARY = IS_WINDOWS ? "node.exe" : "node";

const VERSIONS = [
  "10",
  "12.0",
  "12.12",
  "12.13",
  "12.15",
  "12.16",
  "13.2",
  "13.6",
  "13.7",
  "14.2",
  "16.5",
  "16.6",
  "22.11",
  "22.12",
  "23.10",
];

const versions = process.argv.length > 2 ? process.argv.slice(2) : VERSIONS;

const root = await mkdtemp(path.join(os.tmpdir(), "babel-runtime-node-"));
const releases = await retry(async () =>
  (await download(`${DIST}/index.json`)).json()
);

const results = await Promise.all(
  versions.map(async spec => {
    try {
      const version = resolve(spec);
      const dir = await install(version);
      return { spec, version, ...(await test(dir)) };
    } catch (error) {
      return { spec, version: spec, ok: false, output: String(error) };
    }
  })
);

// On Windows, a binary that just exited can stay locked for a moment.
await rm(root, { recursive: true, force: true, maxRetries: 3 });

for (const { version, output } of results) {
  console.log(`=== Node.js ${version} ===\n${output}`);
}

const failed = results.filter(result => !result.ok);
if (failed.length > 0) {
  console.error(`FAILED on: ${failed.map(result => result.spec).join(", ")}`);
  process.exitCode = 1;
}

// index.json is sorted from newest to oldest
function resolve(spec) {
  const release = releases.find(r => r.version.startsWith(`v${spec}.`));
  if (!release) throw new Error(`Unknown Node.js version: ${spec}`);
  return release.version;
}

async function install(version) {
  const dir = path.join(root, version);
  await mkdir(dir);
  // node.cjs only needs the node binary.
  await retry(() => (IS_WINDOWS ? installExe : installTarball)(version, dir));
  return dir;
}

async function installExe(version, dir) {
  const { body } = await download(
    `${DIST}/${version}/win-${process.arch}/${NODE_BINARY}`
  );
  await pipeline(body, createWriteStream(path.join(dir, NODE_BINARY)));
}

async function installTarball(version, dir) {
  const name = `node-${version}-${process.platform}-${process.arch}`;
  const { body } = await download(`${DIST}/${version}/${name}.tar.gz`);
  const tar = spawn(
    "tar",
    ["-xz", "--strip-components=2", "-C", dir, `${name}/bin/node`],
    { stdio: ["pipe", "ignore", "inherit"] }
  );
  const [[code]] = await Promise.all([
    once(tar, "close"),
    pipeline(body, tar.stdin),
  ]);
  if (code !== 0) throw new Error(`tar exited with code ${code}`);
}

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response;
}

async function retry(fn) {
  for (let retries = 3; ; retries--) {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      await delay(1000);
    }
  }
}

function test(dir) {
  return new Promise((resolve, reject) => {
    const child = spawn(path.join(dir, NODE_BINARY), [SCRIPT], {
      // node.cjs spawns `node`, which must be the version under test.
      env: {
        ...process.env,
        PATH: `${dir}${path.delimiter}${process.env.PATH}`,
      },
    });
    let output = "";
    const append = chunk => (output += chunk);
    child.stdout.on("data", append);
    child.stderr.on("data", append);
    child.on("error", reject);
    child.on("close", code => resolve({ ok: code === 0, output }));
  });
}
