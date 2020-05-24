var p2 = { 0: "b", 1: "c", 2: "d", length: 2 };

var arr = [];
for (var x of p2) arr.push(x);

expect(arr).toEqual(["b", "c"]);
