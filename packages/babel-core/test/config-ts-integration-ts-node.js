import { loadPartialConfigSync } from "../lib/index.js";
import path from "node:path";
import { commonJS } from "$repo-utils";

const { __dirname, require } = commonJS(import.meta.url);

// The integration tests should not be mixed with other tests because the `register` function
// will affect node's built-in ts support.
describe("@babel/core config ts-node integration", () => {
  let service;
  beforeAll(() => {
    service = require("ts-node").register({
      experimentalResolver: true,
      compilerOptions: {
        module: "CommonJS",
      },
    });
    service.enabled(true);
  });
  afterAll(() => {
    service.enabled(false);
  });
  it("should work with ts-node", async () => {
    require(
      path.join(
        __dirname,
        "fixtures/config-ts/simple-cts-with-ts-node/babel.config.cts",
      ),
    );

    const config = loadPartialConfigSync({
      configFile: path.join(
        __dirname,
        "fixtures/config-ts/simple-cts-with-ts-node/babel.config.cts",
      ),
    });

    expect(config.options.targets).toMatchInlineSnapshot(`
        Object {
          "node": "12.0.0",
        }
      `);

    expect(config.options.sourceRoot).toMatchInlineSnapshot(`"/a/b"`);
  });
});
