function add() {
  return [for (i of nums) i * arguments[0]];
}

add(5);
