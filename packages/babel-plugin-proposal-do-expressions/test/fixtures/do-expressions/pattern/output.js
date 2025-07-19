var x1, x2;
;
[,,, x1 = (effects.push(1), 'a')] = [];
;
[x2 = effects.push(2)] = [1];
const [x3] = (effects.push(3), []);
const [x4 = (effects.push(4), 'b')] = [];
