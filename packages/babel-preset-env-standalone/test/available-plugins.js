import expectedAvailablePlugins from "@babel/preset-env/lib/available-plugins";
import difference from "lodash/difference";

// build-babel-preset-env-standalone in CI coverage tests is skipped, so we skip this test as well
(process.env.TEST_TYPE === "cov" ? describe.skip : describe)(
  "available-plugins",
  () => {
    const actualAvailablePlugins = require("../lib/available-plugins").default;
    it("should be a superset of available-plugins in @babel/preset-env", () => {
      const expectedPluginList = Object.keys(expectedAvailablePlugins).filter(
        // TODO: Bring in bugfix plugins
        name => !name.startsWith("bugfix/"),
      );
      expectedPluginList.sort();

      const actualPluginList = Object.keys(actualAvailablePlugins);
      actualPluginList.sort();
      // If this test is failed, add the missing plugins to ./src/available-plugins
      expect(difference(expectedPluginList, actualPluginList)).toEqual([]);
    });
  },
);
