/*
Usage: `node ./test/realWorldTests`
Does not run as part of normal testing (takes too long).

This checks out a few repositories and tests the typescript transform on them.
It checks that for every '.ts' file:

- File parses correctly and produces a valid AST.
- Generator outputs code which parses back to the same AST.
- Transform produces output with an equivalent AST to the output produced by `tsc`. (Whitespace may differ.)
*/

const babel = require("babel-core");
const pluginTransformClassProperties = require("babel-plugin-transform-class-properties");
const pluginSyntaxDynamicImport = require("babel-plugin-syntax-dynamic-import");
const pluginSyntaxJsx = require("babel-plugin-syntax-jsx");
const presetTypescript = require("babel-preset-typescript");
const babylon = require("babylon");
const generator = require("babel-generator");
const { execSync } = require("child_process");
const {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
} = require("fs");
const { join: joinPaths } = require("path");
const stripJsonComments = require("strip-json-comments");
const ts = require("typescript");
require("source-map-support").install();

const { compareAsts, logAst, validate } = require("./astUtils");

const installDir = joinPaths(__dirname, "tmp");

if (!module.parent) {
  install();
  // To run a single test instead:
  // testText("", "a.ts", /*debug*/ true);
  testAllInDir(installDir, /*debug*/ false);
}

/**
 * @param {string} text
 * @param {string} filePath
 * @param {boolean} dbg
 * @return {void}
 */
function testText(text, filePath, dbg) {
  try {
    const ast = parse(text, filePath);
    validate(ast);
    testGenerator(ast, filePath, dbg);
    // Don't test transform on '.d.ts' files; these should never be transformed.
    // Don't test transform on `export =`; not supported in babel.
    // `export enum` issue: https://github.com/Microsoft/TypeScript/issues/17783
    if (
      !filePath.endsWith(".d.ts") &&
      !text.includes("export =") &&
      !text.includes("export enum")
    ) {
      testTransform(text, filePath, dbg);
    }
  } catch (e) {
    console.error(`Parse error in ${filePath}`);
    throw e;
  }
}

/**
 * @param {string} src
 * @param {string} filename
 * @param {boolean} dbg
 * @return {void}
 */
function testTransform(src, filename, dbg) {
  if (src.includes("const enum")) {
    return;
  }
  if (/(module|namespace) \w/.test(src)) {
    return;
  }

  let ast;
  try {
    ast = babelTransform(src, filename);
  } catch (e) {
    if (e.message.includes("`import =` is not supported.")) {
      return;
    }
    throw e;
  }

  const tsCode = tscTransformAndGenerate(src, filename);
  const tsAst = parse(tsCode, filename);
  if (dbg) {
    console.log("our ast:");
    logAst(ast);
    console.log("---\nparsed ast from tsc:");
    logAst(tsAst);
    console.log("---\nour output:\n" + babelGenerate(ast));
    console.log("---\ntsc output:\n" + tsCode);
  }
  compareAsts(ast, tsAst, "Babel transform and TypeScript transform differ:");
}

/**
 * `plugin-transform-class-properties` translates `x: number;` to `this.x = undefined;`.
 * TypeScript instead simply removes it.
 */
function transformDestroyPropertiesEarly() {
  return {
    visitor: {
      // Must do this in Class and not ClassProperty
      // or else plugin-transform-class-properties will beat us to it
      Class(path) {
        for (const prop of path.get("body").get("body")) {
          if (prop.isClassProperty() && !prop.node.value) {
            prop.remove();
          }
        }
      },
    },
  };
}

/**
 * @param {string} src
 * @param {string} filename
 * @return {object}
 */
function babelTransform(src, filename) {
  const out = babel.transform(src, {
    ast: true,
    babelrc: false,
    filename,
    presets: [presetTypescript],
    plugins: [
      transformDestroyPropertiesEarly,
      [pluginTransformClassProperties, { loose: true }],
      pluginSyntaxDynamicImport,
      ...(filename.endsWith(".tsx") ? [pluginSyntaxJsx] : []),
    ],
  });
  // out.code is the generated code, but we're just interested in out.ast
  return out.ast;
}

/**
 * @param {string} src
 * @param {string} fileName
 * @return {string}
 */
function tscTransformAndGenerate(src, fileName) {
  const tsOptions = {
    compilerOptions: {
      target: "ESNext",
      module: "es6",
      noImplicitUseStrict: true,
    },
    fileName,
    reportDiagnostics: false,
    jsx: "preserve",
  };

  const res = ts.transpileModule(src, tsOptions);
  return res.outputText;
}

/**
 * @param {string} text
 * @param {string} filePath
 * @return {object}
 */
function parse(text, filePath) {
  return babylon.parse(text, {
    sourceType: "module",
    plugins: [
      "typescript",
      "classProperties",
      "objectRestSpread",
      "dynamicImport",
      ...(filePath.endsWith("tsx") ? ["jsx"] : []),
    ],
  });
}

function babelGenerate(ast) {
  return generator.default(ast).code;
}

/**
 * @param {object} ast
 * @param {string} filePath
 * @param {boolean} dbg
 * @return {void}
 */
function testGenerator(ast, filePath, dbg) {
  const generated = babelGenerate(ast);
  const ast2 = parse(generated, filePath);
  if (dbg) {
    logAst(ast);
    console.log("+++++++");
    logAst(ast2);
    console.log(generated);
  }
  compareAsts(ast, ast2, "Generated code differs from input code");
}

/**
 * @return {void}
 */
function install() {
  if (existsSync(installDir)) {
    return;
  }

  mkdirSync(installDir);

  const repos = [
    "https://github.com/DefinitelyTyped/DefinitelyTyped.git",
    "https://github.com/Microsoft/vscode.git",
  ];

  for (const url of repos) {
    execSync(`git clone --depth 1 ${url}`, { cwd: installDir });
  }
}

/**
 * @param {string} dir
 * @param {boolean} dbg
 * @return {void}
 */
function testAllInDir(dir, dbg) {
  const entries = readdirSync(dir);
  if (entries.includes("tsconfig.json")) {
    const configPath = joinPaths(dir, "tsconfig.json");
    try {
      const config = JSON.parse(
        stripJsonComments(readFileSync(configPath, "utf-8")),
      );
      if (
        config.compilerOptions &&
        config.compilerOptions.experimentalDecorators
      ) {
        // Don't test projects using decorators -- TypeScript decorators are from an older spec
        return;
      }
    } catch (error) {
      console.error("Bad tsconfig: " + configPath);
      throw error;
    }
  }

  for (const entryName of entries) {
    const entryPath = joinPaths(dir, entryName);
    if (statSync(entryPath).isDirectory()) {
      if (!shouldIgnoreDir(entryName)) {
        testAllInDir(entryPath, dbg);
      }
    } else if (entryPath.endsWith(".ts") && !shouldIgnoreFile(entryName)) {
      console.log(entryPath);
      const text = readFileSync(entryPath, "utf-8");
      testText(text, entryPath, dbg);
    }
  }
}

/**
 * @param {string} entry
 * @return {boolean}
 */
function shouldIgnoreFile(entry) {
  switch (entry) {
    /*
    This file features a constructor with a parameter property *after* a method.
    TypeScript will move the constructor to before the method; babel will preserve order.
    */
    case "packageJSONContribution.ts":

    // Extra parentheses in `a || (b || c)`
    case "typescriptServiceClient.ts":

    // Property initializer but no constructor
    case "test-members.ts":
      return true;

    default:
      return false;
  }
}

/**
 * @param {string} entry
 * @return {boolean}
 */
function shouldIgnoreDir(entry) {
  switch (entry) {
    // Waiting on https://github.com/Microsoft/vscode/pull/28665
    case "emmet":

    // This has a class with `private "constructor";`.
    // This is forbidden by babylon, but allowed by TypeScript.
    case "nodal":

    // Babel and TypeScript have different emits for
    // a class with property initializers but no declared constructor.
    case "backbone-relational":
    case "backbone.marionette":
    case "camo":
    case "griddle-react":
    case "rc-select":
    case "react-easy-chart":
    case "react-leaflet":
    case "react-native-snap-carousel":
    case "react-native-sortable-list":
    case "react-notification-system":
    case "react-onclickoutside":
    case "react-overlays":
    case "react-tabs":
    case "yayson":

    // Comment in JSX removed (https://github.com/Microsoft/TypeScript/issues/15235)
    case "react-mdl":
    case "react-router":
    case "react-router-config":
    case "react-router-redux":

    // Uses `import { } from "react";` which TypeScript elides but we don't.
    case "react-virtualized":
      return true;

    default:
      return false;
  }
}
