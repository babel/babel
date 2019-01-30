workflow "Release" {
  on = "push"
  resolves = ["Trigger GitHub release"]
}

action "Trigger GitHub release" {
  uses = "./trigger-github-release/"
  secrets = ["GITHUB_TOKEN"]

  # When GitHub Actions will support the "release" event for public
  # repositories, we won't need these checks anymore.
  needs = [
    "Is version tag",
    "On master branch",
  ]
}

action "Is version tag" {
  uses = "actions/bin/filter@b2bea07"
  args = "tag v*"
}

action "On master branch" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
  args = "branch master"
}
