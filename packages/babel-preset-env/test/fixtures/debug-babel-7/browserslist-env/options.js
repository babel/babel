module.exports = {
  validateLogs: true,
  ignoreOutput: true,
  presets: [
    [
      "env",
      {
        debug: true,
        browserslistEnv: "custom",
        configPath: __dirname,
      },
    ],
  ],
};
