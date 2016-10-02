var MyClass = (function() {
  var stuff = 'outer stuff!';
  return class {
    constructor() {
      var stuff = 'constructor stuff!';
    }
    myProp = () => {
      console.log(arguments);
      console.log(stuff);
      console.log(this);
    };
  }
})(42);
