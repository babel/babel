import assert from "assert";
import { Hub } from "../lib";

describe("hub", function() {
  it("default buildError should return TypeError", function() {
    const hub = new Hub();
    const msg = "test_msg";
    assert.deepEqual(hub.buildError(null, msg), new TypeError(msg));
  });
});
