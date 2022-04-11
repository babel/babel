var p2 = { 0: "a", 2: "c", length: 3 };

var arr = [...p2, "d"];

expect(arr).toEqual(["a", undefined, "c", "d"]);
expect(1 in arr).toBe(true); // Not holey
