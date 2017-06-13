import asyncSyntaxPlugin from "babel-plugin-syntax-async-functions";

export default function () {
  return {
    name: "babel-plugin-transform-async-functions",
    inherits: asyncSyntaxPlugin
  };
}
