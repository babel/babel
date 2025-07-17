const v1 = (effects.push(1), 1) && (effects.push(2), 2) && (effects.push(3), 3);
const v2 = (effects.push(4), 1) && (effects.push(5), 0) && effects.push(6);
const v3 = (effects.push(7), 1) || (effects.push(8), 2);
const v4 = (effects.push(9), null) ?? (effects.push(10), 1);
