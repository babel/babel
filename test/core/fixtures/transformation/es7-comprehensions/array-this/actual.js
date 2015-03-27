function add() {
  return [for (i of nums) i * this.multiplier];
}

add.call({ multiplier: 5 });
