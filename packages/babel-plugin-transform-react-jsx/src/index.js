/* eslint-disable-next-line @babel/development/plugin-name */
import transformClassic from "./transform-classic";
/* eslint-disable-next-line @babel/development/plugin-name */
import transformAutomatic from "./transform-automatic";
import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  const { runtime = "automatic" } = options;

  // we throw a warning in helper-builder-react-jsx-experimental if runtime
  // is neither automatic or classic because we will remove this file
  // in v8.0.0
  if (runtime === "classic") {
    return transformClassic(api, options);
  }

  return transformAutomatic(api, options);
});
