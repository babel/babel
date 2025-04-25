const effects = [];

const v1 = (do { effects.push(1); true }) ? (do { effects.push(2); 2 }) : (do { effects.push(3); 3 });
const v2 = (do { effects.push(4); false }) ? (do { effects.push(5); 2 }) : (do { effects.push(6); 3 });

expect(effects).toEqual([1, 2, 4, 6]);
expect(v1).toBe(2);
expect(v2).toBe(3);
