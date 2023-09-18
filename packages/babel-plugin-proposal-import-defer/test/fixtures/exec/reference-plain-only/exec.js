import defer * as ns from "./dep.cjs";
import sideChannel from "./side-channel.cjs";

expect(sideChannel.executed).toBe(false);

const copy = ns;
expect(typeof copy).toBe("object");
expect(sideChannel.executed).toBe(false);

const val = Reflect.get(ns, "prop");
expect(val).toBe(3);

expect(sideChannel.executed).toBe(true);
