function add() {
  return [for (i of [1, 2, 3]) i * this.multiplier];
}

add.call({ multiplier: 5 });
