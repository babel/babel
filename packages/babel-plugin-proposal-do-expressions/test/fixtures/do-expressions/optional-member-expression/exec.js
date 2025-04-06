const effects = [];

const v1 = (do { effects.push(1); null })?.[do { effects.push(2); 0 }][do { effects.push(3); 0 }];
const v2 = (do { effects.push(4); [{x:1}] })?.[do { effects.push(5); 0 }]?.x;

expect(effects).toEqual([1, 4, 5]);
expect(v1).toBe(undefined);
expect(v2).toBe(1);
