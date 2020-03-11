import eslint from "eslint";
import path from "path";

describe("https://github.com/babel/babel-eslint/issues/558", () => {
  it("doesn't crash with eslint-plugin-import", () => {
    const engine = new eslint.CLIEngine({ ignore: false });
    engine.executeOnFiles(
      ["a.js", "b.js", "c.js"].map(file =>
        path.resolve(__dirname, `../fixtures/eslint-plugin-import/${file}`),
      ),
    );
  });
});
