"use strict";

const [ /* node */, /* file */, tag ] = process.argv;

const getStdin = require("get-stdin");
const octokit = require("@octokit/rest")();

octokit.authenticate({
  type: "token",
  token: process.env.GITHUB_TOKEN
});

const [ repoOwner, repoName ] = process.env.GITHUB_REPOSITORY.split("/");

getStdin()
  .then(changelog => octokit.repos.createRelease({
    owner: repoOwner,
    repo: repoName,
    tag_name: tag,
    body: "FAKE CHANGELOG",
  }))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
