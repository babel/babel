import { ESLint } from "eslint";
import { fileURLToPath } from "node:url";

describe("@babel/eslint-plugin", () => {
  it("should work with ESLint " + ESLint.version, async () => {
    const engine = new ESLint({
      ignore: false,
      overrideConfigFile: fileURLToPath(
        new URL(
          "../fixtures/babel-eslint-plugin/custom.eslint.config.mjs",
          import.meta.url,
        ),
      ),
    });
    expect(
      await engine.lintFiles(
        ["valid.js"].map(file =>
          fileURLToPath(
            new URL(`../fixtures/babel-eslint-plugin/${file}`, import.meta.url),
          ),
        ),
      ),
    ).toMatchObject([{ errorCount: 0, messages: [] }]);
  });
});
