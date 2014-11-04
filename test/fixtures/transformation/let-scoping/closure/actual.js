(function() {
  let foo = 'bar';

  [true].forEach(function() {
    foo = 'baz';
  });

  console.log(foo);
});
