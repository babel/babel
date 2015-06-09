(function (instance, arrowFn) {
  if (instance instanceof arrowFn) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
});
