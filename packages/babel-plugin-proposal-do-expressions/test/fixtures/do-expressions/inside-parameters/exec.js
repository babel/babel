function func({ [do { effects.push(1); 'key'}]: x } = do { effects.push(2); value }) {}

const arrow = ({ [do { effects.push(1); 'key'}]: x } = do { effects.push(2); value }) => {}

var value = { key: 1 }

var effects = [];
func();
expect(effects).toEqual([2, 1]);

effects = [];
arrow();
expect(effects).toEqual([2, 1]);
