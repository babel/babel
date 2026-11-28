var early = ((_f, _x) => function () {
  return _f(_x);
})(f, x);
var x = 1;
const y = 1;
function hoisted() {
  return ((_f2, _y) => function () {
    return _f2(_y);
  })(f, y);
}
const later = () => (_f3 => function () {
  return _f3(y, hoisted);
})(f);
for (const i of []) {
  (_f4 => function () {
    return _f4(i);
  })(f);
}
switch (0) {
  case 1:
    let w = 1;
  case 0:
    ((_f5, _w) => function () {
      return _f5(_w);
    })(f, w);
}
