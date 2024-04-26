const fs = require(`fs`);

module.exports = {
  name: `@yarnpkg/plugin-remove-dependency`,
  factory: () => {
    return {
      default: {
        hooks: {
          afterAllInstalled: () => {
            [
              `./node_modules/@types/babel__core`,
              `./node_modules/@types/babel__traverse`,
            ].forEach(dir => {
              if (fs.existsSync(dir)) {
                fs.rmSync(dir, {
                  recursive: true,
                });
              }
            });
          },
        },
      },
    };
  },
};
