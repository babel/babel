case (input) {
  when {x} if (x > 0) -> console.log('object', x);
  when [1, a, b] -> console.log('array', a, b);
}
