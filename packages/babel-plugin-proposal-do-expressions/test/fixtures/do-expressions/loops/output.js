for (let i = (effects.push(1), 0); i < (effects.push(2), 3); effects.push(4), i++) {
  effects.push(3);
}
for (let i in effects.push(1), {
  x: 1,
  y: 2
}) {
  effects.push(i);
}
for (let i of (effects.push(1), [2, 3])) {
  effects.push(i);
}
let x = 0;
while (effects.push(1), x < 3) {
  effects.push(2);
  x++;
}
let y = 0;
do {
  effects.push(1);
  y++;
} while (effects.push(2), y < 3);
