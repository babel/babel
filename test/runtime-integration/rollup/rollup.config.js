import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import path from "path";

export default {
  input: path.resolve(__dirname, "../src/main-esm.mjs"),
  plugins: [commonjs(), nodeResolve()],

  output: {
    file: path.resolve(__dirname, "output.js"),
    format: "cjs",
  },
};
