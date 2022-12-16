import { loadPartialConfigSync } from "../lib/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { register } from "ts-node";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

describe("@babel/core config with ts", () => {
  it("should work with simple .cts", () => {
    const config = loadPartialConfigSync({
      configFile: path.join(
        __dirname,
        "fixtures/config-ts/simple-cts/babel.config.cts",
      ),
    });

    expect(config.options.targets).toMatchInlineSnapshot(`
      Object {
        "node": "12.0.0",
      }
    `);
  });

  it("should throw with invalid .ts register", () => {
    require.extensions[".ts"] = () => {
      throw new Error("Not support .ts.");
    };
    expect(() => {
      loadPartialConfigSync({
        configFile: path.join(
          __dirname,
          "fixtures/config-ts/invalid-cts-register/babel.config.cts",
        ),
      });
    }).toThrowErrorMatchingInlineSnapshot(`"Unexpected identifier 'config'"`);
    delete require.extensions[".ts"];
  });

  it("should work with ts-node", () => {
    const service = register({
      experimentalResolver: true,
      compilerOptions: {
        module: "CommonJS",
      },
    });
    service.enabled(true);

    require(path.join(
      __dirname,
      "fixtures/config-ts/simple-cts-with-ts-node/babel.config.cts",
    ));

    const config = loadPartialConfigSync({
      configFile: path.join(
        __dirname,
        "fixtures/config-ts/simple-cts-with-ts-node/babel.config.cts",
      ),
    });

    service.enabled(false);

    expect(config.options.targets).toMatchInlineSnapshot(`
      Object {
        "node": "12.0.0",
      }
    `);
  });
});
