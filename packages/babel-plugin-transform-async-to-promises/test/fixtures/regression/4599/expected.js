() => new Promise(function ($return, $error) {
  return Promise.resolve(promise).then($return, $error);
});

() => new Promise(function ($return, $error) {
  return Promise.resolve(promise).then(function ($await_2) {
    try {
      return $return();
    } catch ($boundEx) {
      return $error($boundEx);
    }
  }, $error);
});
