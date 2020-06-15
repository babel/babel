// These packages under the @babel namespace aren't in this monorepo.
const externalBabelPackages = [
  "plugin-syntax-async-generators",
  "plugin-syntax-bigint",
  "plugin-syntax-dynamic-import",
  "plugin-syntax-json-strings",
  "plugin-syntax-nullish-coalescing-operator",
  "plugin-syntax-object-rest-spread",
  "plugin-syntax-optional-catch-binding",
  "plugin-syntax-optional-chaining",
  "plugin-syntax-export-namespace-from",
];

// prettier-ignore
const monorepoPackagePattern =
  `^@babel/(?!eslint-)(?!${externalBabelPackages.join("|")})([a-zA-Z0-9_-]+)$`;

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
  moduleNameMapper: {
    [monorepoPackagePattern]: "<rootDir>/packages/babel-$1/",
    "^@babel/eslint-([a-zA-Z0-9_-]+)$": "<rootDir>/eslint/babel-eslint-$1/",
  },
};
