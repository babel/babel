// https://github.com/babel/babel/issues/18359
const events = [];
const target = {};
const source = {
  get nested() {
    events.push("source");
    return { x: 7 };
  },
};
({ nested: { x: target[(events.push("target"), "x")] } } = source);
expect(events).toEqual(["source", "target"]);
expect(target.x).toBe(7);
