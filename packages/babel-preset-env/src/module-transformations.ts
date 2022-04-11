type AvailablePlugins = typeof import("./available-plugins").default;

export default {
  auto: "transform-modules-commonjs",
  amd: "transform-modules-amd",
  commonjs: "transform-modules-commonjs",
  cjs: "transform-modules-commonjs",
  systemjs: "transform-modules-systemjs",
  umd: "transform-modules-umd",
} as { [transform: string]: keyof AvailablePlugins };
