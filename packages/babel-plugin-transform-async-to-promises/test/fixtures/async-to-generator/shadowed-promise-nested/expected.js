let Promise;

function foo() {
  return new Promise(function ($return, $error) {
    let Promise;

    function bar() {
      return new Promise(function ($return, $error) {
        return $return(Promise.resolve());
      });
    }

    return Promise.resolve(bar()).then(function ($await_1) {
      try {
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}
