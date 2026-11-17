import { fileURLToPath } from "node:url";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import getTargets from "../../lib/index.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Strip prerelease tag
const nodeVersion = process.versions.node.split("-")[0];

describe("node: true reads package.json engines.node", () => {
  it("targets the lowest version of the engines.node range", () => {
    expect(getTargets({ node: true }, { configPath: dirname })).toEqual({
      node: "6.0.0",
    });
  });

  it("finds package.json in a parent directory", () => {
    expect(
      getTargets({ node: true }, { configPath: path.join(dirname, "nested") }),
    ).toEqual({ node: "6.0.0" });
  });

  it("falls back to the parent package.json when the closest one has no engines field", () => {
    expect(
      getTargets(
        { node: true },
        { configPath: path.join(dirname, "nested-pkg") },
      ),
    ).toEqual({ node: "6.0.0" });
  });

  it("targets the exact minimum of a caret range", () => {
    expect(
      getTargets({ node: true }, { configPath: path.join(dirname, "caret") }),
    ).toEqual({ node: "18.17.0" });
  });

  it("falls back to the current version when there is no package.json", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "babel-engines-"));
    try {
      expect(getTargets({ node: true }, { configPath: dir })).toEqual({
        node: nodeVersion,
      });
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("falls back to the current version for an unconstrained range", () => {
    expect(
      getTargets({ node: true }, { configPath: path.join(dirname, "any") }),
    ).toEqual({ node: nodeVersion });
  });

  it("node: 'current' still uses the running version", () => {
    expect(getTargets({ node: "current" }, { configPath: dirname })).toEqual({
      node: nodeVersion,
    });
  });
});
