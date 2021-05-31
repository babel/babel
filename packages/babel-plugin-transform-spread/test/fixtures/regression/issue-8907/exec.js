const arr = [];

arr.concat = () => {
    throw new Error('Should not be called');
};
let x;
expect(() => {
    x = [...arr];
}).not.toThrow();

expect(x).not.toBe(arr);
