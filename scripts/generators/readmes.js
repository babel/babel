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
const getIssueLabelLink = l =>
  `https://github.com/babel/babel/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22${encodeURIComponent(
    l
  )}%22+is%3Aopen`;

const labels = {
  "babel-preset-typescript": getIssueLabelLink("area: typescript"),
  "babel-preset-flow": getIssueLabelLink("area: flow"),
  "babel-preset-react": getIssueLabelLink("area: react"),
  "babel-parser": getIssueLabelLink("pkg: babylon"),
  "babel-cli": getIssueLabelLink("pkg: cli"),
  "babel-core": getIssueLabelLink("pkg: core"),
  "babel-polyfill": getIssueLabelLink("pkg: polyfill"),
  "babel-preset-env": getIssueLabelLink("pkg: preset-env"),
  "babel-register": getIssueLabelLink("pkg: register"),
  "babel-traverse": getIssueLabelLink("pkg: traverse"),
  "babel-types": getIssueLabelLink("pkg: types"),
};

const generateReadme = ({ websiteLink, issuesLink, name, description }) =>
  `# ${name}

> ${description}

See our website [${name}](${websiteLink}) for more information${
    issuesLink
      ? ` or the [issues](${issuesLink}) associated with this package`
      : ""
  }.

## Install

Using npm:

\`\`\`sh
npm install --save ${name}
\`\`\`

or using yarn:

\`\`\`sh
yarn add --save ${name}
\`\`\`
`;

packages
  .filter(x => x !== "README.md") // ignore root readme
  .forEach(id => {
    const { name, description } = getPackageJson(id);
    const readmePath = join(packageDir, id, "README.md");

    // generate
    const websiteLink = getWebsiteLink(id);
    const issuesLink = labels[id];

    const readme = generateReadme({
      websiteLink,
      issuesLink,
      name,
      description,
    });

    // write
    writeFileSync(readmePath, readme);

    console.log("OK", id);
  });
