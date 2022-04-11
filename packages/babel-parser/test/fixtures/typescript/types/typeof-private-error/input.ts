class C {
    #a = 'a';

    constructor() {
        const a: typeof this.#a = '';
    }
}

const c = new C();
const a: typeof c.#a = ''; // Error
