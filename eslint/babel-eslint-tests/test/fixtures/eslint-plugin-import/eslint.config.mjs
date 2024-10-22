import importPlugin from "eslint-plugin-import";
import babelParser from "@babel/eslint-parser";

export default [
  {
    plugins: {
      import: importPlugin,
    },

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          configFile: false,
          presets: ["@babel/preset-flow"],
        },
      },
    },

    rules: {
      "import/no-named-as-default": "error",
      "no-unused-vars": "error",
    },
  },
];
