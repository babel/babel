import { fileURLToPath } from "url";
import path from "path";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { writeFileSync } from "fs";

const root = fileURLToPath(path.dirname(import.meta.url));

pack("../Makefile.source.mjs", "../Makefile.mjs", [
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
    ],
  });
  const result = await bundle.generate({
    format: "esm",
  });

  const output = `/* eslint-disable */
  //prettier-ignore
  ${result.output[0].code}`;
  writeFileSync(outputPath, output);
}
