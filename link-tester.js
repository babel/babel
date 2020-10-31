const fs = require("fs");
const axios = require("axios").default;

const packageDir = `${__dirname}/packages`;
const packageDirContents = fs.readdirSync(packageDir);

packageDirContents.forEach(async dir => {
  const manifestPath = `${packageDir}/${dir}/package.json`;

  const manifestJson = await fs.promises
    .readFile(manifestPath, "utf8")
    .catch(console.error);

  const manifest = JSON.parse(manifestJson);

  if ("homepage" in manifest) {
    if (
      ["https://babeljs.io/", "https://github.com/babel/babel.git"].includes(
        manifest.homepage
      )
    ) {
      await fs.promises.appendFile(`${__dirname}/to-fix.txt`, `${dir}\n`);
      return;
    }

    axios.head(manifest.homepage).catch(() => {
      console.error(`There was an error with the homepage of ${dir}`);
      delete manifest.homepage;
      fs.promises.writeFile(`${packageDir}/${dir}/package.json`, JSON.stringify(manifest), 'utf8')
      fs.promises.appendFile(`${__dirname}/to-fix.txt`, `${dir}\n`);
    });
  }
});
