async function *ag() {

    await x;
    yield y;
    yield await foo;
}
