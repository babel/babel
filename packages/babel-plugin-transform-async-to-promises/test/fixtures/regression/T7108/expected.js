class Test {
  static method1() {
    return new Promise(function ($return, $error) {
      console.log(this);
      setTimeout(() => new Promise(function ($return, $error) {
        console.log(this);
        return $return();
      }.bind(this)));
      return $return();
    }.bind(this));
  }

  static method2() {
    return new Promise(function ($return, $error) {
      console.log(this);
      setTimeout(arg => new Promise(function ($return, $error) {
        console.log(this);
        return $return();
      }.bind(this)));
      return $return();
    }.bind(this));
  }

  method1() {
    return new Promise(function ($return, $error) {
      console.log(this);
      setTimeout(() => new Promise(function ($return, $error) {
        console.log(this);
        return $return();
      }.bind(this)));
      return $return();
    }.bind(this));
  }

  method2() {
    return new Promise(function ($return, $error) {
      console.log(this);
      setTimeout(arg => new Promise(function ($return, $error) {
        console.log(this);
        return $return();
      }.bind(this)));
      return $return();
    }.bind(this));
  }

}
