let Promise;

function foo() {
  return new Promise(function ($return, $error) {
    return Promise.resolve(new Promise(resolve => {
      resolve();
    })).then(function ($await_1) {
      try {
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}
