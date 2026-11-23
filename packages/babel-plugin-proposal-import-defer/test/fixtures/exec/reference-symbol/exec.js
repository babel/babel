import defer * as ns from "./dep.cjs";
import sideChannel from "./side-channel.cjs";

expect(ns[Symbol.iterator]).toBeUndefined();
expect(Symbol.iterator in ns).toBe(false);
expect(Object.getOwnPropertyDescriptor(ns, Symbol.iterator)).toBeUndefined();
expect(sideChannel.executed).toBe(false);

expect(ns.prop).toBe(3);
expect(sideChannel.executed).toBe(true);
expect(ns[Symbol.iterator]).toBeUndefined();
