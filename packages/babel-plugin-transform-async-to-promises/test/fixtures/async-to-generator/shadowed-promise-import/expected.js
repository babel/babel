import Promise from 'somewhere';

function foo() {
  return new Promise(function ($return, $error) {
    return Promise.resolve(Promise.resolve()).then(function ($await_1) {
      try {
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}
