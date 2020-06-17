function one(a, b = 1) {
  return new Promise(function ($return, $error) {
    return $return();
  });
}

function two(a, b, ...c) {
  return new Promise(function ($return, $error) {
    return $return();
  });
}

function three(a, b = 1, c, d = 3) {
  return new Promise(function ($return, $error) {
    return $return();
  });
}

function four(a, b = 1, c, ...d) {
  return new Promise(function ($return, $error) {
    return $return();
  });
}

function five(a, {
  b
}) {
  return new Promise(function ($return, $error) {
    return $return();
  });
}

function six(a, {
  b
} = {}) {
  return new Promise(function ($return, $error) {
    return $return();
  });
}
