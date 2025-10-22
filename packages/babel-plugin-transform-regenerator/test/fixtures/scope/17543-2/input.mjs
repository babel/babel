import {useLayoutEffect as n} from "react";

function Ki(i, n) {
  return i(async () => {
    var n;
  }, n); // This n is the one from the Ki function, not from the import statement
}
