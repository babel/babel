function f(x, y) {
  return (effects.push(0), 'a') +
    (do { if (effects.push(1), x) return 'x'; 'b' }) +
    (do { if (effects.push(2), y) return 'y'; 'c' }) +
    (effects.push(3), 'd');
}
