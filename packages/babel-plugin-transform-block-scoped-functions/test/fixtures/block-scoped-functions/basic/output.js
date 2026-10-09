console.log(a());
function a() {
  "use strict";

  if (f() !== 1) return false;
  function f() {
    return 1;
  }
  {
    let f = function () {
      return 2;
    };
    if (f() !== 2) return false;
    if (f() !== 2) return false;
  }
  if (f() !== 1) return false;
  return true;
}
