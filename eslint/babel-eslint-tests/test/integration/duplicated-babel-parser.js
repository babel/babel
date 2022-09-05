import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";

describe("https://github.com/babel/babel/issues/12985", () => {
  it("works with different copies of @babel/parser", async () => {
    const engine = new ESLint({ ignore: false });

    await engine.lintFiles(
      path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        `../fixtures/duplicated-babel-parser/a.js`,
      ),
    );
  });
});
