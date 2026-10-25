import test from "./test.txt" with { type: "text" };
import fs from "node:fs";

expect(test.length).toBe(4);
// sanity check
expect(
  fs.readFileSync(require.resolve("./test.txt")).toString()
).toBe("\xEF\xBB\xBFtest");
