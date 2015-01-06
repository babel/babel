"use strict";

function foo() {
  test.apply(undefined, ["bar"].concat(to5Runtime.slice.call(arguments)));
}
