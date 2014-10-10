function outer() {
  var inner = () => arguments;
  return [].slice.call(inner());
}
console.log(outer(1, 2));

function outer() {
  var inner = () => arguments;

  var another = function () {
    var inner2 = () => arguments;
  };

  return [].slice.call(inner());
}
console.log(outer(1, 2));
