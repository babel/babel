/**
 * Since we moved our documentation to our website repo, we want to point to the
 * website from the docs in this repo
 *
 * This script write the link to the website in every READMEs.
 */

import { join } from "node:path";
import { readdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const cwd = process.cwd();

const packageDir = join(cwd, "packages");

const packages = readdirSync(packageDir);

const isDep = (name: string) =>
  name.startsWith("@babel/runtime") ||
  name.startsWith("@babel/helper-") ||
  name === "@babel/compat-data";

const getWebsiteLink = (n: string) => `https://babeljs.io/docs/${n}`;
const getPackageJson = (pkg: string) =>
  require(join(packageDir, pkg, "package.json"));
const getIssueLabelLink = (l: string) => {
  if (!l) return "";
  return `https://github.com/babel/babel/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22${encodeURIComponent(
    l
  )}%22+is%3Aopen`;
};
const getNpmInstall = (name: string) =>
  `npm install ${isDep(name) ? "--save" : "--save-dev"} ${name}`;
const getYarnAdd = (name: string) =>
  `yarn add ${name}${isDep(name) ? "" : " --dev"}`;

const labels: Record<string, string> = {
  "babel-preset-flow": "area: flow",
  "babel-preset-node": "area: node",
  "babel-preset-react": "area: react",
  "babel-preset-typescript": "area: typescript",
  "babel-parser": "pkg: parser",
  "babel-cli": "pkg: cli",
  "babel-core": "pkg: core",
  "babel-generator": "pkg: generator",
  "babel-preset-env": "pkg: preset-env",
  "babel-register": "pkg: register",
  "babel-template": "pkg: template",
  "babel-traverse": "pkg: traverse",
  "babel-types": "pkg: types",
  "babel-standalone": "pkg: standalone",
};

const generateReadme = ({
  websiteLink,
  issuesLink,
  name,
  description,
}: {
  websiteLink: string;
  issuesLink: string;
  name: string;
  description: string;
}) =>
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
${getNpmInstall(name)}
\`\`\`

or using yarn:

\`\`\`sh
${getYarnAdd(name)}
\`\`\`
`;

packages
  .filter(x => x !== "README.md") // ignore root readme
  .filter(x => !x.includes("babel-helper-check-duplicate-nodes")) // ignore check-duplicate-nodes
  .forEach(id => {
    try {
      const { name, description } = getPackageJson(id);
      const readmePath = join(packageDir, id, "README.md");

      // generate
      const websiteLink = getWebsiteLink(id);
      const issuesLink = getIssueLabelLink(labels[id]);

      const readme = generateReadme({
        websiteLink,
        issuesLink,
        name,
        description,
      });

      // write
      writeFileSync(readmePath, readme);

      console.log("OK", id);
    } catch (e) {
      console.error("ERR", id, e);
    }
  });
