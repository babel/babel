import defer * as ns from "./dep.cjs";
import sideChannel from "./side-channel.cjs";

expect(sideChannel.executed).toBe(false);

const val = ns.prop;
expect(val).toBe(3);

expect(sideChannel.executed).toBe(true);
