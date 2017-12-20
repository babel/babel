class Class {
  method() {
    return new Promise(function ($return, $error) {
      this;

      () => this;

      () => {
        this;

        () => this;

        function x() {
          this;

          () => {
            this;
          };

          () => new Promise(function ($return, $error) {
            this;
            return $return();
          }.bind(this));
        }
      };

      function x() {
        this;

        () => {
          this;
        };

        () => new Promise(function ($return, $error) {
          this;
          return $return();
        }.bind(this));
      }

      return $return();
    }.bind(this));
  }

}
