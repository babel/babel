"use strict";

const configInternal = require("@babel/eslint-config-internal");
const pluginImport = require("eslint-plugin-import");
const pluginN = require("eslint-plugin-n");
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
      ...(process.env.IS_PUBLISH ? testFiles : []),
    ],
  },
  {
    plugins: {
      import: pluginImport,
      node: pluginN,
      prettier: pluginPrettier,
      "@babel/development": pluginBabelDevelopment,
      "@babel/development-internal": pluginBabelDevelopmentInternal,
    },
    rules: {
      "prettier/prettier": "error",
      "import/no-extraneous-dependencies": "error",
    },
  },
  ...compat
    .extends(
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked"
    )
    .map(config => {
      return {
        ...config,
        files: ["**/*.{ts,cts}"],
        languageOptions: {
          parser: parserTypeScriptESLint,
          parserOptions: {
            allowAutomaticSingleRunInference: true,
            EXPERIMENTAL_useProjectService: true,
          },
        },
        plugins: {
          "@typescript-eslint": pluginTypeScriptESLint,
        },
        rules: {
          ...config.rules,
          "no-unused-vars": "off",
          "@typescript-eslint/no-unused-vars": "error",
          "no-dupe-class-members": "off",
          "@typescript-eslint/no-dupe-class-members": "error",
          "no-undef": "off",
          "no-redeclare": "off",
          "@typescript-eslint/ban-ts-comment": [
            "error",
            {
              "ts-ignore": {
                descriptionFormat: "^\\(Babel 7 vs Babel 8\\) .+$",
              },
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
          "@typescript-eslint/no-confusing-void-expression": [
            "error",
            { ignoreArrowShorthand: true },
          ],
          "@typescript-eslint/no-import-type-side-effects": "error",

          // Todo: Investigate, for each of these, whether we want them
          "@typescript-eslint/array-type": "off",
          "@typescript-eslint/ban-types": "off",
          "@typescript-eslint/consistent-generic-constructors": "off",
          "@typescript-eslint/consistent-indexed-object-style": "off",
          "@typescript-eslint/consistent-type-definitions": "off",
          "@typescript-eslint/dot-notation": "off",
          "@typescript-eslint/no-base-to-string": "off",
          "@typescript-eslint/no-duplicate-type-constituents": "off",
          "@typescript-eslint/no-empty-function": "off",
          "@typescript-eslint/no-empty-interface": "off",
          "@typescript-eslint/no-explicit-any": "off",
          "@typescript-eslint/no-misused-promises": "off",
          "@typescript-eslint/no-namespace": "off",
          "@typescript-eslint/no-this-alias": "off",
          "@typescript-eslint/no-unsafe-assignment": "off",
          "@typescript-eslint/no-unsafe-call": "off",
          "@typescript-eslint/no-unsafe-declaration-merging": "off",
          "@typescript-eslint/no-unsafe-member-access": "off",
          "@typescript-eslint/no-var-requires": "off",
          "@typescript-eslint/prefer-for-of": "off",
          "@typescript-eslint/prefer-function-type": "off",
          "@typescript-eslint/prefer-nullish-coalescing": "off",
          "@typescript-eslint/prefer-string-starts-ends-with": "off",
          "@typescript-eslint/require-await": "off",
          "@typescript-eslint/restrict-template-expressions": "off",
          "@typescript-eslint/sort-type-constituents": "off",
          "@typescript-eslint/triple-slash-reference": "off",
          "@typescript-eslint/unbound-method": "off",
          "prefer-rest-params": "off",

          // https://github.com/typescript-eslint/typescript-eslint/issues/5014
          "@typescript-eslint/no-inferrable-types": "off",
          "@typescript-eslint/no-unsafe-argument": "off",
          "@typescript-eslint/no-unsafe-return": "off",
        },
      };
    }),
  {
    files: sourceFiles("js,ts,cjs,mjs"),
    languageOptions: {
      globals: { PACKAGE_JSON: "readonly", USE_ESM: "readonly" },
    },
    rules: {
      "@babel/development/no-undefined-identifier": "error",
      "@babel/development/no-deprecated-clone": "error",
      "guard-for-in": "error",
      "import/extensions": ["error", "ignorePackages"],
      "import/no-unresolved": "error",
    },
  },
  ...compat.extends("plugin:jest/recommended").map(config => {
    if (config.files == null) {
      config.files = [
        ...testFiles,
        "packages/babel-helper-transform-fixture-test-runner/src/helpers.{ts,js}",
        "test/**/*.js",
      ];
    }
    if (config.rules != null) {
      config.rules = {
        ...config.rules,
        "jest/expect-expect": "off",
        "jest/no-standalone-expect": [
          "error",
          {
            additionalTestBlockFunctions: [
              "itBabel7",
              "itBabel7NoESM",
              "itBabel7NodeGte14NoESM",
              "itBabel8",
              "itESLint7",
              "itESLint8",
              "itNoESM",
              "itNoWin32",
              "itESM",
              "nodeGte8",
              "nodeGte12",
              "nodeGte12NoESM",
              "testFn",
            ],
          },
        ],
        "jest/no-test-callback": "off",
        "jest/valid-describe": "off",
        "import/extensions": ["error", "always"],
        "import/no-extraneous-dependencies": "off",
        "no-restricted-imports": ["error", { patterns: ["**/src/**"] }],
      };
    }
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
      "import/no-unresolved": "error",
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
    files: ["packages/babel-helpers/src/helpers/**.{js,ts}"],
    rules: {
      "no-var": "off",
      "comma-dangle": "off",
      "no-func-assign": "off",
      "prefer-spread": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off",
      "@typescript-eslint/prefer-optional-chain": "off",
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
