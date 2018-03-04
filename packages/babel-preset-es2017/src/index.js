import { declare } from "@babel/helper-plugin-utils";
import transformAsyncToGenerator from "@babel/plugin-transform-async-to-generator";

export default declare(api => {
  api.assertVersion(7);

  return {
    plugins: [transformAsyncToGenerator],
  };
});
