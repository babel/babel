var p2 = { 0: "a", 2: "c", length: 3 };

var arr = [];
for (var x of p2) arr.push(x);

expect(arr).toEqual(["a", undefined, "c"]);
expect(1 in arr).toBe(true); // Not holey
