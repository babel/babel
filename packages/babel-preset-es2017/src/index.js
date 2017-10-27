import transformAsyncToGenerator from "@babel/plugin-transform-async-to-generator";

export default function() {
  return {
    plugins: [transformAsyncToGenerator],
  };
}
