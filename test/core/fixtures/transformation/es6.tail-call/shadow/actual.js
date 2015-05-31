(function(){
  var foo = () => {
    this;
    arguments;
    return foo();
  };
  foo();
});
