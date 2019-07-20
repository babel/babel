FROM debian:stable-slim

LABEL "name"="commit-matches-branch"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Commit matches branch"
LABEL "com.github.actions.description"="Only continue the workflow if the current commit is the last commit of the given branch"
LABEL "com.github.actions.icon"="filter"
LABEL "com.github.actions.color"="gray-dark"

ADD entrypoint.sh /action/entrypoint.sh

RUN chmod +x /action/entrypoint.sh
RUN apt-get update && apt-get install -y --no-install-recommends git

ENTRYPOINT ["/action/entrypoint.sh"]
