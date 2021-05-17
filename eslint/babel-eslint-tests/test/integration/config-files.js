import eslint from "eslint";
import path from "path";
import { fileURLToPath } from "url";

describe("Babel config files", () => {
  const babel8 = process.env.BABEL_8_BREAKING ? it : it.skip;

  babel8("works with babel.config.mjs", () => {
    const engine = new eslint.CLIEngine({ ignore: false });
    expect(
      engine.executeOnFiles([
        path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          `../fixtures/mjs-config-file/a.js`,
        ),
      ]),
    ).toMatchObject({ errorCount: 0 });
  });
});
