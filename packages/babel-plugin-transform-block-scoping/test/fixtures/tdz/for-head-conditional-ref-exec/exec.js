const out = [];

for (const a of [1, 2]) {
  if (a > 1) out.push(a);
  else out.push(-a);
}

for (const b in { k: 1 }) {
  try {
    throw 0;
  } catch {
    out.push(b);
  }
}

for (let c = 0; c < 2 && (c ? out.push("test " + c) : true); c++) {
  for (const d of [c]) if (d) out.push(d);
}

for (let e of [1]) {
  if (e) e = 10;
  out.push(e);
}

expect(out).toEqual([-1, 2, "k", "test 1", 1, 10]);

// Bindings declared in the body are still checked
expect(() => {
  for (const f of [1]) {
    if (f) g;
    let g = 2;
  }
}).toThrow(ReferenceError);
