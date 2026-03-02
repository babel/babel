const babel = require("@babel/core");

const code = `
let { a, ...rest } = obj;
let abc = { ...rest, c: 123 };
`;

const res = babel.transformSync(code, {
    filename: "test.js",
    configFile: false,
    babelrc: false,
    plugins: ["./packages/babel-plugin-transform-object-rest-spread"]
});
console.log(res.code);
