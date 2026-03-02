const babel = require("@babel/core");

const code = `
let { a, b, ...rest } = obj;
let abc = { ...rest, c: 123 };
`;

const res = babel.transformSync(code, {
  plugins: ["@babel/plugin-transform-object-rest-spread"]
});

console.log(res.code);
