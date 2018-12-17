workflow "Build, Lint and Test" {
  resolves = ["Test", "Lint"]
  on = "push"
}

action "Build" {
  uses = "docker://node:10"
  runs = "yarn"
}

action "Test" {
  needs = "Build"
  uses = "docker://node:10"
  runs = "yarn"
  args = "test"
}

action "Lint" {
  needs = "Build"
  uses = "docker://node:10"
  runs = "yarn"
  args = "lint"
}
