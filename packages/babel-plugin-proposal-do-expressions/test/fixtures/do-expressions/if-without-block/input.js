if (do { effects.push(0); true }) 
  x = do { effects.push(1); 1 };
else
  x = do { effects.push(2); 2 };
