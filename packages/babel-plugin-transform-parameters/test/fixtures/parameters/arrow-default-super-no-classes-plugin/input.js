class Bar extends Foo {
    constructor() {
        let f = (x = super()) => x;
        f();
    }
}
