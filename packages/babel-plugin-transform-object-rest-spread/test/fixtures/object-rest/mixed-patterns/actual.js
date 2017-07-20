const defunct = [ { a: 1 }, { b: { c: 2, d: 3 } }, { e: 4 }];

const [{ a }, { b: { ...b } }, { e }] = defunct;
