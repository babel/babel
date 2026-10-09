const v1 = (do { effects.push(1); null })?.[do { effects.push(2); 0 }][do { effects.push(3); 0 }];
const v2 = (do { effects.push(4); [{x:1}] })?.[do { effects.push(5); 0 }]?.x;

const v3 = (do { effects.push(6); [] })[do { effects.push(7); 0 }]?.();
const v4 = (do { effects.push(8); null })?.[do { effects.push(9); 0 }](effects.push(10));
const v5 = (do { effects.push(11); ({s: (x) => do { effects.push(12); x }}) }).s?.(do { effects.push(13); 'a'});
