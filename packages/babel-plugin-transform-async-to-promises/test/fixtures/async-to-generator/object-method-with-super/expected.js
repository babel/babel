class Foo extends class {} {
  method() {
    return new Promise(function ($return, $error) {
      this.$super$1("method").call(this);

      var arrow = () => this.$super$1("method").call(this);

      return $return();
    }.bind(this));
  }

  $super$1($field) {
    return super[$field];
  }

}
