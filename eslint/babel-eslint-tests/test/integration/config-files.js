import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";
import { USE_ESM } from "$repo-utils";

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
