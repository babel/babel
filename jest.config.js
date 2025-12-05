// @ts-check

const isPublishBundle = process.env.IS_PUBLISH;

/** @type {import('jest').Config} */
const config = {
  runner: "jest-light-runner",

  snapshotFormat: { escapeString: true, printBasicPrototype: true },
  coverageProvider: "v8",
  coverageReporters: ["lcov", "text"],
  collectCoverageFrom: [
    "packages/*/lib/**/*.{js,cjs,mjs,ts}",
    "codemods/*/lib/**/*.{js,cjs,mjs,ts}",
    "eslint/*/lib/**/*.{js,cjs,mjs,ts}",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/packages/babel-standalone/",
    "/test/(fixtures|tmp|__data__)/",
    ".*\\.d\\.ts",
    "<rootDir>/packages/babel-standalone/.*",
    "<rootDir>/packages/babel-types/.*/generated/.*",
    "<rootDir>/packages/babel-helpers/.*/helpers/.*",
    "<rootDir>/packages/babel-core/.*/vendor/.*",
  ],

  setupFiles: ["@cspotcode/source-map-support/register"],

  testRegex: `./(packages|codemods)/[^/]+/test/.+\\.m?js$`,
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/fixtures/",
    "/test/debug-fixtures/",
    "/test/regenerator-fixtures/",
    "/babel-preset-env/test/regressions/",
    "/babel-parser/test/expressions/",
    "/test/tmp/",
    "/test/__data__/",
    "/test/helpers/",
    "<rootDir>/test/warning\\.js",
    "<rootDir>/build/",
    "<rootDir>/.history/", // local directory for VSCode Extension - https://marketplace.visualstudio.com/items?itemName=xyz.local-history
    "_browser\\.js",
    // Some tests require internal files of bundled packages, which are not available
    // in production builds. They are marked using the .skip-bundled.js extension.
    ...(isPublishBundle ? ["\\.skip-bundled\\.js$"] : []),
    // Ignore @babel/standalone test in coverage testing because it is not built
    ...(process.env.BABEL_COVERAGE === "true"
      ? ["<rootDir>/packages/babel-standalone/"]
      : []),
  ],
  testEnvironment: "node",
  transformIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/packages/babel-standalone/babel(\\.min)?\\.js",
    "/test/(fixtures|tmp|__data__)/",
    "<rootDir>/(packages|codemods|eslint)/[^/]+/lib/",
  ],
  modulePathIgnorePatterns: [
    "/test/fixtures/",
    "/test/tmp/",
    "/test/__data__/",
    "<rootDir>/build/",
  ],
  // We don't need module name mappers here as dependencies of workspace
  // package should be declared explicitly in the package.json
  // Yarn will generate correct file links so that Jest can resolve correctly
  moduleNameMapper: {},
};

module.exports = config;
