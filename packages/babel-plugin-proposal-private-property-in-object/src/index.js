/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";

import pluginPrivateIn from "./native-private-fields";

export default declare((api, options) => {
  api.assertVersion(7);

  // NOTE: When using the class fields or private methods plugins,
  // they will also take care of '#priv in obj' checks when visiting
  // the ClassExpression or ClassDeclaration nodes.
  // The visitor of this plugin is only effective when not compiling
  // private fields and methods.

  return pluginPrivateIn(api, options);
});
