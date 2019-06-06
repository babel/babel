FROM debian:stable-slim

LABEL "name"="filter"
LABEL "version"="1.1.0"

LABEL "com.github.actions.name"="Filter commit message"
LABEL "com.github.actions.description"="Stop a workflow if the message of the current commit doesn't match the pattern"
LABEL "com.github.actions.icon"="filter"
LABEL "com.github.actions.color"="gray-dark"

ADD entrypoint.sh /action/entrypoint.sh

RUN chmod +x /action/entrypoint.sh
RUN apt-get update && apt-get install -y --no-install-recommends git

ENTRYPOINT ["/action/entrypoint.sh"]
