const { transformAsync } = require("@babel/core");
const { mkdirSync, statSync, readFileSync, writeFileSync } = require("fs");
const path = require("path");
const { log } = require("./scripts/utils/logger.cjs");

let chalk;
const chalkP = import("chalk").then(ns => {
  chalk = ns.default;
});

function needCompile(src, dest) {
  let destStat;
  try {
    destStat = statSync(dest);
  } catch (err) {
    if (err.code === "ENOENT") {
      return true;
    } else {
      throw err;
    }
  }
  const srcStat = statSync(src);
  return srcStat.mtimeMs >= destStat.mtimeMs;
}

exports.transform = async function transform(src, dest, opts = {}) {
  if (!chalk) await chalkP;

  mkdirSync(path.dirname(dest), { recursive: true });
  if (!needCompile(src, dest)) {
    return;
  }
  log(`Compiling '${chalk.cyan(src)}'...`);
  const content = readFileSync(src, "utf8");
  const { code, map } = await transformAsync(content, {
    filename: src,
    sourceFileName: path.relative(path.dirname(dest), src),
    caller: {
      // We have wrapped packages/babel-core/src/config/files/configuration.js with feature detection
      supportsDynamicImport: true,
      name: "babel-worker",
    },
    ...opts,
  });

  if (map) {
    writeFileSync(
      dest,
      `${code}

//# sourceMappingURL=${path.basename(dest)}.map
`,
      "utf8"
    );
    writeFileSync(dest + ".map", JSON.stringify(map), "utf8");
  } else {
    writeFileSync(dest, code, "utf8");
  }
};
