/* eslint-disable @babel/development/plugin-name */

import plugin from "@babel/plugin-transform-react-jsx/lib/development";
// We need to explicitly annotate this export because
// @babel/plugin-transform-react-jsx/lib/development has no type definitions
// (it's not a public entry point)
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default plugin as typeof import("@babel/plugin-transform-react-jsx").default;
