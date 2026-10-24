const o = {};
let names;
for (let {} = o, f = function () {}, C = class {}, g = () => {}; ;) {
  names = [f.name, C.name, g.name];
  break;
}
expect(names).toEqual(["f", "C", "g"]);

const log = [];
const src = { get x() { log.push("x"); return 1; } };
for (var { x } = src, {} = (log.push("check"), src), h = (log.push("h"), function () {}); ;) break;
expect(log).toEqual(["x", "check", "h"]);
expect(h.name).toBe("");
