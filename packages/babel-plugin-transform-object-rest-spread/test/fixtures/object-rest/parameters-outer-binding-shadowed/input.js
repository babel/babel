const z = 1;
function f({ y = z, ...rest }) {
  var z = 2;
}
