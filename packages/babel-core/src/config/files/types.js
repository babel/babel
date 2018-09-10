// @flow

export type ConfigFile = {
  filepath: string,
  dirname: string,
  options: {},
};

export type IgnoreFile = {
  filepath: string,
  dirname: string,
  ignore: Array<RegExp>,
};

export type RelativeConfig = {
  // The actual config, either from package.json#babel, .babelrc, or
  // .babelrc.js, if there was one.
  config: ConfigFile | null,

  // The .babelignore, if there was one.
  ignore: IgnoreFile | null,
};

export type FilePackageData = {
  // The file in the package.
  filepath: string,

  // Any ancestor directories of the file that are within the package.
  directories: Array<string>,

  // The contents of the package.json. May not be found if the package just
  // terminated at a node_modules folder without finding one.
  pkg: ConfigFile | null,

  // True if a package.json or node_modules folder was found while traversing
  // the directory structure.
  isPackage: boolean,
};
