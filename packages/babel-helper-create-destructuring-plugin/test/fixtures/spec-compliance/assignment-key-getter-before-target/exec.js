// The property name (and its getters) is evaluated before the target.
const log = [];
let obj = { set c(v) { log.push("set1"); } };
const a = {
  get b() {
    log.push("key");
    obj = { set c(v) { log.push("set2"); } };
    return "k";
  },
};
const e = { k: 1 };
({ [a.b]: obj.c } = e);
expect(log).toEqual(["key", "set2"]);
