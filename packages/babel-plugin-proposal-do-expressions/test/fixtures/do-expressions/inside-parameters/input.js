function func({ [do { effects.push(1); 'key'}]: x } = do { effects.push(2); value }) {}

const arrow = ({ [do { effects.push(1); 'key'}]: x } = do { effects.push(2); value }) => {}
