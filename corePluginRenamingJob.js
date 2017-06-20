// $ node corePluginRenamingJob.js > plugin_rename_log

const exec = require('child_process').exec;
const fileSystem = require('fs');

const returnFilesWithin = (path) => {
  return fileSystem.readdirSync(path);
}

returnFilesWithin('packages').forEach(package => {
  const PLUGIN_PACKAGE = /^babel-plugin/;
  if (PLUGIN_PACKAGE.test(package)) {
    if (fileSystem.lstatSync(`packages/${package}/src`).isDirectory()) {
      // console.log(package); // 72 babel core plugin packages
      const cmd = `codemod --require babel-register -o index='{"pluginName": "${package}"}' --plugin node_modules/babel-plugin-add-name-to-plugin/src/index.js packages/${package}/src/index.js`;
      exec(cmd, (error, stdout, stderr) => {
        console.log("\n");
        console.log("\n");
        console.log(package);
        if (error) {
          console.log("error-------------------------------");
          console.log(error);
        } else {
          console.log("stdout------------------------------");
          console.log(stdout);
          console.log("\n");
          console.log("\n");
          console.log("stderr------------------------------");
          console.log(stderr);
        }
      });
    }
  }
});
