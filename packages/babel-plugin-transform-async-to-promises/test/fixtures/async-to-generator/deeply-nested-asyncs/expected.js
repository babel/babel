function s(x, ...args) {
  var $args = arguments;
  return new Promise(function ($return, $error) {
    let t;

    t = (y, a) => new Promise(function ($return, $error) {
      let r;

      r = (z, b, ...innerArgs) => new Promise(function ($return, $error) {
        return Promise.resolve(z).then(function ($await_1) {
          try {
            console.log(this, innerArgs, $args);
            return $return(this.x);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this), $error);
      }.bind(this));

      return Promise.resolve(r()).then(function ($await_2) {
        try {
          console.log(this, args, $args);
          return $return(this.g(r));
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }.bind(this));

    return Promise.resolve(t()).then(function ($await_3) {
      try {
        return $return(this.h(t));
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }.bind(this), $error);
  }.bind(this));
}
