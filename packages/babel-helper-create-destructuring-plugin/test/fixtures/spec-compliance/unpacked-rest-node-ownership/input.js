const value = {};
const [first, ...rest] = [value, value];
const [hole, ...tail] = [, value, value];
use(first, rest, hole, tail);
