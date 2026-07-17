import babelPlugin from "@babel/eslint-plugin";
import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";
import { fileURLToPath } from "url";

export default [
  js.configs.recommended,
  {
    plugins: {
      babel: babelPlugin,
    },

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          configFile: false,
          cwd: fileURLToPath(new URL("..", import.meta.url)),
          plugins: [
            ["@babel/plugin-proposal-decorators", { version: "2023-11" }],
            "@babel/plugin-proposal-do-expressions",
          ],
        },
      },
    },
    ...babelPlugin.configs.all,
    rules: {
      ...babelPlugin.configs.all.rules,
      "babel/no-empty": "warn",
    }
  },
];
