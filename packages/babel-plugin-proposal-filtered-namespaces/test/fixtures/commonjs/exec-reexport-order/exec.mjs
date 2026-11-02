import log from "./log.cjs";
export { x } as ns from "./a.cjs";
import "./b.cjs";

expect(log).toEqual(["a", "b"]);
