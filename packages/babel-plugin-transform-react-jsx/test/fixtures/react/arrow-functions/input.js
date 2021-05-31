var foo = function () {
  return () => <this />;
};

var bar = function () {
  return () => <this.foo />;
};
