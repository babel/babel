#!/bin/bash

function cleanup {
  echo "Cleaning up."
  stopLocalRegistry

  if [ -n "$GIT_E2E_SETUP" ]; then
    cleanupE2Egit
  fi
}

# Error messages are redirected to stderr
function handle_error {
  echo "$(basename $0): ERROR! An error was encountered executing line $1." 1>&2;
  cleanup
  echo "Exiting with error." 1>&2;
  exit 1
}

function handle_exit {
  cleanup
  echo "Exiting without error." 1>&2;
  exit
}

# Exit the script with a helpful error message when any error is encountered
trap 'set +x; handle_error $LINENO $BASH_COMMAND' ERR

# Cleanup before exit on any termination signal
trap 'set +x; handle_exit' SIGQUIT SIGTERM SIGINT SIGKILL SIGHUP
