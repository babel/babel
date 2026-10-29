// The left side of a for-in/of is evaluated by each iteration: each object
// created by a default value has its own home object.
function check(objects) {
  Object.setPrototypeOf(objects[0], { x: 1 });
  Object.setPrototypeOf(objects[1], { x: 2 });
  expect(objects.map(o => o.m())).toEqual([1, 2]);
}

const ofObjects = [];
for (const { q = { m() { return super.x; }, ...{} } } of [{}, {}]) {
  ofObjects.push(q);
}
check(ofObjects);

const inObjects = [];
for (var { q = { m() { return super.x; }, ...{} } } in { a: 1, b: 2 }) {
  inObjects.push(q);
}
check(inObjects);

const assigned = [];
let r;
for ({ r = { m() { return super.x; }, ...{} } } of [{}, {}]) assigned.push(r);
check(assigned);
