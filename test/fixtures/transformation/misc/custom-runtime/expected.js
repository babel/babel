"use strict";

function foo() {
  test.apply(undefined, ["bar"].concat(customNamespace.slice.call(arguments)));
}
