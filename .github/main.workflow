workflow "Release" {
  on = "push"
  resolves = ["Trigger GitHub release"]
}

action "Trigger GitHub release" {
  uses = "./.github/actions/trigger-github-release/"
  secrets = ["GITHUB_TOKEN"]

  # When GitHub Actions will support the "release" event for public
  # repositories, we won't need these checks anymore.
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
