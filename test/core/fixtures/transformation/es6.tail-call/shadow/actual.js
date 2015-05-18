(function(){
  var foo = () => {
    this;
    arguments;
    foo();
  };
  foo();
});
