
// These syntaxes should be transpiled:
// static {} / ??= / #self in / C?.#self
// The class declaration and the static private property should not be transpiled
class C {
    static #self = C;
    static {
        C.#self ??= #self in C?.#self;
    }
}
