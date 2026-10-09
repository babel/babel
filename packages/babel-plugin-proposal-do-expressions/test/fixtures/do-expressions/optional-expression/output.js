const v1 = (effects.push(1), null)?.[effects.push(2), 0][effects.push(3), 0];
const v2 = (effects.push(4), [{
  x: 1
}])?.[effects.push(5), 0]?.x;
const v3 = (effects.push(6), [])[effects.push(7), 0]?.();
const v4 = (effects.push(8), null)?.[effects.push(9), 0](effects.push(10));
const v5 = (effects.push(11), {
  s: x => (effects.push(12), x)
}).s?.((effects.push(13), 'a'));
