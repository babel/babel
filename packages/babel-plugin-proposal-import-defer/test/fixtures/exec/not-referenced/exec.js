import defer * as ns from "./dep.cjs";
import sideChannel from "./side-channel.cjs";

expect(sideChannel.executed).toBe(false);
