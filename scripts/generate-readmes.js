/**
 * Since we moved our documentation to our website repo, we want to point to the
 * website from the docs in this repo
 *
 * This script write the link to the website in every READMEs.
 */

const { join } = require("path");
const { readdirSync, writeFileSync } = require("fs");

const cwd = process.cwd();

const packageDir = join(cwd, "packages");

const packages = readdirSync(packageDir);
const getWebsiteLink = n => `https://new.babeljs.io/docs/en/next/${n}.html`;
const getPackageJson = pkg => require(join(packageDir, pkg, "package.json"));

const generateReadme = ({ link, name, description }) =>
  `# ${name}

> ${description}

See our website [${name}](${link}) for more information.

## Install

Using npm:

\`\`\`js
npm install --save ${name}
\`\`\`

or using yarn:

\`\`\`js
yarn add --save ${name}
\`\`\`
`;

packages
  .filter(x => x !== "README.md") // ignore root readme
  .forEach(id => {
    const { name, description } = getPackageJson(id);
    const readmePath = join(packageDir, id, "README.md");

    // generate
    const link = getWebsiteLink(id);
    const readme = generateReadme({ link, name, description });

    // write
    writeFileSync(readmePath, readme);

    console.log("OK", id);
  });
