class C {
    #m;
    constructor() {
        const o = null;
        const n = this;
        const p = o?.#m(...c, 1);
        const q = n?.#m?.(...c, 1);
        expect(p).toBe(undefined);
        expect(q).toBe(undefined);
    }
}

new C;
