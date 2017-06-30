function Foo() {
  new.target;
}

Foo.prototype.test = function() {
  new.target;
}
