import transformTypeScript from "babel-plugin-transform-typescript";
import syntaxObjectRestSpread from "babel-plugin-syntax-object-rest-spread";

export default function() {
  return {
    plugins: [transformTypeScript, syntaxObjectRestSpread],
  };
}
