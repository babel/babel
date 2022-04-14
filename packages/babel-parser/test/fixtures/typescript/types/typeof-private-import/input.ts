export class Foo {
    static #p = 1;
    m(param: typeof import("./lib").Foo.#p) {}
}
