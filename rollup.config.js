import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";

export default {
  entry: "src/index.js",
  dest: "lib/index.js",
  plugins: [babel(), nodeResolve()],
  format: "cjs",
};
