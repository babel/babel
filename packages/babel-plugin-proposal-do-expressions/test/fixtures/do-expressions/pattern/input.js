var x1, x2;
;[,,,x1 = do { effects.push(1); 'a' }] = [];
;[x2 = do { effects.push(2) }] = [ 1 ];
const [x3] = do { effects.push(3); [] };
const [x4 = do { effects.push(4); 'b' }] = [];
