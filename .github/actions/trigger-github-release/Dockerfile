FROM node:10

LABEL "name" = "trigger-github-release"
LABEL "version" = "0.0.1"

LABEL "com.github.actions.name" = "Trigger GitHub release"
LABEL "com.github.actions.description" = "Trigger a new GitHub release and generate the changelog using lerna-changelog."
LABEL "com.github.actions.icon" = "tag"
LABEL "com.github.actions.color" = "yellow"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD package-lock.json /action/package-lock.json
ADD release.js /action/release.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]
