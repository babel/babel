const effects = [];

var x1, x2;
;[,,,x1 = do { effects.push(1); 'a' }] = [];
;[x2 = do { effects.push(2) }] = [ 1 ];
const [x3] = do { effects.push(3); [] };
const [x4 = do { effects.push(4); 'b' }] = [];

expect(effects).toEqual([1, 3, 4]);
expect(x1).toEqual('a');
expect(x2).toEqual(1);
expect(x3).toEqual(undefined);
expect(x4).toEqual('b');
