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
    "Is version tag",
    "On master branch",
  ]
}

action "Is version tag" {
  uses = "actions/bin/filter@master"
  args = "tag v*"
}

action "On master branch" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}
