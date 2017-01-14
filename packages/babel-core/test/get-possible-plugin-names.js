const assert                 = require("assert");
const getPossiblePluginNames = require("../lib/helpers/get-possible-plugin-names");

describe("getPossiblePluginNames", function () {
  it("adds the babel-plugin prefix", function() {
    assert.deepEqual(getPossiblePluginNames("foobar"), ["babel-plugin-foobar", "foobar"]);
  });
});
