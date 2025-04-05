const effects = [];

const v1 = do { effects.push(1); 1 } && do { effects.push(2); 2 } && do { effects.push(3); 3 };
const v2 = do { effects.push(4); 1 } && do { effects.push(5); 0 } && do { effects.push(6); };
const v3 = do { effects.push(7); 1 } || do { effects.push(8); 2 };
const v4 = do { effects.push(9); null } ?? do { effects.push(10); 1 };

expect(effects).toEqual([1, 2, 3, 4, 5, 7, 9, 10]);
expect(v1).toEqual(3);
expect(v2).toEqual(0);
expect(v3).toEqual(1);
expect(v4).toEqual(1);
