const arr = [];

arr.concat = () => {
    throw new Error('Should not be called');
};

expect(() => {
    const x = [...arr];
}).not.toThrow();
