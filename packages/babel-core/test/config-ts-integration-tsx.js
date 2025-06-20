import { loadPartialConfigSync } from "../lib/index.js";
import path from "node:path";
import semver from "semver";
import { commonJS } from "$repo-utils";
// tsx/cjs/api is a defined sub-export
// eslint-disable-next-line import/no-unresolved, import/extensions
import { register } from "tsx/esm/api";

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
    let unregister;
    beforeAll(() => {
      // Disable tsconfig loading to avoid tsx resolving @babel/* from the `src` directory, where
      // undeclared globals such as the PACKAGE_JSON macro will break
      unregister = register({ tsconfig: false });
    });
    afterAll(() => {
      unregister();
    });

    it("should work with tsx", () => {
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
