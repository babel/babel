module.exports = {
  collectCoverageFrom: [
    "packages/*/src/**/*.mjs",
    "packages/*/src/**/*.js",
    "codemods/*/src/**/*.mjs",
    "codemods/*/src/**/*.js",
    "eslint/*/src/**/*.mjs",
    "eslint/*/src/**/*.js",
  ],
  testRegex: `./(packages|codemods|eslint)/[^/]+/test/.+\\.m?js$`,
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/fixtures/",
    "/test/debug-fixtures/",
    "/babel-parser/test/expressions/",
    "/test/tmp/",
    "/test/__data__/",
    "/test/helpers/",
    "<rootDir>/test/warning\\.js",
    "<rootDir>/build/",
    "_browser\\.js",
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/testSetupFile.js"],
  transformIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/packages/babel-standalone/babel(\\.min)?\\.js",
    "/test/(fixtures|tmp|__data__)/",
    "<rootDir>/(packages|codemods|eslint)/[^/]+/lib/",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/packages/babel-standalone/babel(\\.min)?\\.js",
    "/test/(fixtures|tmp|__data__)/",
  ],
  modulePathIgnorePatterns: [
    "/test/fixtures/",
    "/test/tmp/",
    "/test/__data__/",
    "<rootDir>/build/",
  ],
  // We don't need module name mappers here as depedencies of workspace
  // package should be declared explicitly in the package.json
  // Yarn will generate correct file links so that Jest can resolve correctly
  moduleNameMapper: null,
};
