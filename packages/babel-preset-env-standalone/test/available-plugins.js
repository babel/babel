import expectedAvailablePlugins from "@babel/preset-env/lib/available-plugins";
import actualAvailablePlugins from "../lib/available-plugins";
import difference from "lodash/difference";
describe("available-plugins", () => {
  it("should be a superset of available-plugins in @babel/preset-env", () => {
    const expectedPluginList = Object.keys(expectedAvailablePlugins);
    expectedPluginList.sort();

    const actualPluginList = Object.keys(actualAvailablePlugins);
    actualPluginList.sort();
    // If this test is failed, add the missing plugins to ./src/available-plugins
    expect(difference(expectedPluginList, actualPluginList)).toEqual([]);
  });
});
