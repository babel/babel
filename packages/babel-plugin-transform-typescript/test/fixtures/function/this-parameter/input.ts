function f(this: {}) {}
const o = {
    m(this: {}) {}
};
class C {
    m(this: {}) {}
}
const g = {
    get m(this: {}) {}
};
const s = {
    set m(this: {}, value: {}) {}
};