var log = [];
var f = () => (log.push("f"), 1);
var g = () => (log.push("g"), 2);
var h = () => (log.push("h"), 3);

var [, a] = [1, 2];
expect(a).toBe(2);

// skipped elements are still evaluated
var [b, , c] = [f(), g(), h()];
expect([b, c]).toEqual([1, 3]);
expect(log).toEqual(["f", "g", "h"]);
