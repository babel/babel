export let foo;
export {foo as bar}

for (foo of []) {}


for (foo of []) {
    let foo;
}

for ({foo} of []) {}
for ({test: {foo}} of []) {
    let foo;
}
for ({foo: bar} of []) {}

let qux;
for([foo, [...foo], qux] of []) {}

{
    for ({foo} of []) {}
    for({test: {foo}, qux} of []) {}
    let foo;
    for({foo} of []) {}
}
