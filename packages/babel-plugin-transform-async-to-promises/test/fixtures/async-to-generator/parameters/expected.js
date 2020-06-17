function foo(bar) {
  return new Promise(function ($return, $error) {
    return $return();
  });
}
