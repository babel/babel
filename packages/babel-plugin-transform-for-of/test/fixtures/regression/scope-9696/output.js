var arr = [1, 2, 3];
var _arr = arr;

for (var _i = 0; _i < _arr.length; _i++) {
  let v = _arr[_i];
  console.log(v);
  arr = null;
}
