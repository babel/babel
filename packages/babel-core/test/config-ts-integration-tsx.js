import { loadPartialConfigSync } from "../lib/index.js";
import path from "node:path";
import semver from "semver";
import { commonJS } from "$repo-utils";

const { __dirname, require } = commonJS(import.meta.url);

// We skip older versions of node testing for two reasons.
// 1. tsx and ts don't support the old version of node.
// 2. In the old version of node, jest has been registered in `require.extensions`, which will cause babel to disable the transforming as expected.
const shouldSkip = semver.lt(process.version, "18.0.0");

(shouldSkip ? describe : describe.skip)(
  "@babel/core config with ts [dummy]",
  () => {
    it("dummy", () => {
      expect(1).toBe(1);
    });
  },
);

// The integration tests should not be mixed with other tests because the `unregister` function
// will affect node's built-in ts support.
(shouldSkip ? describe.skip : describe)(
  "@babel/core config tsx integration",
  () => {
    let tsx, unregister;
    beforeAll(() => {
      // tsx/cjs/api is a defined sub-export
      // eslint-disable-next-line import/extensions
      tsx = require("tsx/cjs/api");
      unregister = tsx.register();
    });
    afterAll(() => {
      unregister();
    });

    it("should work with tsx", async () => {
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
  },
);
