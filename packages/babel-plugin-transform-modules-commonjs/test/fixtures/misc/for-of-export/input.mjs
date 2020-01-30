export let foo = 42;

for (foo of [1, 2, 3]) {

}

for (foo of [1, 2, 3]) {
    // This loop body is transformed incorrectly
    // correct output should be
    // exports.foo = _foo2
    let foo = 3;
}
