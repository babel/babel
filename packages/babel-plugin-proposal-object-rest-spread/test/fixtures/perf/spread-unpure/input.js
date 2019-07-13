const { a, b, ...rest } = obj;

rest.d = 3;
const abc = { ...rest, c: 123 };