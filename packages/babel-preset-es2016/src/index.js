import { declare } from "@babel/helper-plugin-utils";
import transformExponentiationOperator from "@babel/plugin-transform-exponentiation-operator";

export default declare(api => {
  api.assertVersion(7);

  return {
    plugins: [transformExponentiationOperator],
  };
});
