// Check that every package about to be published can authenticate to npm
// through trusted publishing (OIDC), before building and publishing anything.
//
// It must run in the GitHub Actions job that publishes the packages (it needs
// `id-token: write` and the same workflow file and environment that the
// packages trust), so it is only used by the `npm-release` job of release.yml.
// It does what Yarn does when publishing: it requests an OIDC token from
// GitHub Actions and exchanges it with npm for a publish token. The token
// returned by npm is discarded.
//
// Checking that packages exist on npm is not enough: a package whose trusted
// publisher is missing or wrong fails with "No authentication configured for
// request" only while publishing, after the other packages have already been
// published.

import { execSync } from "node:child_process";
import { dirname } from "node:path";
import { getTrustCommand } from "./utils/npm-trust.ts";

const REGISTRY = "https://registry.npmjs.org";

// Same logic as `yarn release-tool publish`: the packages to publish are the
// public workspaces whose package.json changed in the release commit.
function getPackagesToPublish(): string[] {
  const changedDirs = new Set(
    execSync("git diff-tree --name-only --no-commit-id --root -r -c HEAD", {
      encoding: "utf-8",
    })
      .split("\n")
      .filter(file => file.endsWith("package.json"))
      .map(file => dirname(file))
  );

  return execSync("yarn workspaces list --no-private --json", {
    encoding: "utf-8",
  })
    .split("\n")
    .filter(Boolean)
    .map(line => JSON.parse(line) as { location: string; name: string })
    .filter(workspace => changedDirs.has(workspace.location))
    .map(workspace => workspace.name);
}

async function getGitHubOidcToken(): Promise<string> {
  const { ACTIONS_ID_TOKEN_REQUEST_URL, ACTIONS_ID_TOKEN_REQUEST_TOKEN } =
    process.env;
  if (!ACTIONS_ID_TOKEN_REQUEST_URL || !ACTIONS_ID_TOKEN_REQUEST_TOKEN) {
    throw new Error(
      "This script must run in a GitHub Actions job with the `id-token: write` permission."
    );
  }

  const url = new URL(ACTIONS_ID_TOKEN_REQUEST_URL);
  url.searchParams.append("audience", "npm:registry.npmjs.org");
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${ACTIONS_ID_TOKEN_REQUEST_TOKEN}` },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to get an OIDC token from GitHub Actions: ${response.status} ${response.statusText}`
    );
  }
  const { value } = (await response.json()) as { value: string };
  return value;
}

// Returns null if the package can be published, or the reason why it cannot.
async function getTrustedPublishingError(name: string): Promise<string | null> {
  // Like Yarn, request a new OIDC token for every package.
  const oidcToken = await getGitHubOidcToken();
  const response = await fetch(
    `${REGISTRY}/-/npm/v1/oidc/token/exchange/package/${name.replace("/", "%2f")}`,
    { method: "POST", headers: { Authorization: `Bearer ${oidcToken}` } }
  );
  if (response.ok) {
    const { token } = (await response.json()) as { token?: string };
    return token ? null : "npm did not return a token";
  }
  return `HTTP ${response.status}: ${await response.text()}`;
}

const packages = getPackagesToPublish();

console.log(`Checking trusted publishing for ${packages.length} packages...`);

const failures: { name: string; error: string }[] = [];
const queue = [...packages];
const checkQueue = async () => {
  let name;
  while ((name = queue.shift()) !== undefined) {
    const error = await getTrustedPublishingError(name);
    if (error !== null) failures.push({ name, error });
  }
};
await Promise.all([checkQueue(), checkQueue(), checkQueue(), checkQueue()]);

if (failures.length === 0) {
  console.log("All packages can be published with trusted publishing :)");
} else {
  console.error(
    "The following packages cannot be published with trusted publishing:"
  );
  for (const { name, error } of failures) {
    console.error(`- ${name} (${error})`);
  }
  console.error(
    `\nA maintainer needs to set up trusted publishing for them, logged in to npm with npm >= 11.15.0:\n` +
      failures.map(({ name }) => `  ${getTrustCommand(name)}`).join("\n") +
      "\nThen re-run this job. Nothing has been published."
  );
  process.exitCode = 1;
}
