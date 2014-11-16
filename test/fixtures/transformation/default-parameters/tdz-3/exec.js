assert.equal((function(a, b=a++){
  function b(){}
  return a;
})(1), 2);
