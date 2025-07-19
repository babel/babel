const v1 = (effects.push(1), true) ? (effects.push(2), 2) : (effects.push(3), 3);
const v2 = (effects.push(4), false) ? (effects.push(5), 2) : (effects.push(6), 3);
