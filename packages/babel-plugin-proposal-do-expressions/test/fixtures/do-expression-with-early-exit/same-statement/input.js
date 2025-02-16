function main(a, b) {
  return effect(0) +
    (do { if (effect(1)) return 0; a }) +
    (do { if (effect(2)) return 1; 'arg' }) +
    effect(3);
}
