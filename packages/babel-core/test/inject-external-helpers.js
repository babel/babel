import * as babel from "../lib/index";
import assert from "assert";

describe("buildExternalHelpers", function() {
  it("injects external helpers in global context", function() {
    babel.injectExternalHelpers();
    assert.ok(global.babelHelpers);
  });
});
