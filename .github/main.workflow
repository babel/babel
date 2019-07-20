workflow "Release" {
  on = "push"
  resolves = ["Trigger GitHub release"]
}

action "Is version tag" {
  uses = "actions/bin/filter@0dbb077f64d0ec1068a644d25c71b1db66148a24"
  args = "tag v*"
}

action "Is tag from master" {
  uses = "babel/actions/commit-matches-branch@master"
  needs = [
    "Is version tag",
  ]
  args = "master"
}

action "Trigger GitHub release" {
  uses = "babel/actions/trigger-github-release@master"
  secrets = ["GITHUB_TOKEN"]
  env = {
    COMMIT_AUTHOR_NAME = "Babel Bot"
    COMMIT_AUTHOR_EMAIL = "babel-bot@users.noreply.github.com"
  }
  needs = [
    "Is version tag",
    "Is tag from master",
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
