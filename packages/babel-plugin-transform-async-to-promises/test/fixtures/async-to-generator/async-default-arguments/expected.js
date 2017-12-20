function mandatory(paramName) {
  throw new Error(`Missing parameter: ${paramName}`);
}

function foo({
  a,
  b = mandatory("b")
}) {
  return new Promise(function ($return, $error) {
    return $return(Promise.resolve(b));
  });
}
