case (input) {
  when {x} -> console.log('object: ', x);
  when [1, a, b] -> console.log('array: ', a, b);
  when undefined -> console.log('everything');
  when y -> console.log('equal to input: ', input, y);
}
