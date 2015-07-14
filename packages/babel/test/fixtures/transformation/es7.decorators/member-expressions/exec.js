var foo = {
  bar: function () { assert.equal(this, foo); },
  foobar: {
    bar: function () { assert.equal(this, foo.foobar); },
  }
};

(class {
  @foo.bar
  @foo.foobar.bar
  bar() {}
});

({
  @foo.bar
  @foo.foobar.bar
  bar() {}
});
