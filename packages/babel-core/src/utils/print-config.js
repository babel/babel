export type PrintConfig = {
  options: Object,
  babelrc: Object,
};

export function printConfig(config): void {
  if (config.babelrc) {
    const babelrc = {
      from: "config",
      path: config.babelrc.filepath,
      presets: config.babelrc.options.presets || [],
      plugins: config.babelrc.options.plugins || [],
    };
    console.log(babelrc);
  }

  if (config.options.caller.name === "@babel/cli") {
    console.log("--------------");

    const babelcli = {
      from: "@babel/cli",
      presets: config.options.presets || [],
      plugins: config.options.plugins || [],
    };
    console.log(babelcli);
    console.log("--------------");
  }

  if (config.options.caller.name === "babel-loader") {
    console.log("--------------");

    const babelLoader = {
      from: "babel-loader",
      presets: config.options.presets || [],
      plugins: config.options.plugins || [],
    };
    console.log(babelLoader);
    console.log("--------------");
  }
}
