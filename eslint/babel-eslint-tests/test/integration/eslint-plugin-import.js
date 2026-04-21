import { ESLint } from "eslint";
import { fileURLToPath } from "node:url";

describe("https://github.com/babel/babel-eslint/issues/558", () => {
  it(
    "doesn't crash with eslint-plugin-import - ESLint " + ESLint.version,
    async () => {
      const engine = new ESLint({
        ignore: false,
        overrideConfigFile: fileURLToPath(
          new URL(
            "../fixtures/eslint-plugin-import/custom.eslint.config.mjs",
            import.meta.url,
          ),
        ),
      });
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
    },
  );
});
