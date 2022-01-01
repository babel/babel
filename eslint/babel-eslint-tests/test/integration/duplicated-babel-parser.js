import eslint from "eslint";
import path from "path";
import { fileURLToPath } from "url";

describe("https://github.com/babel/babel/issues/12985", () => {
  it("works with different copies of @babel/parser", () => {
    const engine = new eslint.CLIEngine({ ignore: false });
    expect(() =>
      engine.executeOnFiles([
        path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          `../fixtures/duplicated-babel-parser/a.js`,
        ),
      ]),
    ).not.toThrow();
  });
});
