var f = [];
a: b: for (let i = 0; i < 6; i++) {
  f.push(() => i);
  c: d: for (let j = 0; j < 2; j++) {
    f.push(() => i * 10 + j);
    if (i === 1) continue a;
    if (i === 2) continue b;
    if (i === 3) break d;
    if (i === 4) break b;
    if (j === 0) continue c;
  }
}
expect(f.map(g => g())).toEqual([0, 0, 1, 1, 10, 2, 20, 3, 30, 4, 40]);
