import { ESLint } from "eslint";
import { fileURLToPath } from "url";

describe("https://github.com/babel/babel/issues/12985", () => {
  it(
    "works with different copies of @babel/parser - ESLint " + ESLint.version,
    async () => {
      if (parseInt(ESLint.version, 10) >= 9) {
        const engine = new ESLint({
          ignore: false,
          overrideConfigFile: fileURLToPath(
            new URL(
              "../fixtures/duplicated-babel-parser/eslint.config.cjs",
              import.meta.url,
            ),
          ),
        });
        // eslint-disable-next-line jest/no-conditional-expect
        expect(
          await engine.lintFiles([
            fileURLToPath(
              new URL(
                "../fixtures/duplicated-babel-parser/a.js",
                import.meta.url,
              ),
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
                "../fixtures/duplicated-babel-parser-eslint-8/a.js",
                import.meta.url,
              ),
            ),
          ]),
        ).toMatchObject([{ errorCount: 0, messages: [] }]);
      }
    },
  );
});
