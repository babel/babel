import transformTypeScript from "@babel/plugin-transform-typescript";

export default function() {
  return {
    plugins: [transformTypeScript],
  };
}
