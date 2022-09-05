import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

let USE_ESM = false;
try {
  const type = fs
    .readFileSync(new URL("../../../../.module-type", import.meta.url), "utf-8")
    .trim();
  USE_ESM = type === "module";
} catch {}

describe("Babel config files", () => {
  const itESM = USE_ESM ? it : it.skip;
  const itNode12upNoESM =
    USE_ESM || parseInt(process.versions.node) < 12 ? it.skip : it;

  itESM("works with babel.config.mjs", async () => {
    const engine = new ESLint({ ignore: false });
    expect(
      await engine.lintFiles([
        path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          `../fixtures/mjs-config-file/a.js`,
        ),
      ]),
    ).toMatchObject([{ errorCount: 0 }]);
  });

  itNode12upNoESM(
    "experimental worker works with babel.config.mjs",
    async () => {
      const engine = new ESLint({ ignore: false });
      expect(
        await engine.lintFiles(
          path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            `../fixtures/mjs-config-file-babel-7/a.js`,
          ),
        ),
      ).toMatchObject([{ errorCount: 0 }]);
    },
  );
});
