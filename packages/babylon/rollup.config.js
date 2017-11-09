import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";

export default {
  input: "src/index.js",
  output: {
    file: "lib/index.js",
    format: "cjs",
  },
  plugins: [
    json(),
    babel({
      externalHelpersWhitelist: ["inheritsLoose"],
      babelrc: false,
      presets: [
        [
          "@babel/env",
          {
            loose: true,
            modules: false,
            targets: {
              node: "4.2",
            },
          },
        ],
        "@babel/flow",
      ],
      plugins: ["transform-charcodes", "transform-for-of-as-array"],
    }),
    nodeResolve(),
  ],
};
