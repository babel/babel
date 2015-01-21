function add() {
  return [for (i of [1, 2, 3]) i * arguments[0]];
}

add(5);
