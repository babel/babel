import { declare } from "@babel/helper-plugin-utils";
import transformTypeScript from "@babel/plugin-transform-typescript";

export default declare(api => {
  api.assertVersion(7);

  return {
    plugins: [transformTypeScript],
  };
});
