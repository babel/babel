function x(e){
  const r = [];
  for (const s of e) {
    const e = s;
    r.push(e);
  }
  return r;
}

expect(x([1, 2, 3])).toEqual([1, 2, 3]);
