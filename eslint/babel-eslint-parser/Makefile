.PHONY: publish-patch

publish-patch:
	mocha
	npm version patch
	npm publish
	git push --follow-tags
