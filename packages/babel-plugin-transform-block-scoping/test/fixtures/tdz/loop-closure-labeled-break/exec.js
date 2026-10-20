var f = [];
outer: for (let i = 0; i < 5; i++) {
  f.push(() => i);
  while (true) {
    if (i === 2) break outer;
    break;
  }
}
expect(f.map(g => g())).toEqual([0, 1, 2]);
