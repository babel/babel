.PHONY: publish-patch

publish-patch:
	./node_modules/.bin/mocha
	npm version patch
	npm publish
	git push --follow-tags
