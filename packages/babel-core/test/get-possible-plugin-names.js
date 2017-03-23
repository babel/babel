import assert from "assert";
import getPossiblePluginNames from "../lib/config/helpers/get-possible-plugin-names";

describe("getPossiblePluginNames", function () {
  it("adds the babel-plugin prefix", function() {
    assert.deepEqual(getPossiblePluginNames("foobar"), ["babel-plugin-foobar", "foobar"]);
  });
});
