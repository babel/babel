var x = 10;

enum Bar {
    d = 1,
}

enum Foo {
    a = 10,
    b = a,
    c = b + x,
    d = Bar.d,
}