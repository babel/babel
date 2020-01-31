export let foo;
export let bar;

for (foo of []) {}

for (foo in {}) {}

for ({foo} of {}) {}

for ({foo} of {}) {
    let foo = 3;
}

for ({foo, bar} of {}) {}

for ({foo, bar} of {}) {
    let bar = 3;
}

for (foo of []) {
    let foo = 3;
}

{
    let foo = 3;
    for (foo of []) {}
}