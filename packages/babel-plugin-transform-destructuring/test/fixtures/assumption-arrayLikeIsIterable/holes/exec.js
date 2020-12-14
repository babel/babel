var o = { 0: "a", 2: "c", length: 3 };

var [...rest] = o;

expect(rest).toEqual(["a", undefined, "c"]);
expect(1 in rest).toBe(true); // Not holey
