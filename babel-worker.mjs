// @ts-check

import { transformAsync } from "@babel/core";
import { mkdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { log } from "./scripts/utils/logger.js";
import colors from "node-style-text";

/** * Check if the source file needs to be compiled based on its modification time
 * compared to the destination file.
 * If the destination file does not exist, it will return true to indicate that
 * compilation is needed.
 * @param {string} src - The source file path.
 * @param {string} dest - The destination file path.
 * @returns {boolean}
 */
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

export async function transform(src, dest, opts = {}) {
  mkdirSync(path.dirname(dest), { recursive: true });
  if (!needCompile(src, dest)) {
    return;
  }
  log(`Compiling '${colors.cyan(src)}'...`);
  const content = readFileSync(src, { encoding: "utf8" });
  const { code, map } = await transformAsync(content, {
    filename: src,
    sourceFileName: path.relative(path.dirname(dest), src),
    caller: {
      // We have wrapped packages/babel-core/src/config/files/configuration.js with feature detection
      // @ts-expect-error improve caller metadata typings
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
    // @ts-expect-error code must not be for our project source
    writeFileSync(dest, code, "utf8");
  }
}
