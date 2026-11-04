var tests = [], updates = [], bodies = [];
for (let i = 0; tests.push(() => i), i < 6; updates.push(() => i), i++) {
  if (i % 2) continue;
  bodies.push(() => i);
  if (i === 4) break;
}
expect(tests.map(g => g())).toEqual([0, 1, 2, 3, 4]);
expect(updates.map(g => g())).toEqual([1, 2, 3, 4]);
expect(bodies.map(g => g())).toEqual([0, 2, 4]);
