"use strict";

const configInternal = require("@babel/eslint-config-internal");
const pluginImport = require("eslint-plugin-import");
const pluginNode = require("eslint-plugin-node");
const pluginPrettier = require("eslint-plugin-prettier");
const pluginBabelDevelopment = require("@babel/eslint-plugin-development");
const pluginBabelDevelopmentInternal = require("@babel/eslint-plugin-development-internal");
const pluginTypeScriptESLint = require("@typescript-eslint/eslint-plugin");
const parserTypeScriptESLint = require("@typescript-eslint/parser");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const cjsGlobals = ["__dirname", "__filename", "require", "module", "exports"];

const testFiles = [
  "packages/*/test/**/*.js",
  "codemods/*/test/**/*.js",
  "eslint/*/test/**/*.js",
];
const sourceFiles = exts => [
  `packages/*/src/**/*.{${exts}}`,
  `codemods/*/src/**/*.{${exts}}`,
  `eslint/*/src/**/*.{${exts}}`,
];

module.exports = [
  ...configInternal,
  {
    ignores: [
      "/lib",
      "/build",
      "/.git",
      "package.json",
      "packages/babel-runtime",
      "packages/babel-runtime-corejs2",
      "packages/babel-runtime-corejs3",
      "packages/*/node_modules",
      "packages/*/lib",
      "packages/*/test/fixtures",
      "packages/*/test/tmp",
      "codemods/*/node_modules",
      "codemods/*/lib",
      "codemods/*/test/fixtures",
      "codemods/*/test/tmp",
      "packages/babel-compat-data/build",
      "packages/babel-preset-env/test/debug-fixtures",
      "packages/babel-standalone/babel.js",
      "packages/babel-standalone/babel.min.js",
      "packages/babel-parser/test/expressions",
      "packages/babel-core/src/vendor",
      "eslint/*/lib",
      "eslint/*/node_modules",
      "eslint/*/test/fixtures",
      "test/runtime-integration/*/output.js",
      "test/runtime-integration/*/output-absolute.js",
      "Makefile.js",
    ],
  },
  {
    plugins: {
      import: pluginImport,
      node: pluginNode,
      prettier: pluginPrettier,
      "@babel/development": pluginBabelDevelopment,
      "@babel/development-internal": pluginBabelDevelopmentInternal,
    },
    rules: {
      "prettier/prettier": "error",
      "import/no-extraneous-dependencies": "error",
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: parserTypeScriptESLint,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTypeScriptESLint,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "no-dupe-class-members": "off",
      "@typescript-eslint/no-dupe-class-members": "error",
      "no-undef": "off",
      "no-redeclare": "off",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": { descriptionFormat: "^\\(Babel 7 vs Babel 8\\) .+$" },
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { disallowTypeAnnotations: false },
      ],
      "@typescript-eslint/no-use-before-define": [
        "error",
        {
          functions: false,
          classes: false,
          allowNamedExports: true,
        },
      ],
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        { ignoreArrowShorthand: true },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },
  {
    files: sourceFiles("js,ts,cjs,mjs"),
    languageOptions: {
      globals: { PACKAGE_JSON: "readonly", USE_ESM: "readonly" },
    },
    rules: {
      "@babel/development/no-undefined-identifier": "error",
      "@babel/development/no-deprecated-clone": "error",
      "guard-for-in": "error",
      "import/extensions": ["error", { json: "always", cjs: "always" }],
    },
  },
  ...compat.extends("plugin:jest/recommended").map(config => {
    config.files = [
      ...testFiles,
      "packages/babel-helper-transform-fixture-test-runner/src/helpers.{ts,js}",
      "test/**/*.js",
    ];
    config.rules = {
      ...config.rules,
      "jest/expect-expect": "off",
      "jest/no-identical-title": "off",
      "jest/no-standalone-expect": "off",
      "jest/no-test-callback": "off",
      "jest/valid-describe": "off",
      "import/extensions": ["error", "always"],
      "import/no-extraneous-dependencies": "off",
      "no-restricted-imports": ["error", { patterns: ["**/src/**"] }],
    };
    return config;
  }),
  {
    files: testFiles,
    rules: {
      "node/no-unsupported-features": [
        "error",
        { version: "12.17.0", ignores: ["modules"] },
      ],
      "@babel/development-internal/require-default-import-fallback": "error",
    },
  },
  {
    files: [...sourceFiles("js,ts,mjs"), ...testFiles, "test/**/*.js"],
    ignores: [
      // @babel/register is the require() hook, so it will always be CJS-based
      "packages/babel-register/**/*.{js,ts}",
    ],
    rules: {
      "no-restricted-globals": ["error", ...cjsGlobals],
      "no-restricted-imports": [
        "error",
        {
          patterns: ["**/*.json"],
          paths: [
            {
              name: "semver",
              message:
                "semver's named exports are not recognized by the Node.js ESM-CJS interop.",
              importNames: Object.keys(require("semver")).filter(
                // We use it as a type import.
                name => name !== "SemVer"
              ),
            },
          ],
        },
      ],
    },
  },
  {
    files: ["packages/babel-plugin-*/src/index.{js,ts}"],
    ignores: ["packages/babel-plugin-transform-regenerator/**/*.js"],
    rules: {
      "@babel/development/plugin-name": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
    },
  },
  {
    files: ["packages/babel-helpers/src/helpers/**.js"],
    rules: {
      "no-var": "off",
      "comma-dangle": "off",
      "no-func-assign": "off",
      "import/no-extraneous-dependencies": "off",
    },
  },
  {
    files: ["packages/babel-traverse/scripts/**/*.js"],
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        { packageDir: "./packages/babel-traverse" },
      ],
    },
  },
  {
    files: ["eslint/babel-eslint-parser/src/**/*.js"],
    rules: {
      "no-restricted-imports": ["error", "@babel/core"],
    },
  },
  {
    files: ["packages/babel-plugin-transform-runtime/scripts/**/*.js"],
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        { packageDir: "./packages/babel-plugin-transform-runtime" },
      ],
    },
  },
  {
    files: ["packages/babel-preset-env/data/**/*.js"],
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        { packageDir: "./packages/babel-preset-env" },
      ],
    },
  },
  {
    files: ["scripts/**/*.{js,cjs}"],
    rules: {
      "import/no-extraneous-dependencies": ["error", { packageDir: "." }],
    },
  },
];
