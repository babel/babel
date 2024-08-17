import path from "path";
import { readFileSync, writeFileSync } from "fs";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import { commonJS } from "$repo-utils";
import { createHash } from "crypto";

const { __dirname, require } = commonJS(import.meta.url);

pack("../Makefile.source.mjs", "../Makefile.js", [
  "node_modules/shelljs/src/*.js",
]);

async function pack(inputPath, outputPath, dynamicRequireTargets) {
  inputPath = path.join(__dirname, inputPath);
  outputPath = path.join(__dirname, outputPath);

  const hash = createHash("sha1")
    .update(readFileSync(inputPath, "utf8"))
    .digest("hex");

  if (process.argv[2] === "--auto") {
    if (readFileSync(outputPath, "utf8").includes(hash)) {
      return;
    }
  }

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
              targets: "maintained node versions",
              useBuiltIns: "usage",
              corejs: require("core-js/package.json").version,
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

  const output = `// source hash: ${hash}
/* eslint-disable */
// prettier-ignore
${result.output[0].code}`;
  writeFileSync(outputPath, output);
}
