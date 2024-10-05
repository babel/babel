import { ESLint } from "eslint";
import { fileURLToPath } from "url";

describe("https://github.com/babel/babel-eslint/issues/558", () => {
  it(
    "doesn't crash with eslint-plugin-import - ESLint " + ESLint.version,
    async () => {
      if (parseInt(ESLint.version, 10) >= 9) {
        const engine = new ESLint({
          ignore: false,
          overrideConfigFile: fileURLToPath(
            new URL(
              "../fixtures/eslint-plugin-import/eslint.config.mjs",
              import.meta.url,
            ),
          ),
        });
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          await engine.lintFiles(
            ["a.js", "b.js", "c.js"].map(file =>
              fileURLToPath(
                new URL(
                  `../fixtures/eslint-plugin-import/${file}`,
                  import.meta.url,
                ),
              ),
            ),
          ),
        ).toMatchObject([
          { errorCount: 0, messages: [] },
          { errorCount: 0, messages: [] },
          { errorCount: 0, messages: [] },
        ]);
      } else {
        const engine = new ESLint({ ignore: false });
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          await engine.lintFiles(
            ["a.js", "b.js", "c.js"].map(file =>
              fileURLToPath(
                new URL(
                  `../fixtures/eslint-plugin-import-eslint-8/${file}`,
                  import.meta.url,
                ),
              ),
            ),
          ),
        ).toMatchObject([
          { errorCount: 0, messages: [] },
          { errorCount: 0, messages: [] },
          { errorCount: 0, messages: [] },
        ]);
      }
    },
  );
});
