import defer * as ns from "./dep.cjs";
import sideChannel from "./side-channel.cjs";

expect(ns.then).toBeUndefined();
expect(sideChannel.executed).toBe(false);

expect(ns.prop).toBe(3);
expect(sideChannel.executed).toBe(true);
expect(ns.then).toBeUndefined();
