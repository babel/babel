"use strict";

(function () {
  var foo = "bar";

  [true].forEach(function () {
    foo = "baz";
  });

  console.log(foo);
});
