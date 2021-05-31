const fs = require("fs");
const path = require("path");

const runtimePath = path.resolve(__dirname, "../../packages/babel-runtime");
const runtimeCorejs3Path = path.resolve(
  __dirname,
  "../../packages/babel-runtime-corejs3"
);
const input = path.resolve(__dirname, "src");

for (const file of fs.readdirSync(input)) {
  if (!/\.[cm]js$/.test(file)) continue;

  let contents = fs.readFileSync(path.join(input, file), "utf8");
  contents = contents.replace("@babel/runtime-corejs3", runtimeCorejs3Path);
  contents = contents.replace("@babel/runtime", runtimePath);

  fs.writeFileSync(path.resolve(input, "absolute", file), contents);
}
