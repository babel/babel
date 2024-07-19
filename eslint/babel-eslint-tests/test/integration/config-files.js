import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";
import { itESM, itGteNoESM } from "$repo-utils";

describe("Babel config files", () => {
  const nodeGte12NoESM = itGteNoESM("12.0.0");

  itESM("works with babel.config.mjs - ESLint " + ESLint.version, async () => {
    if (parseInt(ESLint.version, 10) >= 9) {
      const engine = new ESLint({
        ignore: false,
        overrideConfigFile: path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          `../fixtures/mjs-config-file/eslint.config.js`,
        ),
      });
      expect(
        await engine.lintFiles([
          path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            `../fixtures/mjs-config-file/a.js`,
          ),
        ]),
      ).toMatchObject([{ errorCount: 0, messages: [] }]);
    } else {
      const engine = new ESLint({
        ignore: false,
      });
      expect(
        await engine.lintFiles([
          path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            `../fixtures/mjs-config-file-eslint-8/a.js`,
          ),
        ]),
      ).toMatchObject([{ errorCount: 0, messages: [] }]);
    }
  });

  nodeGte12NoESM(
    "experimental worker works with babel.config.mjs - ESLint " +
      ESLint.version,
    async () => {
      if (parseInt(ESLint.version, 10) >= 9) {
        const engine = new ESLint({
          ignore: false,
          overrideConfigFile: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            `../fixtures/mjs-config-file/eslint.config.js`,
          ),
        });
        expect(
          await engine.lintFiles([
            path.resolve(
              path.dirname(fileURLToPath(import.meta.url)),
              `../fixtures/mjs-config-file/a.js`,
            ),
          ]),
        ).toMatchObject([{ errorCount: 0, messages: [] }]);
      } else {
        const engine = new ESLint({
          ignore: false,
        });
        expect(
          await engine.lintFiles([
            path.resolve(
              path.dirname(fileURLToPath(import.meta.url)),
              `../fixtures/mjs-config-file-eslint-8/a.js`,
            ),
          ]),
        ).toMatchObject([{ errorCount: 0, messages: [] }]);
      }
    },
  );
});
