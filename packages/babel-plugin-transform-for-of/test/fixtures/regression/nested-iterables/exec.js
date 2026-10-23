function* values() {
  yield 3;
  yield 7;
}

var innerIterable;
var visited = [];

for (var outer of values()) {
  innerIterable = values();
  for (var inner of innerIterable) {
    visited.push([outer, inner]);
  }
}

expect(visited).toEqual([
  [3, 3],
  [3, 7],
  [7, 3],
  [7, 7],
]);
