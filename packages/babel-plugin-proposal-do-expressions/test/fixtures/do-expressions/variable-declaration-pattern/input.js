var {
  [ do { effects.push(1) } ]: {
    [ do { effects.push(2) } ]: x = do { effects.push(3) }
  } = (do { effects.push(4) }, {})
} = do { effects.push(5) };
