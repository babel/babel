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
  it(
    "flatten configs.recommended should work with ESLint " + ESLint.version,
    async () => {
      const fixtureUrl = new URL(
        "../fixtures/babel-eslint-plugin-flatten-configs-recommended/",
        import.meta.url,
      );
      const engine = new ESLint({
        ignore: false,
        overrideConfigFile: fileURLToPath(
          new URL("./custom.eslint.config.mjs", fixtureUrl),
        ),
      });
      expect(
        await engine.lintFiles(
          fileURLToPath(new URL("./valid.js", fixtureUrl)),
        ),
      ).toMatchObject([{ errorCount: 0, messages: [] }]);
      expect(
        await engine.lintFiles(
          fileURLToPath(new URL("./invalid.js", fixtureUrl)),
        ),
      ).toMatchObject([
        {
          errorCount: 2,
          messages: [
            {
              message: "'a' is assigned a value but never used.",
              ruleId: "no-unused-vars",
              severity: 2,
            },
            {
              message: "Empty block statement.",
              ruleId: "babel/no-empty",
              severity: 2,
            },
          ],
        },
      ]);
    },
  );
  it(
    "flatten configs.all with override should work with ESLint " +
      ESLint.version,
    async () => {
      const fixtureUrl = new URL(
        "../fixtures/babel-eslint-plugin-flatten-configs-all-override/",
        import.meta.url,
      );
      const engine = new ESLint({
        ignore: false,
        overrideConfigFile: fileURLToPath(
          new URL("./custom.eslint.config.mjs", fixtureUrl),
        ),
      });
      expect(
        await engine.lintFiles(
          fileURLToPath(new URL("./valid.js", fixtureUrl)),
        ),
      ).toMatchObject([{ errorCount: 0, messages: [] }]);
      expect(
        await engine.lintFiles(
          fileURLToPath(new URL("./invalid.js", fixtureUrl)),
        ),
      ).toMatchObject([
        {
          errorCount: 1,
          warningCount: 1,
          messages: [
            {
              message: "'a' is assigned a value but never used.",
              ruleId: "no-unused-vars",
              severity: 2,
            },
            {
              message: "Empty block statement.",
              ruleId: "babel/no-empty",
              severity: 1,
            },
          ],
        },
      ]);
    },
  );
  it(
    "flatten configs.all with alternative override should work with ESLint " +
      ESLint.version,
    async () => {
      const fixtureUrl = new URL(
        "../fixtures/babel-eslint-plugin-flatten-configs-all-override-alt/",
        import.meta.url,
      );
      const engine = new ESLint({
        ignore: false,
        overrideConfigFile: fileURLToPath(
          new URL("./custom.eslint.config.mjs", fixtureUrl),
        ),
      });
      expect(
        await engine.lintFiles(
          fileURLToPath(new URL("./valid.js", fixtureUrl)),
        ),
      ).toMatchObject([{ errorCount: 0, messages: [] }]);
      expect(
        await engine.lintFiles(
          fileURLToPath(new URL("./invalid.js", fixtureUrl)),
        ),
      ).toMatchObject([
        {
          errorCount: 1,
          warningCount: 1,
          messages: [
            {
              message: "'a' is assigned a value but never used.",
              ruleId: "no-unused-vars",
              severity: 2,
            },
            {
              message: "Empty block statement.",
              ruleId: "babel/no-empty",
              severity: 1,
            },
          ],
        },
      ]);
    },
  );
});
