import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";

describe("https://github.com/babel/babel-eslint/issues/558", () => {
  it("doesn't crash with eslint-plugin-import", async () => {
    const engine = new ESLint({ ignore: false });

    await engine.lintFiles(
      ["a.js", "b.js", "c.js"].map(file =>
        path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          `../fixtures/eslint-plugin-import/${file}`,
        ),
      ),
    );
  });
});
