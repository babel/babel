import babelPlugin from "@babel/eslint-plugin";
import babelParser from "@babel/eslint-parser";
import { fileURLToPath } from "url";

export default [
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

    rules: {
      "babel/new-cap": "error",
      "babel/no-undef": "error",
      "babel/no-unused-expressions": "error",
    },
  },
];
