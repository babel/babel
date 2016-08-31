import { default as syntaxAsyncFunctions } from "babel-plugin-syntax-async-functions";

export default function () {
  return {
    inherits: syntaxAsyncFunctions
  };
}
