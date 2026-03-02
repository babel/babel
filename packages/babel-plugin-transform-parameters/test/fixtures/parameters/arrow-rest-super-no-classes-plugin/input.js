class Bar extends Foo {
    constructor() {
        let f = (...args) => super(...args);
        f();
    }
}
