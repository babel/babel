function fn() {
  var foo = () => {
    return arguments;
  };
}

var bar = () => arguments;

var baz = () => () => arguments;
