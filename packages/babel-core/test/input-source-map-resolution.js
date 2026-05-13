import * as babel from "../lib/index.js";
import convertSourceMap from "convert-source-map";
import path from "node:path";
import fs from "node:fs";
import { commonJS } from "$repo-utils";

const { __dirname } = commonJS(import.meta.url);

// @see packages/babel-core/src/transformation/normalize-file.ts
const EXTERNAL_SOURCEMAP_REGEX =
  /^\/\/[@#][ \t]+sourceMappingURL=([^\s'"`]+)[ \t]*$/m;

function dirTreeDisplay(dirPath, indent = "") {
  let result = "";
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const isLast = i === entries.length - 1;
    result += indent + (isLast ? "└─ " : "├─ ") + entry.name + "\n";
    if (entry.isDirectory()) {
      result += dirTreeDisplay(
        path.join(dirPath, entry.name),
        indent + (isLast ? "   " : "│  "),
      );
    }
  }
  return result;
}

function getInputSourceMapURL(inputFilePath) {
  const inputCode = fs.readFileSync(inputFilePath, "utf8");
  const match = inputCode.match(EXTERNAL_SOURCEMAP_REGEX);
  return match ? match[1] : null;
}

function verifyInputFileSourceMapExistence(inputFilePath) {
  const sourceMapURL = getInputSourceMapURL(inputFilePath);
  const sourceMapPath = path.resolve(path.dirname(inputFilePath), sourceMapURL);
  const sourceMap = convertSourceMap
    .fromJSON(fs.readFileSync(sourceMapPath, "utf8"))
    .toObject();
  expect(sourceMap.sourcesContent).toHaveLength(1);
  expect(sourceMap.sourcesContent[0]).toContain("const enum Msg");
}

function expectInputSourceMapIsApplied(result) {
  expect(result.map.sourcesContent).toHaveLength(1);
  expect(result.map.sourcesContent[0]).toContain("const enum Msg");
  expect(result.map.sourcesContent[0]).toContain("This map should be loaded");
}

function expectInputSourceMapIsPresentButNotApplied(result, inputFilePath) {
  expect(result.map.sourcesContent).toHaveLength(1);
  expect(result.map.sourcesContent[0]).not.toContain("const enum Msg");
  verifyInputFileSourceMapExistence(inputFilePath);
}

describe("input source map resolution", function () {
  const base = path.join(__dirname, "fixtures/input-source-map-resolution");

  let cwd;

  beforeEach(function () {
    cwd = process.cwd();
    process.chdir(base);
  });

  afterEach(function () {
    process.chdir(cwd);
  });

  it("should resolve input source map downward relative to the input file", function () {
    const cwd = path.join(base, "relative-down");
    process.chdir(cwd);

    const inputFilePath = path.join(cwd, "input.js");

    expect(dirTreeDisplay(cwd)).toMatchInlineSnapshot(`
      "├─ babel.config.input.js.json
      ├─ input.js
      └─ input.js.map
      "
    `);

    expect(getInputSourceMapURL(inputFilePath)).toMatchInlineSnapshot(
      `"input.js.map"`,
    );

    const result = babel.transformFileSync(inputFilePath, {
      babelrc: false,
      configFile: path.join(cwd, "./babel.config.input.js.json"),
      inputSourceMap: true,
      sourceMap: true,
    });

    expectInputSourceMapIsApplied(result);
  });

  it("should resolve input source map downward across package.json boundaries", function () {
    const cwd = path.join(base, "relative-down-into-node-modules");
    process.chdir(cwd);

    const inputFilePath = path.join(cwd, "input.js");

    expect(dirTreeDisplay(cwd)).toMatchInlineSnapshot(`
      "├─ babel.config.input.js.json
      ├─ input.js
      └─ node_modules
         └─ corp-source-maps
            ├─ input.js.map
            └─ package.json
      "
    `);
    expect(getInputSourceMapURL(inputFilePath)).toMatchInlineSnapshot(
      `"node_modules/corp-source-maps/input.js.map"`,
    );

    const result = babel.transformFileSync(inputFilePath, {
      babelrc: false,
      configFile: path.join(cwd, "./babel.config.input.js.json"),
      inputSourceMap: true,
      sourceMap: true,
    });

    expectInputSourceMapIsApplied(result);
  });

  it("should resolve input source map upward within the root boundary", function () {
    const cwd = path.join(base, "relative-up-within-root");
    process.chdir(cwd);

    const inputFilePath = path.join(cwd, "root", "sub", "input.js");

    expect(dirTreeDisplay(cwd)).toMatchInlineSnapshot(`
      "├─ babel.config.input.js.json
      └─ root
         ├─ input.js.map
         └─ sub
            └─ input.js
      "
    `);

    expect(getInputSourceMapURL(inputFilePath)).toMatchInlineSnapshot(
      `"../input.js.map"`,
    );

    const result = babel.transformFileSync(inputFilePath, {
      babelrc: false,
      root: path.join(cwd, "root"),
      configFile: path.join(cwd, "./babel.config.input.js.json"),
      inputSourceMap: true,
      sourceMap: true,
    });

    expectInputSourceMapIsApplied(result);
  });

  it("should resolve input source map upward within the package.json boundary", function () {
    const cwd = path.join(base, "relative-up-within-node-modules");
    process.chdir(cwd);

    const inputFilePath = path.join(
      cwd,
      "node_modules",
      "corp-lib",
      "sub",
      "input.js",
    );

    expect(dirTreeDisplay(cwd)).toMatchInlineSnapshot(`
      "├─ babel.config.input.js.json
      └─ node_modules
         └─ corp-lib
            ├─ input.js.map
            ├─ package.json
            └─ sub
               └─ input.js
      "
    `);

    expect(getInputSourceMapURL(inputFilePath)).toMatchInlineSnapshot(
      `"../input.js.map"`,
    );

    const result = babel.transformFileSync(inputFilePath, {
      babelrc: false,
      configFile: path.join(cwd, "./babel.config.input.js.json"),
      inputSourceMap: true,
      sourceMap: true,
    });

    expectInputSourceMapIsApplied(result);
  });

  it("should not resolve input source map upward across the package.json boundary", function () {
    const cwd = path.join(base, "invalid-relative-up-across-node-modules");
    process.chdir(cwd);

    const inputFilePath = path.join(
      cwd,
      "node_modules",
      "corp-lib",
      "input.js",
    );

    expect(dirTreeDisplay(cwd)).toMatchInlineSnapshot(`
      "├─ babel.config.input.js.json
      ├─ input.js.map
      └─ node_modules
         └─ corp-lib
            ├─ input.js
            └─ package.json
      "
    `);

    expect(getInputSourceMapURL(inputFilePath)).toMatchInlineSnapshot(
      `"../../input.js.map"`,
    );

    const result = babel.transformFileSync(inputFilePath, {
      babelrc: false,
      configFile: path.join(cwd, "./babel.config.input.js.json"),
      inputSourceMap: true,
      sourceMap: true,
    });

    expectInputSourceMapIsPresentButNotApplied(result, inputFilePath);
  });

  it("should not resolve input source map upward across the root boundary", function () {
    const cwd = path.join(base, "invalid-relative-up-across-root");
    process.chdir(cwd);

    const inputFilePath = path.join(process.cwd(), "root", "sub", "input.js");

    expect(dirTreeDisplay(cwd)).toMatchInlineSnapshot(`
      "├─ babel.config.input.js.json
      ├─ input.js.map
      └─ root
         └─ sub
            └─ input.js
      "
    `);

    expect(getInputSourceMapURL(inputFilePath)).toMatchInlineSnapshot(
      `"../../input.js.map"`,
    );

    const result = babel.transformFileSync(inputFilePath, {
      babelrc: false,
      root: path.join(cwd, "root"),
      configFile: path.join(cwd, "./babel.config.input.js.json"),
      inputSourceMap: true,
      sourceMap: true,
    });

    expectInputSourceMapIsPresentButNotApplied(result, inputFilePath);
  });

  it("should not resolve input source map upward across the root boundary and within the package.json boundary", function () {
    const cwd = path.join(
      base,
      "invalid-relative-up-across-root-within-node-modules",
    );
    process.chdir(cwd);

    const inputFilePath = path.join(
      cwd,
      "node_modules",
      "corp-app",
      "root",
      "sub",
      "input.js",
    );

    expect(dirTreeDisplay(cwd)).toMatchInlineSnapshot(`
      "├─ babel.config.input.js.json
      └─ node_modules
         └─ corp-app
            ├─ input.js.map
            ├─ package.json
            └─ root
               └─ sub
                  └─ input.js
      "
    `);

    expect(getInputSourceMapURL(inputFilePath)).toMatchInlineSnapshot(
      `"../../input.js.map"`,
    );

    const result = babel.transformFileSync(inputFilePath, {
      babelrc: false,
      root: path.join(cwd, "node_modules", "corp-app", "root"),
      configFile: path.join(cwd, "./babel.config.input.js.json"),
      inputSourceMap: true,
      sourceMap: true,
    });

    expectInputSourceMapIsPresentButNotApplied(result, inputFilePath);
  });

  it("should not resolve input source map upward across the package.json boundary and within the root boundary", function () {
    const cwd = path.join(
      base,
      "invalid-relative-up-across-node-modules-within-root",
    );
    process.chdir(cwd);

    const inputFilePath = path.join(
      cwd,
      "root",
      "sub",
      "node_modules",
      "corp-lib",
      "input.js",
    );

    expect(dirTreeDisplay(cwd)).toMatchInlineSnapshot(`
      "├─ babel.config.input.js.json
      └─ root
         └─ sub
            ├─ input.js.map
            └─ node_modules
               └─ corp-lib
                  ├─ input.js
                  └─ package.json
      "
    `);

    expect(getInputSourceMapURL(inputFilePath)).toMatchInlineSnapshot(
      `"../../input.js.map"`,
    );

    const result = babel.transformFileSync(inputFilePath, {
      babelrc: false,
      root: path.join(cwd, "root"),
      configFile: path.join(cwd, "./babel.config.input.js.json"),
      inputSourceMap: true,
      sourceMap: true,
    });

    expectInputSourceMapIsPresentButNotApplied(result, inputFilePath);
  });
  it("should not resolve input source map across the package.json boundary using url not starting with ../", function () {
    const cwd = path.join(
      base,
      "invalid-relative-up-across-node-modules-url-not-start-with-double-dot",
    );
    process.chdir(cwd);

    const inputFilePath = path.join(
      cwd,
      "node_modules",
      "corp-lib",
      "input.js",
    );

    expect(dirTreeDisplay(cwd)).toMatchInlineSnapshot(`
      "├─ babel.config.input.js.json
      ├─ input.js.map
      └─ node_modules
         └─ corp-lib
            ├─ input.js
            ├─ package.json
            └─ sub
      "
    `);

    expect(getInputSourceMapURL(inputFilePath)).toMatchInlineSnapshot(
      `"sub/../../../input.js.map"`,
    );

    const result = babel.transformFileSync(inputFilePath, {
      babelrc: false,
      configFile: path.join(cwd, "./babel.config.input.js.json"),
      inputSourceMap: true,
      sourceMap: true,
    });

    expectInputSourceMapIsPresentButNotApplied(result, inputFilePath);
  });
});
