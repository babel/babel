workflow "Release" {
  resolves = [
    "Trigger GitHub release",
    "Is version tag",
  ]
  on = "release"
}

action "Is version tag" {
  uses = "actions/bin/filter@0dbb077f64d0ec1068a644d25c71b1db66148a24"
  args = "tag v*"
}

action "Trigger GitHub release" {
  uses = "./.github/actions/trigger-github-release/"
  secrets = ["GITHUB_TOKEN"]
  env = {
    COMMIT_AUTHOR_NAME = "Babel Bot"
    COMMIT_AUTHOR_EMAIL = "babel-bot@users.noreply.github.com"
  }
  needs = [
    "Is version tag",
  ]
}

workflow "Welcome comment" {
  resolves = ["Create Comment"]
  on = "issues"
}

action "Is action 'opened'" {
  uses = "actions/bin/filter@0dbb077f64d0ec1068a644d25c71b1db66148a24"
  args = "action opened"
}

action "Create Comment" {
  uses = "babel/actions/create-welcome-comment@master"
  secrets = ["GITHUB_TOKEN", "BOT_TOKEN"]
  needs = ["Is action 'opened'"]
}
