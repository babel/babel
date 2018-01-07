var foo;
foo = function() {
};

var baz;
baz = function() {
  baz();
};
baz = 12;

bar = function() {
  bar();
};
