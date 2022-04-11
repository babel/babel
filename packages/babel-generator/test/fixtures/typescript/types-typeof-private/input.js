class C {
    #a = 'a';

    constructor() {
        const a: typeof this.#a = ''; // Ok
        const b: typeof this.#a = 1;  // Error
    }
}

const c = new C();
const a: typeof c.#a = '';

class Container {
    #data = "hello!";

    get data(): typeof this.#data {
        return this.#data;
    }

    set data(value: typeof this.#data) {
        this.#data = value;
    }
}