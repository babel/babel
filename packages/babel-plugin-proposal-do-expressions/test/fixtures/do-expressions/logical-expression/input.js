const v1 = do { effects.push(1); 1 } && do { effects.push(2); 2 } && do { effects.push(3); 3 };
const v2 = do { effects.push(4); 1 } && do { effects.push(5); 0 } && do { effects.push(6); };
const v3 = do { effects.push(7); 1 } || do { effects.push(8); 2 };
const v4 = do { effects.push(9); null } ?? do { effects.push(10); 1 };
