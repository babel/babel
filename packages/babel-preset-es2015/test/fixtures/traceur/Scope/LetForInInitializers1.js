// Options: --block-binding

var result;
{
  let let_result = [];
  let let_array = ['one', 'two', 'three'];
  for (var index in let_array) {
    let let_index = index;
    let let_value = let_array[let_index];
    let_result.push(
        function() {
          return [let_index, let_value];
        });
  }
  result = let_result;
}

// ----------------------------------------------------------------------------

expect(result[0]()).toEqual(['0', 'one']);
expect(result[1]()).toEqual(['1', 'two']);
expect(result[2]()).toEqual(['2', 'three']);
