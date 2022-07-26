import { fileURLToPath } from "url";
import path from "path";
import { writeFileSync } from "fs";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const root = fileURLToPath(path.dirname(import.meta.url));

pack("../Makefile.source.mjs", "../Makefile.js", [
  "node_modules/shelljs/src/*.js",
]);

async function pack(inputPath, outputPath, dynamicRequireTargets) {
  inputPath = path.join(root, inputPath);
  outputPath = path.join(root, outputPath);

  const bundle = await rollup({
    input: inputPath,

    plugins: [
      nodeResolve({ preferBuiltins: true }),
      commonjs({
        dynamicRequireTargets: dynamicRequireTargets,
      }),
      babel({
        babelrc: false,
        babelHelpers: "bundled",
        exclude: ["node_modules/core-js/**"],
        parserOpts: { sourceType: "module" },
        presets: [
          [
            "@babel/preset-env",
            {
              targets: { node: 6 },
              useBuiltIns: "usage",
              corejs: "3.23",
            },
          ],
        ],
      }),
      terser(),
    ],
  });
  const result = await bundle.generate({
    format: "cjs",
  });

  const output = `/* eslint-disable */
// prettier-ignore
${result.output[0].code}`;
  writeFileSync(outputPath, output);
}
