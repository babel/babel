function foo() {
  var input = ['a', 'b', 'c'];
  var output = {};
  for (var _i = 0, _input = input; _i < _input.length; _i++) {
    var c = _input[_i];
    var name = c;
    output[name] = name;
  }
  return output;
}
