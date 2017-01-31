import assert from "assert";
import getPossiblePresetNames from "../lib/helpers/get-possible-preset-names";

describe("getPossiblePresetNames", function () {
  it("adds the babel-preset prefix", function() {
    assert.deepEqual(getPossiblePresetNames("foobar"), ["babel-preset-foobar", "foobar"]);
  });

  it("inserts babel-preset after @org/", function() {
    assert.deepEqual(getPossiblePresetNames("@babel/es2015"), [
      "babel-preset-@babel/es2015",
      "@babel/es2015",
      "@babel/babel-preset-es2015"
    ]);

    assert.deepEqual(getPossiblePresetNames("@babel/react/optimizations"), [
      "babel-preset-@babel/react/optimizations",
      "@babel/react/optimizations",
      "@babel/babel-preset-react/optimizations"
    ]);
  });
});
