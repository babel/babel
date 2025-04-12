function f1(a) {
  (do { if (effects.push(1), a) return 0; (arg) => effects.push(arg) })
  (do { if (effects.push(2), false) return 1; 'arg' });
}

function f2(a) {
  (do { if (effects.push(1), false) return 0; ({ key: (arg) => effects.push(arg) }) })
  [do { if (effects.push(2), a) return 1; 'key' }]
  (do { if (effects.push(3), false) return 2; 'arg' });
}
