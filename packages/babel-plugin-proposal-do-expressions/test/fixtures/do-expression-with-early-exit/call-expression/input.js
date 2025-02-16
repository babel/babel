function main() {
  (do { if (effect(1)) return 0; fn })(do { if (effect(2)) return 1; 'arg' });
}

function withThis() {
  (do { if (this.effect(1)) return 0; obj })
  [do { if (this.effect(2)) return 1; 'key' }]
  (do { if (this.effect(3)) return 2; 'arg' });
}
