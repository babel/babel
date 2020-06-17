(function () {
  return new Promise(function ($return, $error) {
    return Promise.resolve('ok').then(function ($await_1) {
      try {
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
})();

(() => new Promise(function ($return, $error) {
  return Promise.resolve('ok').then(function ($await_2) {
    try {
      return $return();
    } catch ($boundEx) {
      return $error($boundEx);
    }
  }, $error);
}))();

(function notIIFE() {
  return new Promise(function ($return, $error) {
    return Promise.resolve('ok').then(function ($await_3) {
      try {
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
});
