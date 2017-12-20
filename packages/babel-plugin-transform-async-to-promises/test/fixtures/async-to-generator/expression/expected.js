var foo = function () {
  return new Promise(function ($return, $error) {
    var wat;
    return Promise.resolve(bar()).then(function ($await_1) {
      try {
        wat = $await_1;
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
};

var foo2 = function () {
  return new Promise(function ($return, $error) {
    var wat;
    return Promise.resolve(bar()).then(function ($await_2) {
      try {
        wat = $await_2;
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
};

var bar = function () {
  return new Promise(function ($return, $error) {
    var wat;
    return Promise.resolve(foo()).then(function ($await_3) {
      try {
        wat = $await_3;
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
};
