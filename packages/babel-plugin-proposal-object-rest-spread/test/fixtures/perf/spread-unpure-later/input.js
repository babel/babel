const { a, b, ...rest } = obj;
const abc = { ...rest, c: 123 };
rest.d = 3;