import { transformAsync } from "@babel/core";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { styleText } from "node:util";
import { log } from "./scripts/utils/logger.ts";

export async function transform(src: string, dest: string, opts: any = {}) {
  mkdirSync(path.dirname(dest), { recursive: true });
  log(`Compiling '${styleText("cyan", src)}'...`);
  const content = readFileSync(src, { encoding: "utf8" });
  const { code } = (await transformAsync(content, {
    filename: src,
    sourceFileName: path.relative(path.dirname(dest), src),
    caller: {
      // We have wrapped packages/babel-core/src/config/files/configuration.js with feature detection
      supportsDynamicImport: true,
      name: "babel-worker",
    },
    ...opts,
  }))!;

  if (code) {
    writeFileSync(dest, code, "utf8");
  }
}
