function test(fn) {
    return async (...args) => {
    return fn(...args);
    };
}