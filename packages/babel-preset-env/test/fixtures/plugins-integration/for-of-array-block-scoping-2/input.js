function x(e){
  const r = [];
  for (const s of e) {
    e = null;
    r.push(s);
  }
  return r;
}

expect(x([1, 2, 3])).toEqual([1, 2, 3]);
