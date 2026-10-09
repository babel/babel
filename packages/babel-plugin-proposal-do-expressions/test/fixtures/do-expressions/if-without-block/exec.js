const effects = [];
let x;

if (do { effects.push(0); true }) 
  x = do { effects.push(1); 1 };
else
  x = do { effects.push(2); 2 };

expect(effects).toEqual([0, 1]);
expect(x).toEqual(1);
