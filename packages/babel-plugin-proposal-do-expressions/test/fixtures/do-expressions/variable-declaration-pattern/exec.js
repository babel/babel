var effects = [];

var {
  [ do { effects.push(1) } ]: {
    [ do { effects.push(2) } ]: x = do { effects.push(3) }
  } = (do { effects.push(4) }, {})
} = do { effects.push(5) };

expect(effects).toEqual([5, 1, 4, 2, 3]);
