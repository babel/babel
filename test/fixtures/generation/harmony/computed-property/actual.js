var object1 = {
    // MethodDefinition
    get [Symbol.create]() { },
    set [set()](value) { },
};
var object2 = {
    *[generator()]() { }
};
var object3 = {
    *[generator()]() { }
};
var object4 = {
    // Normal Property
    [Symbol.xxx]: 'hello',
    [ok()]: 42,
};
