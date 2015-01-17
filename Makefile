.PHONY: publish build

build:
	node bin/without_eval >acorn_csp.js

publish:
	read -p "Version: " version; \
	npm version $$version --message "v%s"

	make build
	npm publish

	git push --follow-tags
