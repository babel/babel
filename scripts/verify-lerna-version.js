const { exec } = require("child_process");
console.log("Verify Lerna version is > 2.0.0-beta.38");
exec("./node_modules/.bin/lerna --version", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  if (stdout.trim() == "2.0.0-beta.23") {
    throw new Error("Lerna v2.0.0-beta.23 detected (package.json). Please install at least lerna@2.0.0-beta.38 to publish");
  }
});
