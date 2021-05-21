// @flow

import typeof AvailablePlugins from "./available-plugins";

export default ({
  auto: "transform-modules-commonjs",
  amd: "transform-modules-amd",
  commonjs: "transform-modules-commonjs",
  cjs: "transform-modules-commonjs",
  systemjs: "transform-modules-systemjs",
  umd: "transform-modules-umd",
}: { [transform: string]: $Keys<AvailablePlugins> });
