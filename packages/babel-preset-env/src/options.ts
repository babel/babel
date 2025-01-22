export const TopLevelOptions = {
  configPath: "configPath",
  corejs: "corejs",
  debug: "debug",
  exclude: "exclude",
  forceAllTransforms: "forceAllTransforms",
  ignoreBrowserslistConfig: "ignoreBrowserslistConfig",
  include: "include",
  modules: "modules",
  shippedProposals: "shippedProposals",
  targets: "targets",
  useBuiltIns: "useBuiltIns",
  browserslistEnv: "browserslistEnv",
} as const;

if (!process.env.BABEL_8_BREAKING) {
  Object.assign(TopLevelOptions, {
    bugfixes: "bugfixes",
    loose: "loose",
    spec: "spec",
  });
}

export const ModulesOption = {
  false: false,
  auto: "auto",
  amd: "amd",
  commonjs: "commonjs",
  cjs: "cjs",
  systemjs: "systemjs",
  umd: "umd",
} as const;

export const UseBuiltInsOption = {
  false: false,
  entry: "entry",
  usage: "usage",
} as const;
