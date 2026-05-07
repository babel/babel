import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import { commonJS } from "$repo-utils";
import { createHash } from "node:crypto";

const { __dirname, require } = commonJS(import.meta.url);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
pack("../Makefile.source.ts", "../Makefile.js", [
  "node_modules/shelljs/src/*.js",
]);

async function pack(
  inputPath: string,
  outputPath: string,
  dynamicRequireTargets: string[]
) {
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
      nodeResolve({ exportConditions: ["node"], preferBuiltins: true }),
      commonjs({
        dynamicRequireTargets: dynamicRequireTargets,
      }),
      babel({
        extensions: [".ts"],
        babelrc: false,
        configFile: false,
        babelHelpers: "bundled",
        exclude: ["node_modules/core-js/**"],
        parserOpts: { sourceType: "module" },
        presets: [
          "@babel/preset-typescript",
          [
            "@babel/preset-env",
            {
              useBuiltIns: "usage",
              corejs: require("core-js/package.json").version,
            },
          ],
        ],
        targets: "maintained node versions",
      }),
      replace({
        preventAssignment: true,
        values: {
          // handle require.main === module usage here
          // https://github.com/shelljs/shelljs/blob/2809a872ead82da2d9fd0704dc3c1f690e2475f4/src/exec-child.js#L69
          // we never execute shelljs/src/exec-child.js directly, so it should always be false
          "require.main === module": "false",
        },
      }),
      terser(),
    ],
  });
  const result = await bundle.generate({
    format: "esm",
  });

  const output = `// source hash: ${hash}
/* eslint-disable */
// prettier-ignore
${result.output[0].code}`;
  writeFileSync(outputPath, output);
}
