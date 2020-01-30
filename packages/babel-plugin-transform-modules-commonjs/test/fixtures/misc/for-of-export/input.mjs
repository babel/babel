export let foo;

for (foo of []) {}

for (foo of []) {
    let foo = 3;
}

{
    let foo = 3;
    for (foo of []) {}
}