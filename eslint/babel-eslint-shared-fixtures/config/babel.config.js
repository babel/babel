export default {
  plugins: [
    ["@babel/plugin-syntax-flow", { all: true }],
    "@babel/plugin-syntax-jsx",

    "@babel/plugin-syntax-export-default-from",
    ["@babel/plugin-syntax-decorators", { version: "2023-11" }],
    "@babel/plugin-syntax-async-do-expressions",
    "@babel/plugin-syntax-do-expressions",
  ],
};
