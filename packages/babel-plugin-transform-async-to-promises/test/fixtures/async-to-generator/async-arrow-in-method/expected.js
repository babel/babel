let TestClass = {
  name: "John Doe",

  testMethodFailure() {
    return new Promise(resolve => new Promise(function ($return, $error) {
      console.log(this);
      setTimeout(resolve, 1000);
      return $return();
    }.bind(this)));
  }

};
