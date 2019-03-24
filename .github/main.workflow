workflow "Release" {
  on = "push"
  resolves = ["Trigger GitHub release", "Publish to npm"]
}

action "Trigger GitHub release" {
  uses = "./.github/actions/trigger-github-release/"
  secrets = ["GITHUB_TOKEN"]
  env = {
    COMMIT_AUTHOR_NAME = "Babel Bot"
    COMMIT_AUTHOR_EMAIL = "babel-bot@users.noreply.github.com"
  }
  needs = ["Create release tag"]
}

action "Publish to npm" {
  uses = "docker://node:10"
  secrets = ["NPM_TOKEN"]
  runs = "make"
  args = "publish-ci"
  env = {
    CI = "true"
  }
  needs = ["Create release tag"]
}

# When GitHub Actions will support the "release" event for public
# repositories, we won't need this checks anymore.
action "Create release tag" {
  uses = "./.github/actions/create-release-tag"
  needs = [
    "Is version commit",
    "On master branch",
  ]
}

action "Is version commit" {
  uses = "./.github/actions/filter-commit-message"
  # This regex is run using "grep -P".
  # The (-\\S+) part is for 7.0.0-beta.1 releases.
  args = "^v(\\d+\\.){2}\\d+(-\\S+)?$"
}

action "On master branch" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}
