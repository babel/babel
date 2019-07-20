workflow "Release" {
  resolves = [
    "Trigger GitHub release",
    "Is version tag",
  ]
  on = "release"
}

action "Is version tag" {
  uses = "actions/bin/filter@master"
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

workflow "Welcome" {
  resolves = [
    "Create Welcome Comment"
  ]
  on = "issues"
}

action "Is action 'opened'" {
  uses = "actions/bin/filter@master"
  args = "action opened"
}

action "Create Welcome Comment" {
  uses = "babel/actions/create-welcome-comment@master"
  secrets = ["GITHUB_TOKEN", "BOT_TOKEN"]
  needs = ["Is action 'opened'"]
}

workflow "Needs Info" {
  resolves = [
    "Create Needs Info Comment"
  ]
  on = "issues"
}

action "Is action 'labeled'" {
  uses = "actions/bin/filter@master"
  args = "action labeled"
}

action "Has label 'Needs Info'" {
  uses = "actions/bin/filter@master"
  needs = [
    "Is action 'labeled'"
  ]
  args = "label 'Needs Info'"
}

action "Create Needs Info Comment" {
  uses = "babel/actions/create-needs-info-comment@master"
  needs = [
    "Has label 'Needs Info'",
  ]
  secrets = ["BOT_TOKEN", "GITHUB_TOKEN"]
}
