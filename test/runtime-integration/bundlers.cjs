const cp = require("child_process");
const path = require("path");
const fs = require("fs");

for (const absolute of [false, true]) {
  const output = absolute ? "output-absolute.js" : "output.js";
  const title = absolute ? "(absolute runtime)" : "";

  const webpack = absolute
    ? "webpack --config webpack.absolute.config.js"
    : "webpack";
  const rollup = absolute ? "rollup -c rollup.absolute.config.js" : "rollup -c";

  // TODO: This never worked in any Babel version
  if (!absolute) {
    test(`Webpack 5 ${title}`, webpack, "webpack-5", output, true);
  }
  test(`Webpack 4 ${title}`, webpack, "webpack-4", output);
  test(`Webpack 3 ${title}`, webpack, "webpack-3", output);
  test(`Rollup ${title}`, rollup, "rollup", output);
}

function test(name, command, directory, output, first) {
  console.log(`Building with ${name}`);
  cp.execSync(`yarn ${command}`, {
    cwd: path.join(__dirname, directory),
    encoding: "utf8",
  });
  console.log(`Testing the ${name} bundle`);
  const out = cp.execSync(`node ${output}`, {
    cwd: path.join(__dirname, directory),
    encoding: "utf8",
  });

  const expectedPath = path.join(__dirname, "expected-bundler.txt");
  const expected = fs.readFileSync(expectedPath, "utf8");

  if (expected === out) {
    console.log("OK");
  } else if (first && process.env.OVERWRITE) {
    fs.writeFileSync(expectedPath, out);
    console.log("UPDATED");
  } else {
    console.error("FAILED\n");
    console.error(out);
  }
}
