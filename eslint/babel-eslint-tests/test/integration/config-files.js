import { ESLint } from "eslint";
import { fileURLToPath } from "node:url";

describe("Babel config files", () => {
  it("works with babel.config.mjs - ESLint " + ESLint.version, async () => {
    if (parseInt(ESLint.version, 10) >= 9) {
      const engine = new ESLint({
        ignore: false,
        overrideConfigFile: fileURLToPath(
          new URL(
            "../fixtures/mjs-config-file/eslint.config.js",
            import.meta.url,
          ),
        ),
      });
      // eslint-disable-next-line jest/no-conditional-expect
      expect(
        await engine.lintFiles([
          fileURLToPath(
            new URL("../fixtures/mjs-config-file/a.js", import.meta.url),
          ),
        ]),
      ).toMatchObject([{ errorCount: 0, messages: [] }]);
    } else {
      const engine = new ESLint({
        ignore: false,
      });
      // eslint-disable-next-line jest/no-conditional-expect
      expect(
        await engine.lintFiles([
          fileURLToPath(
            new URL(
              "../fixtures/mjs-config-file-eslint-8/a.js",
              import.meta.url,
            ),
          ),
        ]),
      ).toMatchObject([{ errorCount: 0, messages: [] }]);
    }
  });

  it("works with async-requiring ESM plugins", async () => {
    const engine = new ESLint({
      ignore: false,
      overrideConfigFile: fileURLToPath(
        new URL(
          parseInt(ESLint.version, 10) >= 9
            ? "../fixtures/mjs-babel-plugin/eslint.config.js"
            : "../fixtures/mjs-babel-plugin-eslint-8/.eslintrc.js",
          import.meta.url,
        ),
      ),
    });
    expect(
      await engine.lintFiles([
        fileURLToPath(
          new URL("../fixtures/mjs-babel-plugin/a.js", import.meta.url),
        ),
      ]),
    ).toMatchObject([{ errorCount: 0, messages: [] }]);
  });
});
