// @filename: main.ts
export class Foo {
    static #a = 1;
    static #b(_: typeof Foo.#a) {}
    static #c(_: typeof this.#a) {}
    static #d(_: typeof import("./lib").Bar.#a) {}

    // TODO: handle this
    // static #e(_: typeof import("./lib").#a) {}
}

// @filename: lib.ts
export { Foo as Bar } from "./main"