foo(function () {
  return new Promise(function ($return, $error) {
    return $return();
  });
});
