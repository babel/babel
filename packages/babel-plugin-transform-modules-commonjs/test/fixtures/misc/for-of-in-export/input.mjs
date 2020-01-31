export let foo;
export {foo as bar}

for (foo of []) {}

for (foo of []) {
    let foo = 3;
}

for (foo of []) {
    foo = 3;
}

for (foo in {}) {}

for ({foo} of {}) {}

for ({foo, bar} of {}) {
    let bar = 3;
}

{
    let foo = 3;
    for (foo of []) {}
}

let qux;

for ([foo] of []) {}

for ([foo, qux, [...foo]] of []) {}