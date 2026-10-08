function sloppy(a) {
  return ((_f, _a) => function (_argPlaceholder) {
    return _f(_a, _argPlaceholder);
  })(f, a);
}
function strict(a) {
  "use strict";

  return (_f2 => function (_argPlaceholder2) {
    return _f2(a, _argPlaceholder2);
  })(f);
}
const arrow = a => (_f3 => function (_argPlaceholder3) {
  return _f3(a, _argPlaceholder3);
})(f);
