var dynamicThisGetter = () => function(){ return this; };
assert.equal(
  normalize('('+dynamicThisGetter.toString()+')'),
  normalize('(function(){ return function(){ return this; }; })')
);
