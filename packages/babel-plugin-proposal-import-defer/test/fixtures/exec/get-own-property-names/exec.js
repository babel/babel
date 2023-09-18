import defer * as ns from "./dep.cjs";
import sideChannel from "./side-channel.cjs";

expect(sideChannel.executed).toBe(false);

// NOTE: In the current proposal, Object.getOwnPropertyNames does
// not trigger evaluation. However, this behavior is impossible
// to emulate given that we are importing a CommonJS module.
// In the proposal, Object.keys does tirgger evaluation because
// it internally performs .[[Get]] on the namespace object.

const names = Object.getOwnPropertyNames(ns);
expect(sideChannel.executed).toBe(true);
expect(names).toEqual(["__esModule", "prop"]);
