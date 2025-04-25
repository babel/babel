var effects = [];

for (
  let i = do { effects.push(1); 0 } ;
  i < do { effects.push(2); 3 } ;
  do { effects.push(4); i++ }
) {
  effects.push(3);
}

expect(effects).toEqual([1, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2]);
effects.length = 0;

for (let i in do { effects.push(1); ({ x: 1, y: 2 }) }) {
  effects.push(i);
}

expect(effects).toEqual([1, 'x', 'y']);
effects.length = 0;

for (let i of do { effects.push(1); [2, 3] }) {
  effects.push(i);
}

expect(effects).toEqual([1, 2, 3]);
effects.length = 0;

let x = 0;
while (do { effects.push(1); x < 3 }) {
  effects.push(2);
  x++;
}

expect(effects).toEqual([1, 2, 1, 2, 1, 2, 1]);
effects.length = 0;

let y = 0;
do {
  effects.push(1);
  y++;
}
while (do { effects.push(2); y < 3 });

expect(effects).toEqual([1, 2, 1, 2, 1, 2]);
