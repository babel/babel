var foo = function bar() {
  return new Promise(function ($return, $error) {
    console.log(bar);
    return $return();
  });
};
