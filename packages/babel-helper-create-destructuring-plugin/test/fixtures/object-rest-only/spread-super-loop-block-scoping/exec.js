const objects = [];
let i = 0;
while (i < 2 && objects.push({ ...{}, __proto__: { x: i }, m() { return super.x; } })) {
  i++;
}
outer: for (var j = 0; j < 2 && objects.push({ ...{}, __proto__: { x: j }, m() { return super.x; } }); j++) {
  objects.push({ ...{}, __proto__: { x: j + 2 }, m() { return super.x; } });
  continue outer;
}
do {
  i++;
} while (i < 5 && objects.push({ ...{}, __proto__: { x: i }, m() { return super.x; } }));
expect(objects.map(object => object.m())).toEqual([0, 1, 0, 2, 1, 3, 3, 4]);
