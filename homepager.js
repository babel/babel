const fs = require("fs");
const { justDone, alreadyDone } = require("./record-updates.js");

const packageDir = `${__dirname}/packages`;
const packageDirContents = fs.readdirSync(packageDir);

const reportReadError = error => {
  console.error(error.message);
  process.exitCode = 1;
};

/**
 *
 * @param {string} package The name to link to.
 */
const makeDocLink = package =>
  `https://babeljs.io/docs/en/next/${package}.html`;

packageDirContents
  .filter(dir => !alreadyDone.includes(dir))
  .forEach(async dir => {
    const manifestPath = `${packageDir}/${dir}/package.json`;

    const manifestRead = fs.promises
      .readFile(manifestPath, "utf8")
      .catch(reportReadError);
    const readmeRead = fs.promises
      .readFile(`${packageDir}/${dir}/README.md`, "utf8")
      .catch(reportReadError);

    const [manifestJson, readme] = await Promise.all([
      manifestRead,
      readmeRead,
    ]);

    const manifest = JSON.parse(manifestJson);

    if ("homepage" in manifest) {
      if (
        ["https://babeljs.io/", "https://github.com/babel/babel.git"].includes(
          manifest.homepage
        )
      ) {
        manifest.homepage = makeDocLink(dir);

        return fs.promises
          .writeFile(manifestPath, JSON.stringify(manifest), "utf8")
          .then(() => {
            console.log(`${dir} updated`);
            justDone(dir);
          })
          .catch(e => console.error(`Error with ${dir}`, e));
      } else {
        console.log(`${dir} already has a homepage, skipping.`);
        justDone(dir);
        return;
      }
    } else if (readme && readme.includes("https://babeljs.io/docs")) {
      manifest.homepage = makeDocLink(dir);

      return fs.promises
        .writeFile(manifestPath, JSON.stringify(manifest), "utf8")
        .then(() => {
          console.log(`${dir} updated`);
          justDone(dir);
        })
        .catch(e => console.error(`Error with ${dir}`, e));
    }
  });
