class Foo {
  foo() {
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
  }

}
