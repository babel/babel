import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import babelParser from "@babel/eslint-parser";
import { fileURLToPath } from "url";

export default [
  {
    plugins: {
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          configFile: false,
          cwd: fileURLToPath(new URL("..", import.meta.url)),
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
