function sloppy(a) {
  return f~(a, ?);
}
function strict(a) {
  "use strict";
  return f~(a, ?);
}
const arrow = a => f~(a, ?);
