.PHONY: publish

publish:
  read -p "Version: "  version; \
  npm version $$version --message "v%s"

  bin/without_eval >acorn_csp.js
  npm publish

  git push --follow-tags
