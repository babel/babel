var result;
{
  let let_result = [];
  let let_array = ['one', 'two', 'three'];
  for (var index in let_array) {
  let let_index = index;
  let let_value = let_array[let_index];
  let_result.push(function() {
    return [let_index, let_value];
  });
  }
  result = let_result;
}

assert.deepEqual(['0', 'one'], result[0]());
assert.deepEqual(['1', 'two'], result[1]());
assert.deepEqual(['2', 'three'], result[2]());
