var test = {
  expectation: {
    registers: [
      ["a", 1, 2],
      ["b", 3, 4],
    ],
  },
};

for (var [ name, before, after ] of test.expectation.registers) {

}

expect([name, before, after]).toEqual(["b", 3, 4]);
name = before = after = undefined;

for ([ name, before, after ] of test.expectation.registers) {

}

expect([name, before, after]).toEqual(["b", 3, 4]);

var seen = [];
for (var [name, before, after] of test.expectation.registers) {
  seen.push(name + before + after);
}
expect(seen).toEqual(["a12", "b34"]);
