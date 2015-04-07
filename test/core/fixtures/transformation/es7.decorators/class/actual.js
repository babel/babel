@foo
class Foo {}

@foo
@bar
class Bar {}

var Foo2 = @bar class Foo {

};

var Bar2 = @foo @bar class Bar {

};
