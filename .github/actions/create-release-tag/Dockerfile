FROM debian:stable-slim

LABEL "name"="create-release-tag"
LABEL "version"="0.0.1"

LABEL "com.github.actions.name"="Create release tag"
LABEL "com.github.actions.description"="Creates a release tag equal to the last commit message"
LABEL "com.github.actions.icon"="tag"
LABEL "com.github.actions.color"="gray-dark"

ADD entrypoint.sh /action/entrypoint.sh

RUN chmod +x /action/entrypoint.sh
RUN apt-get update && apt-get install -y --no-install-recommends git

ENTRYPOINT ["/action/entrypoint.sh"]
