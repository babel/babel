var x = 10;

enum Foo {
    a = 10,
    b = a,
    c = b + x,
}

enum Bar {
    b = Foo.a,
    E = b,
    F = Math.E,
}